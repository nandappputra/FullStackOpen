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

  const getAllContacts = () =>{
    let req = axios.get('http://localhost:3001/persons')
    return req.then((resp) => resp.data)
  }

  const addContact = (contact) =>{
    let req = axios.post('http://localhost:3001/persons',contact)
    return req.then((resp) => resp.data)
  }

  const obtainContact = () => {
    getAllContacts().then( (res) =>setPersons(res))
  }

  useEffect(obtainContact,[])

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
      addContact({name:newName, number:newNumber}).then( (res) => {
        setPersons(persons.concat(res))
      })
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

