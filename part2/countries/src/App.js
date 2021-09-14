import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter.js';
import Result from './components/Result.js'

const  App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, updateCountries] = useState([])

  const updateSearchQuery = (event) =>{
    setSearchQuery(event.target.value)
  }

  const getCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then( (resp) => updateCountries(resp.data) )
  }

  useEffect(getCountries, [])
  

  return (
    <div>
      <Filter value={searchQuery} onChange={updateSearchQuery} />
      <Result countries={countries} searchQuery={searchQuery} />
    </div>
  );
}

export default App;