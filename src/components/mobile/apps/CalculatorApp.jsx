import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

const CalculatorApp = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const currentValue = prevValue || 0;
            let result;
            switch (operator) {
                case '+': result = currentValue + inputValue; break;
                case '-': result = currentValue - inputValue; break;
                case '×': result = currentValue * inputValue; break;
                case '÷': result = inputValue !== 0 ? currentValue / inputValue : 'Error'; break;
                default: result = inputValue;
            }
            setDisplay(String(result));
            setPrevValue(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = () => {
        if (!operator || prevValue === null) return;
        performOperation(null);
        setOperator(null);
    };

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const percentage = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    const Button = ({ value, onClick, className = '', wide = false }) => (
        <button
            onClick={onClick}
            className={`h-[70px] rounded-full flex items-center justify-center text-2xl font-medium active:opacity-70 transition-opacity ${wide ? 'col-span-2 justify-start pl-7' : ''} ${className}`}
        >
            {value}
        </button>
    );

    return (
        <div className="h-full bg-black flex flex-col">
            {/* Header */}
            <div className="flex items-center px-4 py-2">
                <button onClick={onClose} className="text-blue-500 flex items-center">
                    <FaChevronLeft className="mr-1" />
                    Retour
                </button>
            </div>

            {/* Display */}
            <div className="flex-1 flex items-end justify-end px-6 pb-4">
                <span className="text-white text-6xl font-light tracking-tight">
                    {display.length > 9 ? parseFloat(display).toExponential(4) : display}
                </span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3 p-4">
                <Button value="AC" onClick={clear} className="bg-gray-400 text-black" />
                <Button value="+/-" onClick={toggleSign} className="bg-gray-400 text-black" />
                <Button value="%" onClick={percentage} className="bg-gray-400 text-black" />
                <Button value="÷" onClick={() => performOperation('÷')} className="bg-orange-500 text-white" />

                <Button value="7" onClick={() => inputDigit(7)} className="bg-gray-700 text-white" />
                <Button value="8" onClick={() => inputDigit(8)} className="bg-gray-700 text-white" />
                <Button value="9" onClick={() => inputDigit(9)} className="bg-gray-700 text-white" />
                <Button value="×" onClick={() => performOperation('×')} className="bg-orange-500 text-white" />

                <Button value="4" onClick={() => inputDigit(4)} className="bg-gray-700 text-white" />
                <Button value="5" onClick={() => inputDigit(5)} className="bg-gray-700 text-white" />
                <Button value="6" onClick={() => inputDigit(6)} className="bg-gray-700 text-white" />
                <Button value="-" onClick={() => performOperation('-')} className="bg-orange-500 text-white" />

                <Button value="1" onClick={() => inputDigit(1)} className="bg-gray-700 text-white" />
                <Button value="2" onClick={() => inputDigit(2)} className="bg-gray-700 text-white" />
                <Button value="3" onClick={() => inputDigit(3)} className="bg-gray-700 text-white" />
                <Button value="+" onClick={() => performOperation('+')} className="bg-orange-500 text-white" />

                <Button value="0" onClick={() => inputDigit(0)} className="bg-gray-700 text-white" wide />
                <Button value="." onClick={inputDecimal} className="bg-gray-700 text-white" />
                <Button value="=" onClick={calculate} className="bg-orange-500 text-white" />
            </div>
        </div>
    );
};

export default CalculatorApp;
