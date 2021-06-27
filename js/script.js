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
window.addEventListener("keydown", getKBInput);
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
let turnDark = true;
document.querySelector("#theme-swap-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (turnDark === true) {
        themeSwap.textContent = "GO LIGHT";
        turnDark = false;
    } else {
        themeSwap.textContent = "GO DARK";
        turnDark = true;
    }
});

// Keyboard input for the Numpad
function getKBInput(key) {
    console.log(key.keyCode);
    if (key.keyCode >= 48 && key.keyCode <= 57) {
        const nr = findNumber(key.keyCode);
        appendNumber(nr);
    } else if (key.keyCode === 107) {
        appendOperator("+");
    } else if (key.keyCode === 109) {
        appendOperator("-");
    } else if (key.keyCode === 106) {
        appendOperator("x");
    } else if (key.keyCode === 111) {
        appendOperator("÷");
    } else if (key.keyCode === 190) {
        appendPoint();
    } else if(key.keyCode === 8){
        erase();
    } else if(key.keyCode === 13){
        evaluate();
    }
    key.preventDefault();

}

function findNumber(keyCode) {
    if (keyCode === 48) {
        return 0;
    } else if (keyCode === 49) {
        return 1;
    } else if (keyCode === 50) {
        return 2;
    } else if(keyCode === 51){
        return 3;
    } else if(keyCode === 52){
        return 4;
    } else if(keyCode === 53){
        return 5;
    } else if(keyCode === 54){
        return 6;
    }  else if(keyCode === 55){
        return 7;
    } else if(keyCode === 56){
        return 8;
    } else if(keyCode === 57){
        return 9;
    }
}