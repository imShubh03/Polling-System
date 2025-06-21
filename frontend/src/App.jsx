import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setName, setPoll } from './redux/slices/pollSlice';
import Welcome from './components/Welcome';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const { role, name } = useSelector(state => state.poll);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('teacher_rejected', () => alert('Another teacher is already connected!'));
    socket.on('name_taken', () => alert('Name already taken!'));
    socket.on('new_poll', (poll) => dispatch(setPoll(poll)));
    socket.on('update_results', (results) => dispatch(setPoll({ ...useSelector(state => state.poll.poll), results })));
    socket.on('poll_ended', (poll) => dispatch(setPoll(poll)));
    socket.on('student_kicked', (kickedName) => {
      if (kickedName === name) dispatch(setRole(null));
    });
    return () => socket.disconnect();
  }, [dispatch, name]);

  const handleRoleSelect = (selectedRole, studentName = '') => {
    dispatch(setRole(selectedRole));
    if (selectedRole === 'student') {
      dispatch(setName(studentName));
      socket.emit('join_as_student', studentName);
    } else {
      socket.emit('join_as_teacher');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!role ? <Welcome onRoleSelect={handleRoleSelect} /> :
        role === 'teacher' ? <TeacherDashboard socket={socket} /> :
        <StudentDashboard socket={socket} />}
    </div>
  );
}

export default App;