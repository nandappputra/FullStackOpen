import React from "react";

const Persons = ({persons,searchQuery}) => {
    return(
        <>
        {persons.filter( (person)=> person.name.toLowerCase().includes(searchQuery)).map( (person) =>
            <p key={person.name}>{person.name} {person.number}</p>
          )}
        </>
    )
}

export default Persons