import { createSlice } from '@reduxjs/toolkit';

const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        role: null,
        name: '',
        poll: null,
    },
    reducers: {
        setRole: (state, action) => { state.role = action.payload; },
        setName: (state, action) => { state.name = action.payload; },
        setPoll: (state, action) => { state.poll = action.payload; },
    },
});

export const { setRole, setName, setPoll } = pollSlice.actions;
export default pollSlice.reducer;