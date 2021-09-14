import React, { useState,useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')

  const contactServer = () =>{
    axios.get('http://localhost:3001/persons')
      .then((resp) => setPersons(resp.data))
  }

  useEffect(contactServer,[])

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

