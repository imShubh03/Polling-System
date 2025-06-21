import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
    getActivePoll,
    createPoll,
    updatePollResults,
    endPoll,
    getPollHistory,
} from './src/controllers/pollController.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGINS.split(','),
        methods: ['GET', 'POST'],
    },
});

app.use(cors({
    origin: process.env.CORS_ORIGINS.split(','),
    methods: ['GET', 'POST'],
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

let currentPollId = null;
let students = new Set();
let teacherConnected = false;

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join_as_teacher', async () => {
        if (!teacherConnected) {
            teacherConnected = true;
            const history = await getPollHistory();
            socket.emit('teacher_joined');
            socket.emit('poll_history', history);
        } else {
            socket.emit('teacher_rejected');
        }
    });

    socket.on('join_as_student', (name) => {
        if (!students.has(name)) {
            students.add(name);
            socket.name = name;
            socket.emit('student_joined', name);
            io.emit('update_participants', Array.from(students));
        } else {
            socket.emit('name_taken');
        }
    });

    socket.on('create_poll', async (data) => {
        if (teacherConnected && !currentPollId) {
            const poll = await createPoll({ ...data, active: true });
            currentPollId = poll._id;
            io.emit('new_poll', poll);
            setTimeout(async () => {
                const endedPoll = await endPoll(currentPollId);
                currentPollId = null;
                io.emit('poll_ended', endedPoll);
            }, poll.timer * 1000);
        }
    });

    socket.on('submit_answer', async (data) => {
        if (currentPollId) {
            const { name, answer } = data;
            const updatedPoll = await updatePollResults(currentPollId, { ...await getActivePoll().results, [name]: answer });
            io.emit('update_results', updatedPoll.results);
        }
    });

    socket.on('kick_student', (name) => {
        if (teacherConnected) {
            students.delete(name);
            io.emit('student_kicked', name);
            io.emit('update_participants', Array.from(students));
        }
    });

    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });

    socket.on('disconnect', () => {
        if (socket.name) students.delete(socket.name);
        if (teacherConnected && socket.id === io.sockets.sockets.find(s => s.teacher)?.id) teacherConnected = false;
        io.emit('update_participants', Array.from(students));
    });
});

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));