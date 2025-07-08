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
        // Check if user is authenticated
        if (!isAuthenticated || !user) {
            setError('Please login to access chat');
            setLoading(false);
            return;
        }

        // Initialize socket connection
        const socketInstance = io('http://localhost:8080');
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        {/* Chat Header */}
                        <div className="card-header bg-primary text-white">
                            <div className="d-flex align-items-center">
                                {chat?.vet?.image && (
                                    <img
                                        src={chat.vet.image}
                                        alt={chat.vet.name}
                                        className="rounded-circle me-3"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                )}
                                <div>
                                    <h5 className="mb-0">{chat?.vet?.name}</h5>
                                    <small className="text-light">{chat?.vet?.post}</small>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            className="card-body"
                            style={{ 
                                height: '400px', 
                                overflowY: 'auto',
                                backgroundColor: '#f8f9fa'
                            }}
                        >
                            {messages.length === 0 ? (
                                <div className="text-center text-muted">
                                    <p>No messages yet. Start the conversation!</p>
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
                                            className={`p-3 rounded-3 ${
                                                message.senderType === 'user'
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white border'
                                            }`}
                                            style={{ maxWidth: '70%' }}
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

                        {/* Message Input */}
                        <div className="card-footer">
                            <div className="input-group">
                                <textarea
                                    className="form-control"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    rows="2"
                                    style={{ resize: 'none' }}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default VetChat;
