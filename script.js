const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    let message = userInput.value;
    if (!message.trim()) return;
    
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    userInput.value = "";

    fetch("https://your-termux-server-url/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<p><strong>BOT:</strong> ${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}

function generateImage() {
    fetch("https://your-termux-server-url/generate-image")
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<p><strong>Image Generated:</strong><br><img src="${data.image}" width="200"></p>`;
    })
    .catch(error => console.error("Error:", error));
}
