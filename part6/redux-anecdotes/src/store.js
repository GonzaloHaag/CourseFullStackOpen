import { configureStore } from '@reduxjs/toolkit';
import reducerAnecdote from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer';
const store = configureStore({
    reducer: {
      anecdotes: reducerAnecdote,
      filter: filterReducer,
      notification: notificationReducer
    }
  })

export default store
  