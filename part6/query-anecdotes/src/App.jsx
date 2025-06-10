import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAnecdotes, voteAnecdote } from './requests';
const App = () => {

  const queryClient = useQueryClient();
  // Obtener anecdotas con react query
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes // La funcion es un get a las anecdotas que retorna la data!
  });

  const voteAnecdoteMutation = useMutation({
     mutationFn: voteAnecdote,
     // Para ver los cambios de votacion debo anular la query
     onSuccess:() => {
        queryClient.invalidateQueries({ queryKey:['anecdotes']})
     }
  })
  const handleVote = (anecdote) => {
      voteAnecdoteMutation.mutate(anecdote)
  }

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Loading...</div>
  }
  if (result.isError) { // true si hay error
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
