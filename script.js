async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chat-box");
    let userMessage = `<p><strong>You:</strong> ${message}</p>`;
    chatBox.innerHTML += userMessage;
    inputField.value = "";

    // Call Gemini API
    let botReply = await getGeminiResponse(message);
    let botMessage = `<p><strong>Bot:</strong> ${botReply}</p>`;
    chatBox.innerHTML += botMessage;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send user input to Gemini API and get a response
async function getGeminiResponse(userMessage) {
    const API_KEY = "AIzaSyABYyHWbk9ZrcLxQuXGe4A0Uu03VmxQv1Y";  // Replace with your actual key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`;

    const requestBody = {
        prompt: { text: userMessage },
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        let data = await response.json();
        return data.candidates?.[0]?.output || "Sorry, I couldn't understand that.";
    } catch (error) {
        console.error("Error:", error);
        return "Error connecting to AI.";
    }
}
