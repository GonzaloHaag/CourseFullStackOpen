import axios from 'axios';

export const getAllAnecdotes = () => axios.get('http://localhost:3001/anecdotes').then((res) => res.data); // return implicito

export const createAnecdote = (newAnecdote) => {
    if(newAnecdote.content.length < 5) {
        return Promise.reject(new Error('El contenido debe tener al menos 5 caracteres'))
    }
    return axios.post('http://localhost:3001/anecdotes', newAnecdote).then((res) => res.data); // retorno la anecdota cread
}

export const voteAnecdote = (anecdote) => {
    // Put para actualizar los votos
    return axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`,{
        ...anecdote,
        votes: anecdote.votes + 1
    })
}