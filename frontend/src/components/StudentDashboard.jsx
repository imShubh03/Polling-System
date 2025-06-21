import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPoll } from '../redux/slices/pollSlice';
import PollResults from './PollResults';
import Chat from './Chat';

function StudentDashboard({ socket }) {
    const { poll, name } = useSelector(state => state.poll);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (poll?.active && timeLeft === 0) setTimeLeft(poll.timer);
        const timer = poll?.active && timeLeft > 0 ? setInterval(() => setTimeLeft(t => t - 1), 1000) : null;
        return () => timer && clearInterval(timer);
    }, [poll, timeLeft]);

    const submitAnswer = () => {
        if (selectedAnswer && timeLeft > 0) {
            socket.emit('submit_answer', { name, answer: selectedAnswer });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full" style={{ backgroundColor: '#F2F2F2' }}>
            <h1 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: '#373737' }}>Student Dashboard</h1>
            {poll?.active ? (
                <div>
                    <h2 className="text-lg" style={{ color: '#373737' }}>{poll.question}</h2>
                    <ul className="mt-2">
                        {Object.entries(poll.options).map(([key, option]) => (
                            <li key={key} className="mb-2">
                                <button
                                    onClick={() => setSelectedAnswer(option)}
                                    className={`bg-purple-600 text-white p-2 rounded ${selectedAnswer === option ? 'bg-opacity-100' : 'bg-opacity-50'} hover:bg-purple-700`}
                                    style={{ backgroundColor: '#7765DA' }}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={submitAnswer}
                        className="bg-purple-600 text-white p-2 rounded mt-2 hover:bg-purple-700"
                        style={{ backgroundColor: '#7765DA' }}
                        disabled={!selectedAnswer || timeLeft <= 0}
                    >
                        Submit
                    </button>
                    <p className="mt-2" style={{ color: '#6E6E6E' }}>Time left: {timeLeft > 0 ? timeLeft : 0}s</p>
                </div>
            ) : poll ? <PollResults poll={poll} /> : <p style={{ color: '#6E6E6E' }}>Wait for the teacher to ask questions...</p>}
            <button onClick={() => setShowChat(!showChat)} className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700" style={{ backgroundColor: '#7765DA' }}>
                {showChat ? 'Close Chat' : 'Open Chat'}
            </button>
            {showChat && <Chat socket={socket} />}
        </div>
    );
}

export default StudentDashboard;