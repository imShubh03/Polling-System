import React, { useState } from 'react';

function Welcome({ onRoleSelect }) {
    const [name, setName] = useState('');

    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full" style={{ backgroundColor: '#F2F2F2' }}>
            <h1 className="text-3xl font-bold mb-4 text-gray-800" style={{ color: '#373737' }}>Welcome to the Live Polling System</h1>
            <p className="text-gray-600 mb-6" style={{ color: '#6E6E6E' }}>Please select the role that best describes you to begin using the live polling system</p>
            <div className="flex justify-center space-x-4 mb-6">
                <button onClick={() => onRoleSelect('teacher')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>I'm a Teacher</button>
                <button onClick={() => onRoleSelect('student', name)} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }} disabled={!name}>
                    I'm a Student
                </button>
            </div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="border p-2 rounded w-full text-center"
                style={{ borderColor: '#6E6E6E' }}
            />
        </div>
    );
}

export default Welcome;