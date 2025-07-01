import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';


const Books = (props) => {
  const [genreSelected,setGenreSelected] = useState('all');
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genreSelected }
  });
  if(result.loading) {
    return <div>Loading...</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = Array.from(new Set(books.flatMap(b => b.genres)));

  return (
    <div>
      <h2>books</h2>
      <div>
      {genres.map(g => (
          <button
            key={g}
            onClick={() => setGenreSelected(g)}
            style={{ fontWeight: genreSelected === g ? 'bold' : 'normal' }}
          >
            {g}
          </button>
        ))}
         <button onClick={() => setGenreSelected(null)}>all genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
