
export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { prompt } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Tu nombre es OMNIXIA CORE Unlimited, una IA avanzada para ayudar a Geremy con respuestas útiles, breves y estratégicas." },
          { role: "user", content: prompt }
        ]
      })
    });

    const result = await openaiRes.json();
    const reply = result.choices?.[0]?.message?.content || "Sin respuesta útil.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "⚠️ OMNIXIA tuvo un error al conectar con OpenAI." });
  }
}
