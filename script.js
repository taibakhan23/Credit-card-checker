document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        // Show user message
        appendMessage("You", message);

        // Clear input field
        userInput.value = "";

        // Send message to AI chatbot (using your API key)
        fetchChatbotResponse(message);
    }

    function appendMessage(sender, message) {
        let messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function fetchChatbotResponse(userMessage) {
        const apiKey = "AIzaSyA9Tk1BAH923newpPOXhzsl0vYUJxz4TSQ";  
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{ parts: [{ text: userMessage }] }]
        };

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.candidates) {
                const botReply = data.candidates[0].content.parts[0].text;
                appendMessage("BOT", botReply);
            } else {
                appendMessage("BOT", "Sorry, I didn't understand that.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("BOT", "Error connecting to AI.");
        });
    }
});
