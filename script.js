document.getElementById("chat-form").addEventListener("submit", sendMessage);

async function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");
  const prompt = input.value.trim();
  input.value = "";

  if (!prompt) return;

  // Burbuja del usuario
  const userBubble = document.createElement("div");
  userBubble.className = "message user";
  userBubble.innerText = prompt;
  messages.appendChild(userBubble);
  messages.scrollTop = messages.scrollHeight;

  // Placeholder de la IA
  const aiBubble = document.createElement("div");
  aiBubble.className = "message ai";
  aiBubble.innerText = "Procesando...";
  messages.appendChild(aiBubble);
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    aiBubble.innerText = data.reply || "Sin respuesta";
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    aiBubble.innerText = "❌ Error al conectar con OMNIXIA";
  }
}
