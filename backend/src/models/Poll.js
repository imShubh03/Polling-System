import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
    question: String,
    options: Object,
    results: { type: Object, default: {} },
    active: { type: Boolean, default: false },
    timer: { type: Number, default: 60 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Poll', pollSchema);