import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
export const AnecdoteList = () => {
    const dispatch = useDispatch();
    /** Ahora en mi state.filter tengo el termino que se esta buscando, 
     * entonces puedo jugar con eso
     */
    const anecdotes = useSelector(state => {
        const anecdotesToShow = state.filter === ''
            ? state.anecdotes
            : state.anecdotes.filter((a) =>
                a.content.toLowerCase().includes(state.filter.toLowerCase())
            )
        
        // Devolver una copia ordenada, sin mutar el array original
        return [...anecdotesToShow].sort((a, b) => b.votes - a.votes)
    })

    const incrementVoteAnecdote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => incrementVoteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}
