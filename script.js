console.log('Ready to chat');
async function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const responseBox = document.getElementById("chatbox");
  const prompt = input.value.trim();
  input.value = "";
  responseBox.innerHTML += `<div><b>Tú:</b> ${prompt}</div>`;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    responseBox.innerHTML += `<div><b>OMNIXIA:</b> ${data.reply}</div>`;
  } catch (error) {
    responseBox.innerHTML += `<div style="color:red;">⚠️ Error al conectar con OMNIXIA</div>`;
  }
}
