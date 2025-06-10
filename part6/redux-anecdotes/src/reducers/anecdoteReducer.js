import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name:'anecdotes', // prefijo
  initialState: [], // Initial state
  // Defino los reducers
  reducers:{
    voteAnecdoteWithId(state, action) {
       const id = action.payload // saco el id que llega
       // Buscar anecdota 
       const anecdoteVote = state.find((a) => a.id === id);

       const anecdoteChange = {
        ...anecdoteVote,
        votes: anecdoteVote.votes + 1
       }
       // Si no coincide el id, retorno la anecdota normal, si coincide la cambio
       return state.map((anecdote) => anecdote.id !== id ? anecdote : anecdoteChange)

    },
    appendAnecdote(state, action) {
      state.push(action.payload) // pusheo a las notas lo que me llega
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdoteWithId, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

/** REDUX THUNK PARA DEVOLVER FUNCIONES  */

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = ( content ) => {
  return async dispatch => {
      const newAnecdote = await anecdoteService.createNewAnecdote( content );
      dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = ( anecdote ) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.voteAnecdote( anecdote );
    dispatch(voteAnecdoteWithId( updateAnecdote.id ))
  }
}

export default anecdoteSlice.reducer