import { configureStore } from '@reduxjs/toolkit'
import feedbackReducer from './features/feedback/feedbackSlice'

const store = configureStore({
  reducer: {
    feedback: feedbackReducer
  }
});

export default store;
