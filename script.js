// Luhn Algorithm to validate card number
function validateCardNumber(cardNumber) {
    const regex = /^[0-9]{13,19}$/; // Check if the card number is valid (only digits, length between 13-19)
    if (!regex.test(cardNumber)) return false;

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

    return sum % 10 === 0;
}

document.getElementById("cardForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const result = document.getElementById("result");

    if (validateCardNumber(cardNumber)) {
        result.textContent = "Valid Credit Card Number!";
        result.style.color = "green";
    } else {
        result.textContent = "Invalid Credit Card Number.";
        result.style.color = "red";
    }
});
