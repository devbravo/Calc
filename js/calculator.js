
class Calculator {
  constructor(previousTextElement, currentTextElement, calcHistory) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.calcHistory = calcHistory;
    this.array = [];
    this.clear();
  }

  // Clear the display and set currentOperation to 0
  clear() {
    this.previousOperation = '';
    this.currentOPeration = 0;
    this.operand = undefined;
    this.array = [];
    this.calcHistory.innerText = '';
  }

  // Add the last 10 calculations to an array for display
  calcToArray() {
    this.array.push(
      this.previousTextElement.innerText + this.currentTextElement.innerText
    );
    if (this.array.length > 10) {
      this.array.shift();
    }
  }

  // Append a number
  appendNumber(number) {
    if (this.currentTextElement.innerText === '0' && number === '0') {
      this.currentOPeration = '0';
    } else if (this.currentTextElement.innerText === '0' && number !== '0') {
      this.currentOPeration = number.toString();
      this.previousOperation = '';
    } else if (this.previousOperation && this.currentOPeration > 0) {
      this.previousOperation = '';
      this.currentOPeration = number.toString();
    } else {
      this.currentOPeration =
        this.currentOPeration.toString() + number.toString();
    }
  }

  // add a operand (+, -, *, /, =)
  chooseOperand(operand) {
    this.operand = operand;
    this.previousOperation = this.currentOPeration + this.operand;
    this.currentOPeration = '';
  }

  // compute the actions
  operate() {
    let result;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOPeration);

    switch (this.operand) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
   
      case '÷':
        if (current === 0 && this.operand === '÷') {
          result = "Can't divide by 0";
        } else {
          result = prev / current;
        }
        break;
      default:
        return;
    }
    this.previousOperation =
      this.previousOperation + this.currentOPeration + '=';
    this.currentOPeration = result;
    this.operand = undefined;
  }

  // Update the display after an action
  updateDisplay() {
    this.currentTextElement.innerText = this.currentOPeration;
    this.previousTextElement.innerText = this.previousOperation;
  }

  // Update the display for the previous 10 calculations
  updatePrevCalcDisplay() {
    this.calcHistory.innerText = this.array;
  }
}


numberBtn = document.querySelectorAll('[data-number]');
OperandBtn = document.querySelectorAll('[data-operand]');
equalBtn = document.querySelector('[data-equal]');
clearBtn = document.querySelector('[data-clear]');
previousTextElement = document.querySelector('[data-previous]');
currentTextElement = document.querySelector('[data-current]');
calcHistory = document.querySelector('[data-prev-10-calc]');

const calculator = new Calculator(
  previousTextElement,
  currentTextElement,
  calcHistory
);

// Methods for adding number, choosing operands and computing
numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

OperandBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperand(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  calculator.operate();
  calculator.updateDisplay();
  calculator.calcToArray();
  calculator.updatePrevCalcDisplay();
});

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});