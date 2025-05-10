import { useState } from 'react'
import { Filter } from './Filter';
import { PersonForm } from './PersonForm';
import { Persons } from './Persons';
import { useEffect } from 'react';
import personsService from './services/persons';
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterName, setFilterName] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
  useEffect(() => {
    personsService
      .getAll()
      .then((personsData) => setPersons(personsData))
      .catch(err => {
        console.log(err)
      })
  }, [])
  const addNewName = (e) => {
    e.preventDefault();
    const personExist = persons.find((p) => p.name === newName);
    if (personExist) {
      if (window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)) {

        const updatedPerson = {
          ...personExist, // todo el objeto
          number: newPhone // actualizo solo este campo
        }
        personsService
          .updatePerson(updatedPerson)
          .then((personData) => {
            setPersons(persons.map(p => p.id === personData.id ? personData : p)); // actaulizo el array
            setNewName('');
            setNewPhone('');
            setMessageSuccess(
              `${personData.name} updated correctly`
            )
            setTimeout(() => {
              setMessageSuccess(null)
            }, 5000)
          })
          .catch(err => {
            console.log(err)
            setErrorMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else {
      personsService
        .createPerson({ name: newName, number: newPhone })
        .then((createPersonData) => {
          setPersons(persons.concat(createPersonData)); // en createPersonData llega la persona que cree
          setNewName('');
          setNewPhone('');
          setMessageSuccess(
            `Added ${createPersonData.name}`
          )
          setTimeout(() => {
            setMessageSuccess(null)
          }, 5000)
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  const filteredNames = filterName === ''
    ? persons
    : persons.filter((p) =>
      p.name.toLowerCase().includes(filterName.toLowerCase())
    );

  const onClickDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deletePerson(id)
        .then((personDelete) => {
          setPersons(persons.filter((p) => p.id !== personDelete.id)) // actualizo el array
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      {
        errorMessage && (
            <span style={{ width: '100%', padding: '0.5rem', backgroundColor: 'slategrey', border: '4px solid red', fontSize:'20px' }}>{errorMessage}</span>
        )
      }
      {
        messageSuccess && (
            <span style={{ width: '100%', padding: '0.5rem', backgroundColor: 'slategrey', border: '4px solid green', fontSize:'20px' }}>{messageSuccess}</span>
        )
      }
      </div>
      <div style={{marginTop:'20px'}}>
      <Filter filterName={filterName} onChange={(e) => setFilterName(e.target.value)} />
      </div>
      <h3>add a new</h3>
      <PersonForm addNewName={addNewName} newName={newName} onChangeName={(e) => setNewName(e.target.value)} newPhone={newPhone} onChangePhone={(e) => setNewPhone(e.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={filteredNames} onClickDeletePerson={onClickDeletePerson} />
    </div>
  )
}

export default App
