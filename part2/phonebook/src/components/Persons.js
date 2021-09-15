import React from "react";

const Persons = ({persons,searchQuery,deleteHandler}) => {
    return(
        <>
        {persons.filter( (person)=> person.name.toLowerCase().includes(searchQuery)).map( (person) =>
            <div key={person.name} >{person.name} {person.number}
                <button onClick={deleteHandler} contactid={person.id} contactname={person.name}>delete</button>
            </div>
          )}
        </>
    )
}

export default Persons