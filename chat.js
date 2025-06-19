
export default async function handler(req, res) {
  const { prompt, lang } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.MODEL_NAME || "gpt-4";
  const baseUrl = process.env.BASE_URL || "https://api.openai.com";

  const system_prompt = {
    en: "You are OMNIXIA CORE, a powerful multilingual AI assistant. Respond clearly and concisely.",
    es: "Eres OMNIXIA CORE, una poderosa IA multilingüe. Responde de forma clara y precisa."
  };

  try {
    const result = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system_prompt[lang] || system_prompt.en },
          { role: "user", content: prompt }
        ],
      }),
    });

    const json = await result.json();
    const reply = json.choices?.[0]?.message?.content || "No response.";
    res.status(200).json({ response: reply });
  } catch (e) {
    res.status(500).json({ response: "Error processing your request." });
  }
}
