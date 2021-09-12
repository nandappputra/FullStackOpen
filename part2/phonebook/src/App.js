import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const nameHandler = (event) => {
    setNewName(event.target.value)
  }

  const saveName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={saveName}>
        <div>
          name: <input value={newName} onChange={nameHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( (person) =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App