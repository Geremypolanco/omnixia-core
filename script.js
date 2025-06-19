async function sendMessage() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    output.textContent = "Procesando...";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        output.textContent = data.reply || "Sin respuesta.";
    } catch (err) {
        output.textContent = "Error: " + err.message;
    }
}