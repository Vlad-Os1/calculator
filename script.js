let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const lastOperationScreen = document.querySelector("#previousOperationScreen");
const currentOperationScreen = document.querySelector("#currentOperationScreen");
const equalBtn = document.querySelector("#equalBtn");
const allClearBtn = document.querySelector("#clearBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const pointBtn = document.querySelector("#pointBtn");


numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent))
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => selectOperator(button.textContent))
});

equalBtn.addEventListener("click", () => evaluate());
allClearBtn.addEventListener("click", () => clear());
deleteBtn.addEventListener("click", () => deleteNum());
pointBtn.addEventListener("click", () => addPoint());


function appendNumber(button) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen){
    resetScreen();
  };
  currentOperationScreen.textContent += button;
};

function selectOperator(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
};

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
};

function deleteNum() {
  currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
};

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperation = null; 
  currentOperationScreen.textContent = "";
  lastOperationScreen.textContent = "";
};

function addPoint() {
  if(!currentOperationScreen.textContent.includes(".")){
    currentOperationScreen.textContent = currentOperationScreen.textContent + "."
  }
};

function roundNum(number) {
  return Math.round(number * 1000) / 1000;
}

function evaluate() {
  if(currentOperation === null || shouldResetScreen === true) return;
  if(currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You cant divide by 0");
    return
  };
  secondOperand = currentOperationScreen.textContent;

  currentOperationScreen.textContent = roundNum(operate(currentOperation, firstOperand, secondOperand));
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;

  currentOperation = null;
  firstOperand = "";
};

document.addEventListener('keydown', (e) => {
  if(e.key > 0 || e.key < 9) appendNumber(e.key);
  if(e.key === "+") selectOperator(e.key);    
  if(e.key === "-") selectOperator(e.key);    
  if(e.key === "/") selectOperator("÷");    
  if(e.key === "*") selectOperator("*");
  if(e.key === "=" || e.key === "Enter") evaluate();
  if(e.key === ".") addPoint();
})




function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b; 
};


function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
      break;
    default:
      return null; 
  }
};