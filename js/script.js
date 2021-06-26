// Get elements 
const display = document.querySelector("[data-display]");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const equals = document.querySelector("[data-equals]");
const clearBtn = document.querySelector("[data-clear]");
const eraseBtn = document.querySelector("[data-erase]");
const point = document.querySelector("[data-point]");
const themeSwap = document.querySelector("[data-swap]");

// Global variables 
let firstOperand = "";
let secondOperand = "";
let displayValue = null;
let shouldResetDisplay = false;




// Event listeners
clearBtn.addEventListener("click", clear);
eraseBtn.addEventListener("click", erase);
point.addEventListener("click", appendPoint);
equals.addEventListener("click", evaluate);
numbers.forEach((btn) =>
    btn.addEventListener("click", () => appendNumber(btn.textContent))
);
operators.forEach((btn) =>
    btn.addEventListener("click", () => appendOperator(btn.textContent))
);

// Functions
function appendNumber(number) {
    if (display.textContent === "0" || shouldResetDisplay) {
        resetDisplay();
    }
    display.textContent += number;
}

function appendOperator(operator) {
    if (displayValue !== null) {
        evaluate();
    }
    firstOperand = display.textContent;
    displayValue = operator;
    shouldResetDisplay = true;
}

function appendPoint(point) {
    if (shouldResetDisplay) {
        resetDisplay();
    }
    if (display.textContent === "") {
        display.textContent = "0";
    }
    if (display.textContent.includes(".")) {
        return; // Cannot have two points
    }
    display.textContent += ".";
}

function evaluate() {
    if (displayValue === null || shouldResetDisplay) return;
    if (displayValue === "÷" && display.textContent === "0") {
        alert("Division by zero!");
        clear();
        return;
    }

    secondOperand = display.textContent;
    display.textContent = roundResult(operate(displayValue, firstOperand, secondOperand));
    displayValue = null;
}

function clear() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    displayValue = null;
}

function resetDisplay() {
    display.textContent = "";
    shouldResetDisplay = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function erase() {
    display.textContent = display.textContent.toString().slice(0, -1);

}

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, number1, number2) {

    number1 = Number(number1);
    number2 = Number(number2);
    console.log("INSIDE");
    if (operator === '+') {
        return add(number1, number2);
    } else if (operator === '-') {
        return subtract(number1, number2);
    } else if (operator === 'x') {
        return multiply(number1, number2);
    } else if (operator === '÷') {
        return divide(number1, number2);
    }
}

// Theme swap
let shouldBeDark = false;
document.querySelector("#theme-swap-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(shouldBeDark === true){
        themeSwap.textContent = "GO LIGHT";
        shouldBeDark = false;
    } else {
        themeSwap.textContent = "GO DARK";
        shouldBeDark = true;
    }
    
})