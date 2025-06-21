import Poll from '../models/Poll.js';

export const getActivePoll = async () => {
    return await Poll.findOne({ active: true }).lean();
};

export const createPoll = async (data) => {
    const newPoll = new Poll(data);
    await newPoll.save();
    return newPoll;
};

export const updatePollResults = async (pollId, results) => {
    return await Poll.findByIdAndUpdate(pollId, { results }, { new: true, lean: true });
};

export const endPoll = async (pollId) => {
    const poll = await Poll.findByIdAndUpdate(pollId, { active: false }, { new: true, lean: true });
    return poll;
};

export const getPollHistory = async () => {
    return await Poll.find({ active: false }).lean();
};