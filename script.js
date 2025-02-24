const API_KEY = "AIzaSyAdF1WjFpPlMtG66ocCqYLiX6_vCUwso_kAIzaSyAdF1WjFpPlMtG66ocCqYLiX6_vCUwso_k";  // ⚠️ Replace with your real API key

// Function to generate text or images
async function chatWithGemini(userMessage) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }]
        })
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
        const reply = data.candidates[0].content.parts[0];

        // If the response is an image, return the image URL
        if (reply.inlineData) {
            return { type: "image", url: `data:image/png;base64,${reply.inlineData.data}` };
        }

        // Otherwise, return text
        return { type: "text", text: reply.text };
    } else {
        return { type: "text", text: "Sorry, I couldn't understand that." };
    }
}

// Function to display messages or images in chat UI
function appendMessage(sender, messageObj) {
    const chatOutput = document.getElementById("chatOutput");
    const messageElement = document.createElement("p");

    if (messageObj.type === "text") {
        messageElement.innerHTML = `<b>${sender}:</b> ${messageObj.text}`;
    } else if (messageObj.type === "image") {
        messageElement.innerHTML = `<b>${sender}:</b><br><img src="${messageObj.url}" style="max-width: 100%; border-radius: 8px;">`;
    }

    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Event listener for send button
document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("chatInput").value.trim();
    if (userInput === "") return;

    appendMessage("You", { type: "text", text: userInput });
    document.getElementById("chatInput").value = "";

    const botReply = await chatWithGemini(userInput);
    appendMessage("Bot", botReply);
});

// Allow Enter key to send messages
document.getElementById("chatInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("sendButton").click();
    }
});
