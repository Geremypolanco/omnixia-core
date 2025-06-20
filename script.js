document.getElementById("chat-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const responseBox = document.getElementById("messages");
  const prompt = input.value.trim();
  input.value = "";
  responseBox.innerText += "\n🧍 " + prompt + "\n";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    responseBox.innerText += "\n🤖 " + (data.reply || "No response");
  } catch (err) {
    responseBox.innerText += "\n❌ Error al conectar con OMNIXIA";
  }
});