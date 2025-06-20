document.getElementById("chat-form").addEventListener("submit", sendMessage);

async function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const responseBox = document.getElementById("response-box");
  const prompt = input.value.trim();
  input.value = "";
  responseBox.innerText = "Procesando...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    responseBox.innerText = data.reply || "Sin respuesta";
  } catch (err) {
    responseBox.innerText = "❌ Error al conectar con OMNIXIA";
  }
}
