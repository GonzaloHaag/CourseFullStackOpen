/** Comunicacion con mi servidor */
import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAllAnecdotes = async() => {
    const response = await axios.get(baseUrl);
    return response.data
}

const createNewAnecdote = async(content) => {
    const object = {
        content: content,
        votes:0
    }
    const response = await axios.post(baseUrl,object);
    return response.data; // el objecto creado
}

const voteAnecdote = async(anecdote) => {
    const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${anecdote.id}`,newAnecdote)
    return response.data // data actualizada
}

export default { getAllAnecdotes, createNewAnecdote, voteAnecdote };