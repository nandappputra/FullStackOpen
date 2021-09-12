import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')

  const nameHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const updateSearch = (event) => {
    setSearchQuery(event.target.value)
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
      <Filter value={searchQuery} onChange={updateSearch}/>
      <h2>Add a new</h2>
      <PersonForm saveContact={saveContact} newName={newName} nameHandler={nameHandler} newNumber={newNumber} numberHandler={numberHandler} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  )
}

export default App

