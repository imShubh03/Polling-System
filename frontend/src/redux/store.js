import { configureStore } from '@reduxjs/toolkit';
import pollReducer from './slices/pollSlice';

export default configureStore({
    reducer: {
        poll: pollReducer,
    },
});