import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const onClickRandomAnecdote = () => {
    setSelected(selected + 1);
    if (selected === anecdotes.length - 1) setSelected(0);  // para no pasarme de la longitud del array
  }

  const onClickVoted = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  const maxVote = Math.max(...votes); // Obtener el mayor valor del array 
  const indexMaxVote = votes.indexOf(maxVote); // Obtener indice del mayor valor
  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={onClickVoted}>vote</button>
        <button onClick={onClickRandomAnecdote}>next anecdote</button>
      </div>

      <div>
        <h2>Anecdote with most votes</h2>
        {
          maxVote !== 0 && (
            <div>
              <p>{anecdotes[indexMaxVote]}</p>
              <p>has {maxVote} votes</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
