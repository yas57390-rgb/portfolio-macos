import React, { useState } from 'react';

const Calculator = () => {
    const [mode, setMode] = useState('standard'); // 'standard' or 'ip'

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col select-none text-white">
            {/* Mode Toggle */}
            <div className="flex p-2 bg-[#2c2c2c] space-x-2">
                <button
                    onClick={() => setMode('standard')}
                    className={`flex-1 py-1 text-xs rounded ${mode === 'standard' ? 'bg-orange-500 text-white' : 'hover:bg-gray-600 text-gray-400'}`}
                >
                    Standard
                </button>
                <button
                    onClick={() => setMode('ip')}
                    className={`flex-1 py-1 text-xs rounded ${mode === 'ip' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-400'}`}
                >
                    IP Subnet
                </button>
            </div>

            {mode === 'standard' ? <StandardCalculator /> : <IPCalculator />}
        </div>
    );
};

const StandardCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForNewValue) {
            setDisplay(String(digit));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDot = () => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operator) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operator);
            setPreviousValue(newValue);
            setDisplay(String(newValue));
        }

        setWaitingForNewValue(true);
        setOperator(nextOperator);
    };

    const calculate = (first, second, op) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return first / second;
            default: return second;
        }
    };

    return (
        <div className="flex-1 flex flex-col p-3">
            <div className="flex-none h-24 flex items-end justify-end px-2 mb-2">
                <span className="text-white text-5xl font-light truncate w-full text-right">{display}</span>
            </div>
            <div className="flex-1 grid grid-cols-4 grid-rows-5 gap-3 w-full min-h-0">
                <Button label={display === '0' ? 'AC' : 'C'} onClick={clear} className="bg-gray-400 text-black text-xl" />
                <Button label="+/-" onClick={() => setDisplay(String(-parseFloat(display)))} className="bg-gray-400 text-black text-xl" />
                <Button label="%" onClick={() => setDisplay(String(parseFloat(display) / 100))} className="bg-gray-400 text-black text-xl" />
                <Button label="÷" onClick={() => performOperation('/')} className="bg-orange-500 text-white text-2xl" />

                <Button label="7" onClick={() => inputDigit(7)} className="bg-gray-700 text-white text-2xl" />
                <Button label="8" onClick={() => inputDigit(8)} className="bg-gray-700 text-white text-2xl" />
                <Button label="9" onClick={() => inputDigit(9)} className="bg-gray-700 text-white text-2xl" />
                <Button label="×" onClick={() => performOperation('*')} className="bg-orange-500 text-white text-2xl" />

                <Button label="4" onClick={() => inputDigit(4)} className="bg-gray-700 text-white text-2xl" />
                <Button label="5" onClick={() => inputDigit(5)} className="bg-gray-700 text-white text-2xl" />
                <Button label="6" onClick={() => inputDigit(6)} className="bg-gray-700 text-white text-2xl" />
                <Button label="-" onClick={() => performOperation('-')} className="bg-orange-500 text-white text-2xl" />

                <Button label="1" onClick={() => inputDigit(1)} className="bg-gray-700 text-white text-2xl" />
                <Button label="2" onClick={() => inputDigit(2)} className="bg-gray-700 text-white text-2xl" />
                <Button label="3" onClick={() => inputDigit(3)} className="bg-gray-700 text-white text-2xl" />
                <Button label="+" onClick={() => performOperation('+')} className="bg-orange-500 text-white text-2xl" />

                <Button label="0" onClick={() => inputDigit(0)} className="col-span-2 !w-full bg-gray-700 text-white text-left pl-7 text-2xl rounded-l-full rounded-r-none" />
                <Button label="." onClick={inputDot} className="bg-gray-700 text-white text-2xl" />
                <Button label="=" onClick={() => performOperation('=')} className="bg-orange-500 text-white text-2xl" />
            </div>
        </div>
    );
};

const IPCalculator = () => {
    const [ip, setIp] = useState('');
    const [cidr, setCidr] = useState('');
    const [result, setResult] = useState(null);

    const formatIP = (value) => {
        // Simple input masking could go here, but raw input is fine for now
        setIp(value);
    };

    const calculateSubnet = () => {
        try {
            if (!ip.match(/^(\d{1,3}\.){3}\d{1,3}$/) || !cidr || cidr < 0 || cidr > 32) {
                setResult({ error: "Invalid IP or CIDR" });
                return;
            }

            const ipParts = ip.split('.').map(Number);
            const maskBits = parseInt(cidr, 10);

            // To integer
            const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
            const maskInt = -1 << (32 - maskBits);

            const netInt = ipInt & maskInt;
            const broadcastInt = netInt | (~maskInt);
            const firstHostInt = netInt + 1;
            const lastHostInt = broadcastInt - 1;
            const totalHosts = Math.pow(2, 32 - maskBits) - 2;

            const intToIp = (int) => {
                return [
                    (int >>> 24) & 255,
                    (int >>> 16) & 255,
                    (int >>> 8) & 255,
                    int & 255
                ].join('.');
            };

            setResult({
                network: intToIp(netInt),
                netmask: intToIp(maskInt),
                broadcast: intToIp(broadcastInt),
                firstHost: intToIp(firstHostInt),
                lastHost: intToIp(lastHostInt),
                hosts: totalHosts > 0 ? totalHosts.toLocaleString() : 0
            });

        } catch (e) {
            setResult({ error: "Calculation Error" });
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-300">IP Subnet Calc</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">IP Address</label>
                    <input
                        type="text"
                        value={ip}
                        onChange={(e) => formatIP(e.target.value)}
                        placeholder="192.168.1.10"
                        className="w-full bg-[#333] text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">CIDR (e.g., 24)</label>
                    <input
                        type="number"
                        value={cidr}
                        onChange={(e) => setCidr(e.target.value)}
                        placeholder="24"
                        className="w-full bg-[#333] text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={calculateSubnet}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors"
                >
                    Calculate
                </button>
            </div>

            {result && (
                <div className="flex-1 bg-[#252526] rounded p-3 text-sm space-y-2 overflow-auto">
                    {result.error ? (
                        <div className="text-red-400">{result.error}</div>
                    ) : (
                        <>
                            <ResultRow label="Network:" value={`${result.network}/${cidr}`} />
                            <ResultRow label="Netmask:" value={result.netmask} />
                            <ResultRow label="First Host:" value={result.firstHost} />
                            <ResultRow label="Last Host:" value={result.lastHost} />
                            <ResultRow label="Broadcast:" value={result.broadcast} />
                            <ResultRow label="Total Hosts:" value={result.hosts} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const ResultRow = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-700 py-1">
        <span className="text-gray-400">{label}</span>
        <span className="font-mono text-green-400">{value}</span>
    </div>
);

const Button = ({ label, onClick, className = '' }) => (
    <button
        className={`w-full h-full rounded-full font-medium focus:outline-none transition-opacity active:opacity-70 flex items-center justify-center ${className}`}
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
    >
        {label}
    </button>
);

export default Calculator;
