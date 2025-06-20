
export default async function handler(req, res) {
    const apiKey = process.env.OPENAI_API_KEY;
    const { message } = req.body;

    if (!apiKey) {
        return res.status(500).json({ reply: "API key missing." });
    }

    const payload = {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
    };

    try {
        const completion = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await completion.json();
        res.status(200).json({ reply: data.choices?.[0]?.message?.content?.trim() });
    } catch (e) {
        res.status(500).json({ reply: "Error al procesar la solicitud." });
    }
}
