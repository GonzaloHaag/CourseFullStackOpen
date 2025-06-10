import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';
const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess:() => {
      /** Para que se actualicen los cambios, debo invalidar la query que le puse a mis anecdotas, 
       * para que se refresquen los cambios!
       */
      queryClient.invalidateQueries({ queryKey:['anecdotes']})
    },
    onError:(error) => {
      dispatch({type:'SET_NOTIFICATION',payload:'too short anecdote, must have length 5 or more'}) // Mandamos como payload lo que quiero que aparezca
      setTimeout(() => {
        // lIMPIAR NOTIFIACION
        dispatch({type:'CLEAR_NOTIFICATION'})
      },5000)
    }
  })

  const [notification,dispatch] = useContext(NotificationContext);
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes:0 });
    dispatch({type:'SET_NOTIFICATION',payload:'Added anecdote!'}) // Mandamos como payload lo que quiero que aparezca
    setTimeout(() => {
      // lIMPIAR NOTIFIACION
      dispatch({type:'CLEAR_NOTIFICATION'})
    },5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
