import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Message = {
    sender: 'bot' | 'user';
    text: string;
    options?: string[];
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'bot',
            text: 'Hi, welcome to Branded by Winni! How can I help you today?',
            options: ['Website Design', 'Website Maintenance', 'SEO Ranking', 'Branding', 'General Enquiry']
        }
    ]);
    const [step, setStep] = useState<'init' | 'service_selected' | 'name_collected' | 'email_collected' | 'finished'>('init');
    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOptionClick = (option: string) => {
        // Add user selection
        const newMessages = [...messages, { sender: 'user', text: option } as Message];
        setMessages(newMessages);
        setFormData({ ...formData, service: option });
        setStep('service_selected');

        // Bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: `Great choice! I specialize in ${option}. What is your name?`
            }]);
        }, 600);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg = inputText;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputText('');

        // State machine logic
        if (step === 'service_selected') {
            setFormData(prev => ({ ...prev, name: userMsg }));
            setStep('name_collected');
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Nice to meet you! What is your email address so I can send you details?' }]);
            }, 600);
        } else if (step === 'name_collected') {
            setFormData(prev => ({ ...prev, email: userMsg }));
            setStep('email_collected');

            // Save to Supabase
            const finalData = { ...formData, email: userMsg, status: 'new' };
            // Fire and forget save
            supabase.from('leads').insert([finalData]).then(({ error }) => {
                if (error) console.error('Error saving lead:', error);
            });

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'bot',
                    text: 'Thanks! I have received your details. Would you like to chat with me directly on WhatsApp now for a faster response?',
                    options: ['Yes, Open WhatsApp', 'No, I\'m done']
                }]);
                setStep('finished');
            }, 800);
        } else if (step === 'finished') {
            if (userMsg.toLowerCase().includes('yes') || userMsg.toLowerCase().includes('whatsapp')) {
                window.open('https://wa.me/233202326851', '_blank');
            } else {
                setTimeout(() => {
                    setMessages(prev => [...prev, { sender: 'bot', text: 'No problem! We will email you shortly.' }]);
                }, 500);
            }
        }
    };

    const handeOptionClickFinal = (opt: string) => {
        if (opt.includes('WhatsApp')) {
            window.open('https://wa.me/233202326851', '_blank');
        }
        setMessages(prev => [...prev, { sender: 'user', text: opt }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Have a great day!' }]);
        }, 500);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-[#4A3B40] text-[#FAF9F6] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-[#4A3B40] p-4 text-[#FAF9F6] flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-semibold font-serif">Winni Assistant</span>
                        </div>
                        <span className="text-xs opacity-75">Online</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-[#E89BA7] text-[#4A3B40] rounded-br-none'
                                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                {msg.sender === 'bot' && msg.options && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {msg.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => step === 'finished' ? handeOptionClickFinal(opt) : handleOptionClick(opt)}
                                                className="text-xs bg-white border border-[#E89BA7] text-[#4A3B40] px-3 py-1.5 rounded-full hover:bg-[#E89BA7] hover:text-white transition-colors"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                        <input
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E89BA7]"
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="p-2 text-[#4A3B40] hover:bg-gray-100 rounded-full">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
