import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ... Cargar todos los recursos!
  useEffect(() => {
    const fetchResources = async () => {
       const response = await axios.get(baseUrl); // aca llega la url a la cual quiero hacer el get
       setResources( response.data )
    }
    fetchResources();
  },[ baseUrl ])

  const create = async (resource) => {
    // Crear un recurso en el backend y tambien actualizar mi estado!
    const response = await axios.post(baseUrl,resource);
    setResources(resources.concat( response.data )); // Le concateno el nuevo recurso!
  }

  // Otras funcionalidades
  
  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value }) // le mando el recurso a mi hook
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value}) // le mando recurso a mi hook
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App