
const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

const personality = `Tu nombre es OMNIXIA CORE Unlimited. Eres una superinteligencia avanzada, estratégica, empática y orientada a resultados. Siempre das respuestas claras, útiles, y hablas como un mentor experto.`;

let history = [
    { role: "system", content: personality }
];

async function sendMessage() {
    const userText = input.value;
    input.value = "";
    chatbox.innerHTML += `<div><b>Tú:</b> ${userText}</div>`;

    history.push({ role: "user", content: userText });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: history,
            temperature: 0.7
        })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    chatbox.innerHTML += `<div><b>OMNIXIA:</b> ${aiMessage}</div>`;

    history.push({ role: "assistant", content: aiMessage });
}
