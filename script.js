
async function sendMessage() {
    const input = document.getElementById("user-input").value;
    const responseBox = document.getElementById("response");
    responseBox.innerText = "Procesando...";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        responseBox.innerText = data.reply || "Sin respuesta.";
    } catch (err) {
        responseBox.innerText = "❌ Error al conectar con la IA.";
    }
}
