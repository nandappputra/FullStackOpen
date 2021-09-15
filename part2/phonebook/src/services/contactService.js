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

  const deleteContact = (id) =>{
    let req = axios.delete(baseUrl+`/${id}`)
    return req.then((resp) => resp.data)
  }

  const replaceContact = (id,contact) =>{
    let req = axios.put(baseUrl+`/${id}`,contact)
    return req.then((resp) => resp.data)
  }

  let contactService = {getAllContacts, addContact, deleteContact, replaceContact}

  export default contactService