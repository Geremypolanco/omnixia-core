document.getElementById("activateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  const responseContainer = document.createElement("div");
  responseContainer.classList.add("response");
  responseContainer.innerText = "🤖 Procesando comando...";
  document.body.appendChild(responseContainer);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    const reply = result.reply || "⚠️ Respuesta vacía.";
    responseContainer.innerText = `🤖 OMNIXIA:\n${reply}`;
  } catch (error) {
    responseContainer.innerText = `❌ OMNIXIA ERROR:\n${error.message}`;
  }
});