import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { useNotification } from '../../contexts/NotificationContext';

const Contact = () => {
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus('sending');
        const FORMSPREE_ID = 'xvzzpoww';

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                addNotification({
                    title: 'Message Sent',
                    message: `Thanks ${formData.name}, I'll get back to you soon!`,
                    icon: '📧'
                });
                setFormData({ name: '', email: '', message: '' });
                setStatus('success');
            } else {
                addNotification({ title: 'Error', message: 'Something went wrong.', icon: '❌' });
                setStatus('error');
            }
        } catch (error) {
            addNotification({ title: 'Error', message: 'Network error.', icon: '❌' });
            setStatus('error');
        }
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="w-full h-full flex bg-transparent text-slate-200">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-900/40 backdrop-blur-md border-r border-white/5 p-4 pt-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/10 mb-4 flex items-center justify-center text-slate-400 ring-1 ring-white/10 shadow-lg overflow-hidden">
                    <img
                        src="/assets/cv-photo.png"
                        alt="Yassine Dinar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="64" width="64" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 1.8-23.2 19.3-41.6 42.5-45.7 6.5-1.2 13-1.8 19.5-2.2 24.3 22.1 55.4 36.1 90.5 36.1s66.2-14 90.5-36.1c6.5.4 13 1 19.5 2.2 23.2 4.1 40.7 22.5 42.5 45.7C359.3 421.4 306.7 448 248 448z"></path></svg>';
                        }}
                    />
                </div>
                <h2 className="text-xl font-bold text-white">Yassine Dinar</h2>
                <p className="text-slate-400 text-sm">System & Network Admin</p>

                <div className="mt-8 w-full space-y-3 pl-4">
                    <a href="mailto:contact@ydinar.fr" className="flex items-center space-x-3 text-slate-400 hover:text-white text-sm transition-colors">
                        <FaEnvelope /> <span>contact@ydinar.fr</span>
                    </a>
                    <a href="tel:+33768301873" className="flex items-center space-x-3 text-slate-400 hover:text-white text-sm transition-colors">
                        <FaPhone /> <span>+33 7 68 30 18 73</span>
                    </a>
                    <a href="https://github.com/Yassinedinar" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-white text-sm transition-colors">
                        <FaGithub /> <span>Yassinedinar</span>
                    </a>
                    <a href="https://www.linkedin.com/in/yassine-dinar" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-white text-sm transition-colors">
                        <FaLinkedin /> <span>Yassine Dinar</span>
                    </a>
                </div>
            </div>

            {/* Main Content (Form) */}
            <div className="flex-1 p-8 overflow-y-auto bg-transparent">
                <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-sm">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder-slate-600"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder-slate-600"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Message</label>
                        <textarea
                            className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all h-32 resize-none placeholder-slate-600"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Hello..."
                        ></textarea>
                    </div>
                    <button type="submit" disabled={status === 'sending'} className={`flex items-center justify-center space-x-2 w-full py-2 ${status === 'sending' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <FaPaperPlane size={14} /> <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
