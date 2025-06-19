
document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("user-input");
    const message = input.value;
    if (!message) return;

    appendMessage("Tú", message);
    input.value = "";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    const data = await res.json();
    appendMessage("OMNIXIA", data.response);
});

function appendMessage(sender, message) {
    const messages = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}
