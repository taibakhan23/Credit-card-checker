const API_KEY = "AIzaSyA9Tk1BAH923newpPOXhzsl0vYUJxz4TSQ"; // Your API Key

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("You", userMessage);
            userInput.value = "";
            getBotResponse(userMessage);
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function getBotResponse(message) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateMessage?key=${API_KEY}`;

        const requestBody = {
            prompt: {
                text: message
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                appendMessage("Bot", data.candidates[0].content);
            } else {
                appendMessage("Bot", "Sorry, I couldn't understand that.");
            }
        } catch (error) {
            appendMessage("Bot", "Error fetching response.");
            console.error("Error:", error);
        }
    }
});
