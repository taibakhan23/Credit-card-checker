async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = ""; // Clear input field

    // Call Gemini API
    try {
        let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAdF1WjFpPlMtG66ocCqYLiX6_vCUwso_k", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] })
        });

        let data = await response.json();
        
        // Get the bot's response from the API response
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

        // Display bot response
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;

    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>Bot:</strong> Error connecting to AI.</p>`;
    }
}
