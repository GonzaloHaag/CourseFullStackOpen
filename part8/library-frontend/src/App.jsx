import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { BOOK_ADDED, ALL_BOOKS } from './queries';


const App = () => {
  const [page, setPage] = useState("authors");
  const [token,setToken] = useState(null);
  const [error,setError] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`Nuevo libro agregado: ${addedBook.title} de ${addedBook.author.name}`);
      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, (oldData) => {
        if (!oldData) return { allBooks: [addedBook] };
        if (oldData.allBooks.some(b => b.id === addedBook.id)) return oldData;
        return {
          allBooks: oldData.allBooks.concat(addedBook)
        };
      });
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore(); // limpiar cache de apollo
    setPage("login")
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token ? (
            <>
               <button onClick={() => setPage("add")}>add book</button>
               <button onClick={() => setPage("recommended")}>recommended</button>
               <button onClick={logout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage("login")}>login</button>
          )
        }
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} token={token} setError={setError} error={error} />

      <Recommended show={page === "recommended"} />

      <LoginForm show={page === "login"} setPage={setPage} setToken={setToken} error={error} setError={setError} />
    </div>
  );
};

export default App;
