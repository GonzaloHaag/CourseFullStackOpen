import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer';
import { createAnecdote } from '../reducers/anecdoteReducer';
export const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = ''; // Reset input
         // Mando a llamar creator que ya llama al servicio para crear una nota
         dispatch(createAnecdote( content ))
         // Disparar notificacion 
         dispatch(setNotificationWithTimeout('Added anecdote!!',5)) // 5 segundos
    }
    return (
        <form onSubmit={ addAnecdote }>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}
