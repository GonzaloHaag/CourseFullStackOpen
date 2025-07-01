import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, UPDATE_BIRTHDAY } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [updateBirthday] = useMutation(UPDATE_BIRTHDAY,{
    refetchQueries:[{query:ALL_AUTHORS}]
  });
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>Loading...</div>;
  }
  const authors = result.data.allAuthors;

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name.toUpperCase(),
  }));

  const submit = async (event) => {
    event.preventDefault();
    updateBirthday({
      variables: {
        name: name.value,
        setBornTo: parseInt(born),
      },
    });

    setName("");
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      {props.token ? (
        <form onSubmit={submit}>
          <div>
            <Select
              defaultValue={name}
              onChange={setName}
              options={options}
              placeholder="Seleccionar author"
              required
            />
          </div>
          <div>
            Born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
              required
            />
          </div>
          <button type="submit">Update author</button>
        </form>
      ) : (
        <span>Not authenticated</span>
      )
    }
    </div>
  );
};

export default Authors;
