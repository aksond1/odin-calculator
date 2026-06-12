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

function isOperator(operator) {
  return (
    operator === "+" || operator === "-" || operator === "×" || operator === "÷"
  );
}

let currentNumber = "";

function updateNumber(number) {
  currentNumber += number;
  return Number(currentNumber);
}

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    if (isDigit(value)) {
      updateNumber(value);
      display.textContent = currentNumber;
    }

    let operator = button.textContent;
    if (isOperator(operator)) {
      // Наразі число виконує діє лише з самим собою
      // Треба визначити як зберігати останнє значення та виконувати операції з теперішнім значенням
      display.textContent = operate(
        operator,
        Number(currentNumber),
        Number(currentNumber),
      );
    }
  });
});

console.log(add(4, 3));
console.log(subtract(4, 3));
console.log(multiply(4, 3));
console.log(divide(4, 3));
console.log(operate("+", 1, 2));
