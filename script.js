
const form = document.getElementById("command-form");
const input = document.getElementById("command-input");
const output = document.getElementById("output");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const command = input.value.trim();
  if (command !== "") {
    output.innerHTML += `<p>> ${command}</p><p>⏳ Comando recibido. Procesando...</p>`;
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
