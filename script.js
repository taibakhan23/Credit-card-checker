document.addEventListener("DOMContentLoaded", function () { const chatBox = document.getElementById("chat-box"); const userInput = document.getElementById("user-input"); const sendButton = document.getElementById("send-button"); const generateImageButton = document.getElementById("generate-image"); const apiKey = "AIzaSyAdF1WjFpPlMtG66ocCqYLiX6_vCUwso_k"; // Replace with your actual Gemini API key const apiUrl = "https://api.example.com/gemini/chat"; // Replace with the correct Gemini API URL

function appendMessage(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    appendMessage("You", message);
    userInput.value = "";
    
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.reply) {
            appendMessage("BOT BY SK DEVIL", data.reply);
        } else {
            appendMessage("BOT BY SK DEVIL", "Error: No response from API.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        appendMessage("BOT BY SK DEVIL", "Error: Unable to fetch response.");
    });
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

generateImageButton.addEventListener("click", function () {
    appendMessage("BOT BY SK DEVIL", "Image generation is not yet implemented.");
});

});

        
