const status = document.getElementById('server-status');
const btn = document.getElementById('btn-send');
const input = document.getElementById('message');
const username = document.getElementById('username');
const messages = document.getElementById('messages');
const socket = io();

// Connect to server
socket.on("connect", () => {
    status.innerHTML = "<b style='color: green;'>Conectado</b>";
});

// Disconnect
socket.on("disconnect", () => {
    status.innerHTML = "<b style='color: red;'>Desconectado</b>";
});

// Mensajes recibidos del servidor
socket.on("send-message", data => {
    messages.innerHTML += `<p><b>${data.user}:</b> ${data.message}</p>`;
});

// Usuarios conectados
socket.on("users-list", data => {
    renderUsers(data);
});

// Click en el botón de enviar
btn.addEventListener('click', () => {
    const message = input.value;
    const payload = {
        user: username.value,
        message
    };
    
    if (message.length > 0) {
        messages.innerHTML += `
            <p>
                <b>${payload.user}:</b> ${payload.message}
            </p>
        `;
        socket.emit("send-message", payload);
        input.value = "";
    }
});