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

    const cardNumbers = document.getElementById("cardNumber").value.split('\n');
    const resultDiv = document.getElementById("result");

    let resultHTML = '';

    // Loop through all card numbers and check each
    cardNumbers.forEach(cardNumber => {
        cardNumber = cardNumber.trim(); // Remove extra spaces
        if (cardNumber === '') return; // Skip empty lines

        const isValid = validateCardNumber(cardNumber);

        if (isValid) {
            resultHTML += `<p class="valid">Valid Card: ${cardNumber}</p>`;
        } else {
            resultHTML += `<p class="invalid">Invalid Card: ${cardNumber}</p>`;
        }
    });

    if (resultHTML === '') {
        resultDiv.innerHTML = '<p>No card numbers were entered. Please try again.</p>';
    } else {
        resultDiv.innerHTML = resultHTML;
    }
});
