import axios from 'axios'

let baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () =>{
    let req = axios.get(baseUrl)
    return req.then((resp) => resp.data)
  }

  const addContact = (contact) =>{
    let req = axios.post(baseUrl,contact)
    return req.then((resp) => resp.data)
  }

  let contactService = {getAllContacts, addContact}

  export default contactService