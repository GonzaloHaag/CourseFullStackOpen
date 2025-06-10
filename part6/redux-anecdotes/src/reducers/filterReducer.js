import { createSlice } from '@reduxjs/toolkit';

const filterAnecdoteSlice = createSlice({
    name:'filter',
    initialState: '', // vacio

    reducers : {
        filterAnecdote (state, action) {
             return action.payload
        }
    }
})


export const { filterAnecdote } = filterAnecdoteSlice.actions
export default filterAnecdoteSlice.reducer