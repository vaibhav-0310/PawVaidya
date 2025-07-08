import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import Footer from '../utils/footer';

const VetChat = () => {
    const { vetId } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Check if user is authenticated
        if (!isAuthenticated || !user) {
            setError('Please login to access chat');
            setLoading(false);
            return;
        }

        // Initialize socket connection
        const socketInstance = io('https://pawvaidya-vbdx.onrender.com/');
        setSocket(socketInstance);

        // Initialize chat
        initializeChat();

        return () => {
            socketInstance.disconnect();
        };
    }, [vetId, isAuthenticated, user]);

    useEffect(() => {
        if (socket && chat) {
            // Join chat room
            socket.emit('join-chat', chat._id);

            // Listen for new messages
            socket.on('receive-message', (messageData) => {
                setMessages(prev => [...prev, messageData]);
            });

            // Listen for message read status
            socket.on('message-read', (data) => {
                setMessages(prev => prev.map(msg => 
                    msg.messageId === data.messageId ? { ...msg, read: true } : msg
                ));
            });

            // Listen for errors
            socket.on('error', (errorMsg) => {
                setError(errorMsg);
            });
        }

        return () => {
            if (socket) {
                socket.off('receive-message');
                socket.off('message-read');
                socket.off('error');
            }
        };
    }, [socket, chat]);

    const initializeChat = async () => {
        try {
            setLoading(true);
            
            if (!user || !user._id) {
                setError('User not authenticated');
                return;
            }
            
            // Create or get existing chat
            const response = await axios.post('/api/chat/create', {
                userId: user._id,
                vetId: vetId
            });

            const chatData = response.data;
            setChat(chatData);
            setMessages(chatData.messages || []);
            setError(null);
        } catch (error) {
            console.error('Error initializing chat:', error);
            setError(`Failed to initialize chat: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !socket || !chat) return;

        const messageData = {
            chatId: chat._id,
            senderId: user._id,
            senderType: 'user',
            content: newMessage.trim()
        };

        socket.emit('send-message', messageData);
        setNewMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (loading) {
        return (
            <div 
                className="d-flex justify-content-center align-items-center" 
                style={{ 
                    minHeight: '100vh', 
                    backgroundColor: '#fff0f5'
                }}
            >
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading chat...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div 
                className="d-flex justify-content-center align-items-center" 
                style={{ 
                    minHeight: '100vh', 
                    backgroundColor: '#fff0f5',
                    padding: '20px'
                }}
            >
                <div className="alert alert-danger shadow-sm" role="alert" style={{ maxWidth: '500px' }}>
                    <h4 className="alert-heading">Oops!</h4>
                    <p className="mb-0">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="d-flex flex-column" 
            style={{ 
                minHeight: '100vh', 
                backgroundColor: '#fff0f5'
            }}
        >
            {/* Main Chat Container */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
                <div className="w-100" style={{ maxWidth: '900px' }}>
                    <div className="card shadow-lg border-0" style={{ backgroundColor: '#ffffff' }}>
                        {/* Chat Header */}
                        <div 
                            className="card-header text-white" 
                            style={{ 
                                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                borderRadius: '0.5rem 0.5rem 0 0'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                {chat?.vet?.image && (
                                    <img
                                        src={chat.vet.image}
                                        alt={chat.vet.name}
                                        className="rounded-circle me-3 border border-white"
                                        style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            objectFit: 'cover',
                                            borderWidth: '2px !important'
                                        }}
                                    />
                                )}
                                <div>
                                    <h4 className="mb-0 fw-bold">{chat?.vet?.name}</h4>
                                    <small className="text-light opacity-75">{chat?.vet?.post}</small>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            className="card-body p-0"
                            style={{ 
                                height: '60vh', 
                                overflowY: 'auto',
                                backgroundColor: '#fef7f7'
                            }}
                        >
                            <div className="p-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-muted d-flex flex-column align-items-center justify-content-center h-100">
                                        <div className="mb-3">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                            </svg>
                                        </div>
                                        <p className="fs-5 mb-2">No messages yet</p>
                                        <p className="text-muted">Start the conversation with Dr. {chat?.vet?.name}!</p>
                                    </div>
                                ) : (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-3 d-flex ${
                                                message.senderType === 'user' ? 'justify-content-end' : 'justify-content-start'
                                            }`}
                                        >
                                            <div
                                                className={`p-3 rounded-4 shadow-sm ${
                                                    message.senderType === 'user'
                                                        ? 'text-white'
                                                        : 'border'
                                                }`}
                                                style={{ 
                                                    maxWidth: '70%',
                                                    backgroundColor: message.senderType === 'user' ? '#ff6b9d' : '#ffffff'
                                                }}
                                            >
                                                <p className="mb-1">{message.content}</p>
                                                <small className={`${
                                                    message.senderType === 'user' ? 'text-light' : 'text-muted'
                                                }`}>
                                                    {new Date(message.timestamp).toLocaleTimeString()}
                                                    {message.senderType === 'user' && message.read && (
                                                        <span className="ms-2">✓✓</span>
                                                    )}
                                                </small>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="card-footer border-0" style={{ backgroundColor: '#ffffff' }}>
                            <div className="input-group">
                                <textarea
                                    className="form-control border-0 shadow-sm"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    rows="2"
                                    style={{ 
                                        resize: 'none',
                                        backgroundColor: '#fef7f7',
                                        borderRadius: '1rem 0 0 1rem'
                                    }}
                                />
                                <button
                                    className="btn text-white px-4"
                                    type="button"
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    style={{ 
                                        background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                        borderRadius: '0 1rem 1rem 0',
                                        border: 'none'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default VetChat;
