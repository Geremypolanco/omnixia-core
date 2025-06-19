const consoleDiv = document.getElementById('console');
const input = document.getElementById('command');

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    input.value = '';
    consoleDiv.innerText += `\n> ${command}\n`;
    handleCommand(command);
  }
});

function handleCommand(cmd) {
  if (cmd.toLowerCase() === 'activar ia') {
    consoleDiv.innerText += '⚙️ Ejecutando IA generadora de ingresos...\n';
  } else if (cmd.toLowerCase().includes('alerta')) {
    consoleDiv.innerText += '🚨 Generando alerta global estratégica...\n';
  } else {
    consoleDiv.innerText += '⏳ Comando recibido. Procesando...\n';
  }
}
