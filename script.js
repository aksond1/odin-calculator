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
  if (b === 0) {
    alert("Bro really tried to divide by 0 xdd");
  }
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
  return value === ".";
}

function isPercent(value) {
  return value === "%";
}

function isSquareRoot(value) {
  return value === "√";
}

function isToggleSign(value) {
  return value === "+/-";
}

function isOperator(operator) {
  return (
    operator === "+" || operator === "-" || operator === "×" || operator === "÷"
  );
}

let currentNumber = "";
let lastNumber = null;
let currentOperator = null;

let reset = false;
let operatorPressed = false;

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    if (isDigit(value) || isFloat(value)) {
      if (reset) {
        currentNumber = "";
        reset = false;
      }

      operatorPressed = false;
      currentNumber += value;
      display.textContent = currentNumber;
    }

    if (isFloat(value)) {
      if (currentNumber.includes(".")) return;

      if (reset) {
        currentNumber = "0.";
        reset = false;
      } else if (currentNumber === "") {
        currentNumber = "0.";
      } else {
        currentNumber += ".";
      }

      display.textContent = currentNumber;
    }

    if (isNegative(value) && currentNumber === "") {
      currentNumber = "-";
      return;
    }

    if (isPercent(value)) {
      if (lastNumber !== null) {
        currentNumber = String((lastNumber * Number(currentNumber)) / 100);
      } else {
        currentNumber = String(Number(currentNumber) / 100);
      }
      display.textContent = currentNumber;
    }

    if (isToggleSign(value) && currentNumber !== "") {
      currentNumber = String(-Number(currentNumber));
    }

    if (isOperator(value)) {
      if (operatorPressed && currentNumber === "") {
        currentOperator = value;
        return;
      }

      operatorPressed = true;

      if (currentNumber === "" && lastNumber === null) {
        currentOperator = value;
        return;
      }

      if (lastNumber !== null && currentNumber !== "") {
        lastNumber = operate(
          currentOperator,
          lastNumber,
          Number(currentNumber),
        );
        display.textContent = lastNumber;
      } else if (currentNumber !== "") {
        lastNumber = Number(currentNumber);
      }

      currentOperator = value;
      currentNumber = "";
    }

    if (isSquareRoot(value)) {
      currentNumber = String(Math.sqrt(Number(currentNumber)));
      display.textContent = currentNumber;
    }

    if (value === "=") {
      reset = true;
      operatorPressed = false;
      result();
    }

    if (value === "C") {
      lastNumber = null;
      currentNumber = "";
      currentOperator = null;
      operatorPressed = false;

      display.textContent = "";
    }
  });
});

function result() {
  if (currentOperator === null || currentNumber === "" || lastNumber === null) {
    return;
  }

  const result = operate(
    currentOperator,
    Number(lastNumber),
    Number(currentNumber),
  );

  display.textContent = Number(result.toFixed(10));

  lastNumber = null;
  currentNumber = String(result);
  currentOperator = null;
}
