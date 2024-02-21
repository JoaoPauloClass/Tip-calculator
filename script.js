const buttons = document.querySelectorAll('.tip-percent')
const tipInput = document.querySelector('#tip-percent-custom')
const billInput = document.querySelector('#bill-input-element')
const peopleInput = document.querySelector('#number-people-input-element')
const tipAmount = document.querySelector('#tip-amount')
const totalBill = document.querySelector('#total-bill')
const resetButton = document.querySelector('#reset-button')

const billDiv = document.querySelector('.bill-input-text')
const peopleDiv = document.querySelector('.people-input-text')

let tipPercentage = 0;


// Function to handle button clicks
function handleButtonClick(event) {
    // Unselect all buttons
    buttons.forEach(button => button.classList.remove('tip-percent-selected'));
    // Select the clicked button
    event.target.classList.add('tip-percent-selected');
    tipInput.value = "";

    tipPercentage = event.target.value;

    handleTipCalculus();
}

// Function to handle input field focus
function handleInputFocus() {
    // Unselect all buttons
    buttons.forEach(button => button.classList.remove('tip-percent-selected'));
    tipInput.classList.add("input-focus");
}

// Add click event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Add focus event listener to the input field
tipInput.addEventListener('focus', handleInputFocus);

tipInput.addEventListener("input", () => {
    tipPercentage = tipInput.value;
    console.log(tipPercentage);
})


//Handle tip calculus
function handleTipCalculus() {

    if (peopleInput.value > 0 && billInput.value > 0 && tipPercentage > 0) {

        let tipAmountCalc = 0;
        tipAmountCalc = (billInput.value * (tipPercentage / 100)) / peopleInput.value
        tipAmount.textContent = `$${tipAmountCalc.toFixed(2)}`

        let totalBillCalc = 0;
        let billValue = parseFloat(billInput.value)
        totalBillCalc = (billValue * (tipPercentage / 100 + 1)) / peopleInput.value
        console.log(typeof (totalBillCalc));
        totalBill.textContent = `$${totalBillCalc.toFixed(2)}`
    }

}

//Handle type errors
function peopleInputError() {
    peopleInput.style.outline = "2px solid hsl(0, 53%, 72%)"
}

function resetApp() {
    tipInput.value = "";
    billInput.value = "";
    peopleInput.value = "";

    billErrorMessage.innerText = "";
    peopleErrorMessage.innerText = "";

    billInput.style.outline = "none"
    peopleInput.style.outline = "none"

    buttons.forEach(button => button.classList.remove('tip-percent-selected'));

    totalBill.textContent = "$0.00";
    tipAmount.textContent = "$0.00";
}

const peopleErrorMessage = document.createElement("p");
peopleErrorMessage.classList.add("error-message");
peopleErrorMessage.classList.add("red-text");
peopleDiv.appendChild(peopleErrorMessage);

peopleInput.addEventListener("input", () => {
    let peopleError = 0;
    if (peopleInput.value > 0) {
        handleTipCalculus();
        peopleInput.style.outline = "2px solid hsl(172, 67%, 45%)"

        peopleErrorMessage.innerText = ""

        peopleError = 0;

    } else {
        if (peopleError == 0) {
            peopleInput.style.outline = "2px solid hsl(0, 53%, 72%)"
            peopleErrorMessage.innerText = "Can't be zero";

            peopleError = 1;
        }
    }
})



const billErrorMessage = document.createElement("p");
billErrorMessage.classList.add("error-message");
billErrorMessage.classList.add("red-text");
billDiv.appendChild(billErrorMessage);

billInput.addEventListener("input", () => {
    let billError = 0;
    if (billInput.value > 0) {
        handleTipCalculus();
        billInput.style.outline = "2px solid hsl(172, 67%, 45%)"

        billErrorMessage.innerText = "";

        billError = 0;
    } else {
        if (billError == 0) {
            billInput.style.outline = "2px solid hsl(0, 53%, 72%)"
            billErrorMessage.innerText = "Can't be zero or less";

            billError = 1;
        }
    }
})



tipInput.addEventListener("input", () => {
    if (tipInput.value > 0) {
        handleTipCalculus();
        tipInput.style.outline = "2px solid hsl(172, 67%, 45%)"

    } else {
        tipInput.style.outline = "2px solid hsl(0, 53%, 72%)"
    }
})

tipInput.addEventListener("blur", () => {
    tipInput.style.outline = "none"
    if (tipInput.value <= 0)
        tipInput.value = "";
})

resetButton.addEventListener("click", resetApp)
