import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'08080808080' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const nameHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  
  const alreadyExist = (name) => {
    let nameExist=false
    persons.forEach( (person) => {
      if (person.name === name){
        nameExist=true
      }
    } )
    return nameExist
  }

  const saveContact = (event) => {
    event.preventDefault()
    if (alreadyExist(newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number:newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={saveContact}>
        <div> name: <input value={newName} onChange={nameHandler}/></div>
        <div> number: <input value={newNumber} onChange={numberHandler}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map( (person) =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App