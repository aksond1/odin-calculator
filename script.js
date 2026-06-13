function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let firstNumber;
let secondNumber;
let operator;

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
    default:
      console.log("Error");
  }
}

function isDigit(value) {
  return value >= "0" && value <= "9";
}

function isNegative(value) {
  return value === "-";
}

function isFloat(value) {
  if (value === ".") {
    if (currentNumber.includes(".")) return;

    if (currentNumber === "") {
      currentNumber = "0.";
    } else {
      currentNumber += ".";
    }

    display.textContent = currentNumber;
  }
}

function isSquareRoot(value) {
  return value === "√";
}

function isOperator(operator) {
  return (
    operator === "+" || operator === "-" || operator === "×" || operator === "÷"
  );
}

let currentNumber = "";
let lastNumber = null;
let currentOperator = null;

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    if (isDigit(value) || isFloat(value)) {
      currentNumber += value;
      display.textContent = currentNumber;
    }

    if (isNegative(value) && currentNumber === "") {
      currentNumber = "-";
      return;
    }

    if (isOperator(value)) {
      lastNumber = Number(currentNumber);
      currentOperator = value;
      currentNumber = "";

      display.textContent = currentOperator;
    }

    if (isSquareRoot(value)) {
      currentNumber = String(Math.sqrt(Number(currentNumber)));
      display.textContent = currentNumber;
    }

    if (value === "=") {
      result();
    }

    if (value === "C") {
      lastNumber = null;
      currentNumber = "";
      currentOperator = null;

      display.textContent = "";
    }
  });
});

function result() {
  const result = operate(
    currentOperator,
    Number(lastNumber),
    Number(currentNumber),
  );

  display.textContent = result;

  lastNumber = null;
  currentNumber = String(result);
  currentOperator = null;
}
