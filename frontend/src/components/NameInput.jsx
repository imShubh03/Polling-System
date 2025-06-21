import React, { useState } from 'react';

function NameInput({ onSubmit }) {
    const [name, setName] = useState('');

    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full" style={{ backgroundColor: '#F2F2F2' }}>
            <h1 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: '#373737' }}>Let's Get Started</h1>
            <p className="text-gray-600 mb-6" style={{ color: '#6E6E6E' }}>If you're a student, you'll be able to submit your answers, participate in live polls, and see how your responses compare with your classmates</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="border p-2 mb-2 w-full text-center rounded"
                style={{ borderColor: '#6E6E6E' }}
            />
            <button onClick={() => onSubmit(name)} className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>
                Continue
            </button>
        </div>
    );
}

export default NameInput;