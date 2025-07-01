import { useQuery } from "@apollo/client";
import { BOOKS_BY_USER_GENRE, USER_FAVORITE_GENRE } from "../queries";

const Recommended = (props) => {
  const result = useQuery(USER_FAVORITE_GENRE);
  const resultBooksByuser = useQuery(BOOKS_BY_USER_GENRE);
  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (resultBooksByuser.loading) {
    return <div>Loading...</div>;
  }
  const books = resultBooksByuser.data.allBooksByUserGenre
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h3>
        books in your favorite genre <b>{result.data.me.favoriteGenre}</b>
      </h3>
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
  );
};

export default Recommended;
