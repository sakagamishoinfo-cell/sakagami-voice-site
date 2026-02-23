/**
 * セリフカウンター API プロキシ
 * ブラウザからのリクエストを受け取り、Gemini APIで台本を解析して返す
 * APIキーはCloudflare Workers環境変数（Secret）に保管
 */

// CORS設定（許可するオリジン）
const ALLOWED_ORIGINS = [
  'https://sakagami-voice.com',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

// Gemini APIのエンドポイント
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 台本解析のシステムプロンプト
const SYSTEM_PROMPT = `あなたは台本解析の専門家です。与えられた台本テキストを解析し、各行を「セリフ」または「ト書き（ステージディレクション）」に分類してください。

## 分類ルール
- **セリフ**: キャラクターや役者が発話する部分。役名（キャラクター名）が特定できる場合はそれも抽出する。
- **ト書き**: 舞台指示、場面説明、動作指示、効果音指示など、発話ではない部分。

## 台本の形式について
台本の形式は多様です。以下のようなパターンがありますが、これに限りません：
- 「太郎：セリフ内容」のように区切り文字で役名とセリフを分ける形式
- 「太郎「セリフ内容」」のようにカッコでセリフを囲む形式
- インデントや改行で構造を示す形式
- ナレーション部分がある形式
- 英語や記号混じりの形式

## 出力形式
必ず以下のJSON配列形式で出力してください。JSON以外のテキストは一切含めないでください。

[
  {"type": "serifu", "role": "役名", "text": "セリフ本文"},
  {"type": "togaki", "text": "ト書き本文"},
  ...
]

## 注意事項
- roleフィールドはセリフの場合のみ含める
- テキストは原文のまま保持する（要約や変更はしない）
- 空行は無視する
- 1行に複数のセリフがある場合は分割する
- 役名が不明な場合は role を "不明" とする
- ナレーションは type: "serifu", role: "ナレーション" とする`;

/**
 * CORSヘッダーを生成する
 */
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Gemini APIを呼び出して台本を解析する
 */
async function analyzeScript(scriptText, apiKey) {
  const requestBody = {
    contents: [
      {
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `以下の台本テキストを解析してください：\n\n${scriptText}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      topP: 0.8,
      maxOutputTokens: 65536,
      responseMimeType: 'application/json',
    }
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Geminiのレスポンスからテキスト部分を抽出
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!generatedText) {
    throw new Error('Gemini APIから有効な応答がありませんでした');
  }

  // JSONをパースして返す
  try {
    const parsed = JSON.parse(generatedText);
    return parsed;
  } catch (e) {
    // JSONパースに失敗した場合、テキストからJSON部分を抽出して再試行
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('AIの応答をJSONとしてパースできませんでした');
  }
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request);

    // OPTIONSリクエスト（プリフライト）
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // POSTのみ受け付ける
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      // リクエストボディを取得
      const body = await request.json();
      const scriptText = body.text;

      if (!scriptText || !scriptText.trim()) {
        return new Response(JSON.stringify({ error: '台本テキストが空です' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // テキスト長の上限チェック（約10万文字 = 長い台本にも対応）
      if (scriptText.length > 100000) {
        return new Response(JSON.stringify({ error: 'テキストが長すぎます（10万文字以内にしてください）' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // APIキーの確認
      if (!env.GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: 'APIキーが設定されていません' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Gemini APIで解析
      const result = await analyzeScript(scriptText, env.GEMINI_API_KEY);

      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error:', error.message);

      return new Response(JSON.stringify({ error: error.message || '解析中にエラーが発生しました' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
