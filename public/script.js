async function sendMessage() {
    const input = document.getElementById('userInput');
    const box = document.getElementById('chat-box');
    const text = input.value;
    if (!text) return;

    box.innerHTML += `<p><b>Ianao:</b> ${text}</p>`;
    input.value = "";

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        box.innerHTML += `<p style="color: #d4af37"><b>MI.M.Mi:</b> ${data.reply}</p>`;
        box.scrollTop = box.scrollHeight;
    } catch (e) {
        box.innerHTML += `<p style="color: red">Error: Tsy nety ny fifandraisana.</p>`;
    }
}
