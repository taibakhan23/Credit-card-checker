// Function to generate a random card number using the Luhn Algorithm
function generateCardNumber() {
    const prefix = '4'; // Prefix for Visa card (can be adjusted for MasterCard, etc.)
    let cardNumber = prefix;

    // Generate the first 15 digits of the card number
    for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    // Apply Luhn Algorithm to generate the last digit (checksum)
    let sum = 0;
    let shouldDouble = false;

    // Start from the rightmost digit
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    const checksum = (10 - (sum % 10)) % 10;
    cardNumber += checksum;

    return cardNumber;
}

// Function to generate 50 card numbers and display them
function generateMultipleCards() {
    let cardsListHTML = '';
    for (let i = 0; i < 50; i++) {
        const cardNumber = generateCardNumber();
        cardsListHTML += `<div class="card-item">Card ${i + 1}: ${cardNumber}</div>`;
    }

    document.getElementById("cardsList").innerHTML = cardsListHTML;
}

// Event listener for the "Generate" button
document.getElementById("generateBtn").addEventListener("click", function() {
    generateMultipleCards();
});
