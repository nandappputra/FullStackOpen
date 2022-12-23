import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import AlertMessage from "./components/AlertMessage";

import contactService from "./services/contactService";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const obtainContact = () => {
    contactService.getAllContacts().then((res) => setPersons(res));
  };

  useEffect(obtainContact, []);

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteHandler = (event) => {
    if (window.confirm(`Delete ${event.target.getAttribute("contactname")}?`)) {
      let contactID = event.target.getAttribute("contactid");
      contactService.deleteContact(contactID).then(() => {
        let a = persons.filter((person) => person.id !== contactID);
        setPersons(a);
      });
    }
  };

  const updateSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const alreadyExist = (name) => {
    let already = false;
    let id = 0;
    persons.forEach((person) => {
      if (person.name === name) {
        already = true;
        id = person.id;
      }
    });
    if (already) {
      return [true, id];
    }
    return [false, null];
  };

  const saveContact = (event) => {
    event.preventDefault();
    let checkName = alreadyExist(newName);
    if (checkName[0]) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .replaceContact(checkName[1], { name: newName, number: newNumber })
          .then((res) => {
            setPersons(
              persons.filter((person) => person.name !== res.name).concat(res)
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((res) => {
            setErrorMessage(true);
            setAlertMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setAlertMessage(null);
              setErrorMessage(false);
            }, 5000);
          });
      }
    } else {
      contactService
        .addContact({ name: newName, number: newNumber })
        .then((res) => {
          setPersons(persons.concat(res));
          setAlertMessage(`Added ${newName}`);
          setNewName("");
          setNewNumber("");

          setTimeout(() => {
            setAlertMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(true);
          setAlertMessage(error.response.data.error);
          setTimeout(() => {
            setAlertMessage(null);
            setErrorMessage(false);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <AlertMessage message={alertMessage} error={errorMessage} />
      <Filter value={searchQuery} onChange={updateSearch} />
      <h2>Add a new</h2>
      <PersonForm
        saveContact={saveContact}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchQuery={searchQuery}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
