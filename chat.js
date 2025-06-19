export default async function handler(req, res) {
  const { prompt } = req.body;
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ reply: "OpenAI API key is missing." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME || "gpt-4",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No response from OpenAI.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Server error: " + error.message });
  }
}