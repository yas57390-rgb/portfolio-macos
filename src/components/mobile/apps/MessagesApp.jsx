import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

const MessagesApp = ({ onClose }) => {
    const [step, setStep] = useState(0); // 0: Message, 1: Email, 2: Done
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const [chatHistory, setChatHistory] = useState([
        { type: 'system', text: "Salut ! 👋 N'hésitez pas à m'envoyer un message pour toute opportunité ou question." }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, step]);

    // Sound Effect
    const playSentSound = () => {
        try {
            const audio = new Audio('/assets/sounds/message-sent.mp3');
            audio.play().catch(e => console.log("Audio play failed", e));
        } catch (e) {
            console.log("Audio error", e);
        }
    };

    // Step 1: User sends Message
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        playSentSound();
        setChatHistory(prev => [...prev, { type: 'user', text: message }]);
        setMessage('');

        setTimeout(() => {
            setChatHistory(prev => [...prev, { type: 'system', text: "Bien reçu ! 📨 Pour que Yassine puisse vous recontacter, quelle est votre adresse email ?" }]);
            setStep(1);
        }, 800);
    };

    // Step 2: User sends Email -> Final Submit
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        playSentSound();
        setChatHistory(prev => [...prev, { type: 'user', text: email }]);
        setStatus('sending');

        setTimeout(async () => {
            const FORMSPREE_ID = 'xvzzpoww';
            try {
                const historyText = chatHistory.map(m => `${m.type}: ${m.text} `).join('\n');

                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        message: `User Email: ${email}\n\nChat History:\n${historyText}\nUser: ${email}`
                    })
                });

                if (response.ok) {
                    setChatHistory(prev => [...prev, { type: 'system', text: "C'est envoyé ! Yassine vous répondra très vite. 🚀" }]);
                    setStep(2);
                    setStatus('success');
                    playSentSound();
                } else {
                    setChatHistory(prev => [...prev, { type: 'system', text: "Oups, une erreur est survenue. Réessayez plus tard." }]);
                    setStatus('error');
                }
            } catch (error) {
                setChatHistory(prev => [...prev, { type: 'system', text: "Erreur de connexion." }]);
                setStatus('error');
            }
        }, 800);
    };

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* iMessage Header */}
            <div
                className="px-4 py-3 flex items-center border-b border-gray-200"
                style={{ background: 'rgba(249,250,251,0.95)', backdropFilter: 'blur(20px)' }}
            >
                <button onClick={onClose} className="text-blue-500 flex items-center">
                    <FaChevronLeft size={18} />
                    <span className="ml-1 font-medium">Retour</span>
                </button>
            </div>

            {/* Contact Info Header */}
            <div className="bg-white py-4 flex flex-col items-center border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mb-2">
                    YD
                </div>
                <span className="font-semibold text-gray-900">Yassine Dinar</span>
                <span className="text-xs text-gray-400">iMessage</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-white">
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-relaxed ${msg.type === 'user'
                                ? 'bg-[#007AFF] text-white rounded-2xl rounded-br-md'
                                : 'bg-[#E9E9EB] text-gray-900 rounded-2xl rounded-bl-md'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {status === 'sending' && (
                    <div className="flex justify-start">
                        <div className="bg-[#E9E9EB] text-gray-900 px-4 py-2.5 rounded-2xl rounded-bl-md flex items-center gap-1.5 h-10">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - iOS iMessage Style */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
                <form
                    onSubmit={step === 0 ? handleMessageSubmit : handleEmailSubmit}
                    className="relative flex items-center"
                >
                    <input
                        type={step === 1 ? "email" : "text"}
                        value={step === 1 ? email : message}
                        onChange={(e) => step === 1 ? setEmail(e.target.value) : setMessage(e.target.value)}
                        disabled={step === 2 || status === 'sending'}
                        placeholder={step === 1 ? "Votre adresse email..." : "iMessage"}
                        className="w-full bg-white text-gray-900 border border-gray-300 rounded-full py-2.5 pl-4 pr-12 focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400 text-[15px]"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={step === 2 || status === 'sending' || (step === 0 && !message.trim()) || (step === 1 && !email.trim())}
                        className={`absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${(step === 0 && message.trim()) || (step === 1 && email.trim())
                                ? 'bg-[#007AFF] text-white active:scale-90'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessagesApp;
