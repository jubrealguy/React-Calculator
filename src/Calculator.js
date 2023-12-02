import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(String(digit));
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setWaitingForSecondValue(false);
    setOperator(null);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(result);
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue, secondValue, operator) => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  return (
    <>
    <h1>My Calculator</h1>
    <div className="calculator">
      <input type="text" value={displayValue} disabled className='calculator-input' />
      <div className="keyboard">
        <div className="row">
          <button onClick={() => inputDigit(1)}>1</button>
          <button onClick={() => inputDigit(2)}>2</button>
          <button onClick={() => inputDigit(3)}>3</button>
          <button onClick={() => performOperation('+')} className='operation'>+</button>
        </div>
        <div className="row">
          <button onClick={() => inputDigit(4)}>4</button>
          <button onClick={() => inputDigit(5)}>5</button>
          <button onClick={() => inputDigit(6)}>6</button>
          <button onClick={() => performOperation('-')} className='operation'>-</button>
        </div>
        <div className="row">
          <button onClick={() => inputDigit(7)}>7</button>
          <button onClick={() => inputDigit(8)}>8</button>
          <button onClick={() => inputDigit(9)}>9</button>
          <button onClick={() => performOperation('×')} className='operation'>×</button>
        </div>
        <div className="row">
          <button onClick={clearDisplay} className="clear">C</button>
          <button onClick={() => inputDigit(0)}>0</button>
          <button onClick={() => performOperation('=')}>=</button>
          <button onClick={() => performOperation('÷')} className='operation'>÷</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Calculator;
