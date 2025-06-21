import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPoll } from '../redux/slices/pollSlice';
import PollForm from './PollForm';
import PollResults from './PollResults';
import Chat from './Chat';

function TeacherDashboard({ socket }) {
    const { poll } = useSelector(state => state.poll);
    const dispatch = useDispatch();
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        socket.on('new_poll', (data) => dispatch(setPoll(data)));
        socket.on('update_results', (results) => dispatch(setPoll({ ...poll, results })));
        socket.on('poll_ended', (data) => dispatch(setPoll(data)));
        socket.on('update_participants', (students) => setParticipants(students));
        return () => {
            socket.off('new_poll');
            socket.off('update_results');
            socket.off('poll_ended');
            socket.off('update_participants');
        };
    }, [socket, dispatch, poll]);

    const kickStudent = (name) => socket.emit('kick_student', name);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl w-full" style={{ backgroundColor: '#F2F2F2' }}>
            <h1 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: '#373737' }}>Teacher Dashboard</h1>
            {!poll?.active ? <PollForm socket={socket} /> : <PollResults poll={poll} />}
            <div className="mt-4">
                <h2 className="text-lg font-semibold" style={{ color: '#373737' }}>Participants</h2>
                <ul className="list-disc pl-5">
                    {participants.map((p, i) => (
                        <li key={i} className="flex justify-between">
                            {p} <button onClick={() => kickStudent(p)} className="text-red-500 hover:text-red-700">Kick out</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TeacherDashboard;