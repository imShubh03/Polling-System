import React, { useState } from 'react';

function PollForm({ socket }) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [timer, setTimer] = useState(60);

    const addOption = () => setOptions([...options, '']);
    const handleSubmit = () => {
        if (question && options.filter(opt => opt).length >= 2) {
            const pollData = { question, options: options.reduce((acc, opt, i) => (opt ? { ...acc, [i + 1]: opt } : acc), {}), timer };
            socket.emit('create_poll', pollData);
            setQuestion('');
            setOptions(['', '']);
            setTimer(60);
        } else {
            alert('Please enter a question and at least two options!');
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold" style={{ color: '#373737' }}>Create New Poll</h2>
            <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className="border p-2 mb-2 w-full rounded"
                style={{ borderColor: '#6E6E6E' }}
            />
            {options.map((opt, i) => (
                <input
                    key={i}
                    value={opt}
                    onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[i] = e.target.value;
                        setOptions(newOptions);
                    }}
                    placeholder={`Option ${i + 1}`}
                    className="border p-2 mb-2 w-full rounded"
                    style={{ borderColor: '#6E6E6E' }}
                />
            ))}
            <button onClick={addOption} className="bg-purple-600 text-white p-2 rounded mb-2 hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>
                Add More Option
            </button>
            <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                placeholder="Timer (seconds)"
                className="border p-2 mb-2 w-full rounded"
                style={{ borderColor: '#6E6E6E' }}
            />
            <button onClick={handleSubmit} className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>
                Ask Question
            </button>
        </div>
    );
}

export default PollForm;