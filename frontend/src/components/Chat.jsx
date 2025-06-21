import React, { useState, useEffect } from 'react';

function Chat({ socket }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chat_message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });
        return () => socket.off('chat_message');
    }, [socket]);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('chat_message', { user: 'User', message: input });
            setInput('');
        }
    };

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: '#F2F2F2' }}>
            <h2 className="text-lg font-semibold" style={{ color: '#373737' }}>Chat</h2>
            <div className="h-32 overflow-y-auto border p-2 mb-2" style={{ borderColor: '#6E6E6E' }}>
                {messages.map((msg, i) => (
                    <p key={i} className="text-sm" style={{ color: '#373737' }}>{msg.user}: {msg.message}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 w-full rounded"
                style={{ borderColor: '#6E6E6E' }}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-purple-600 text-white p-2 rounded mt-2 hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>
                Send
            </button>
        </div>
    );
}

export default Chat;