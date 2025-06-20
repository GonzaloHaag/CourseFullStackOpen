
import { useEffect } from 'react';
import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import  { initializeAnecdotes  }  from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Con redux thunk ya inicializo las notas 
     dispatch(initializeAnecdotes())
  },[])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App