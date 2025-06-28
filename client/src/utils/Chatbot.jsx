import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            content: "Hi there! I'm your PawVadiya assistant. I'm here to help with pet care, veterinary services, and pet adoption. How can I assist you today? 🐾",
            isUser: false,
            timestamp: new Date(),
            isService: true
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        const initialTipTimer = setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: "💡 Quick tip: Use the buttons below for common questions, or type anything about pets! I can help with care tips, vet appointments, adoption info, and emergency guidance.",
                    isUser: false,
                    timestamp: new Date(),
                    isService: true
                }
            ]);
        }, 2000); 
        return () => clearTimeout(initialTipTimer);
    }, []); 
    const getGeminiResponse = async (userMessage) => {
        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyA6HKqD1E8TqNqTmiDAfkagN8js9FDjm58"; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json(); 
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                return text;
            } else {
                console.error("Unexpected Gemini API response structure:", result);
                return "I received an unexpected response from the AI. Please try again.";
            }
        } catch (error) {
            console.error("Error generating content from Gemini:", error);
            return "Oops! I'm having trouble connecting to my brain right now. Please try again later, or contact support directly.";
        }
    };
    const sendMessage = async () => {
        if (inputMessage.trim() === '') return; 

        const newUserMessage = {
            content: inputMessage.trim(),
            isUser: true,
            timestamp: new Date()
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputMessage(''); 
        setIsTyping(true); 

        // Call Gemini API for a response
        const botResponseContent = await getGeminiResponse(newUserMessage.content);

        // Simulate a small delay before showing bot response for better UX
        setTimeout(() => {
            const newBotMessage = {
                content: botResponseContent,
                isUser: false,
                timestamp: new Date(),
                isService: true
            };
            setMessages((prevMessages) => [...prevMessages, newBotMessage]);
            setIsTyping(false); 
        }, 1000 + Math.random() * 500); 
    };


    const sendQuickMessage = (message) => {
        setInputMessage(message);
 
        setTimeout(() => sendMessage(), 50); 
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <style jsx>{`
               
            `}</style>
            <div className="chat-header">
                <h1>PawVadiya Assistant</h1>
                <p>Your friendly pet care companion</p>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                        <div className="avatar">{msg.isUser ? '👤' : '🐕'}</div>
                        <div className="message-content">
                            {msg.content.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="typing-indicator">
                        PawVadiya is typing
                        <div className="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
               
                <div ref={messagesEndRef} /> 
            </div>

            <div className="quick-actions">
                <div className="quick-buttons">
                    
                    <button className="quick-btn" onClick={() => sendQuickMessage('Tell me about pet care tips.')}>🏥 Pet Care</button>
                    <button className="quick-btn" onClick={() => sendQuickMessage('What veterinary services do you offer?')}>🩺 Vet Services</button>
                    <button className="quick-btn" onClick={() => sendQuickMessage('How can I adopt a pet?')}>🏠 Adoption</button>
                    <button className="quick-btn" onClick={() => sendQuickMessage('I have a pet emergency, what should I do?')}>🚨 Emergency</button>
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask me anything about pets..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isTyping} 
                    />
                    <button className="send-btn" onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;