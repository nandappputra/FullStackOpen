import React from "react";
import Weather from './Weather.js'

const Result = ({countries,searchQuery,showDetails}) =>{
    let results = countries.filter( (country) => (country.name.toLowerCase().includes(searchQuery.toLowerCase())))
    if (results.length>10){
        return(
            <div>Too many matches, specify another filter</div>
        )
    }
    else if (results.length>1 && results.length<=10){
        return(
            <div>
                {results.map((country)=>{ return(
                    <div key={country.name}>
                        {country.name}
                        <button countryname={country.name} onClick={showDetails}>Show</button>
                    </div>
                )})}
            </div>
        )
    }

    else if (results.length===1){
        return(
            <div>
                <h1>{results[0].name}</h1>
                <p>Capital {results[0].capital}</p>
                <p>Population {results[0].population}</p>
                <h3>Languages</h3>
                <ul>
                {results[0].languages.map((lang)=>(
                    <li>{lang.name}</li>
                ))}
                </ul>
                <img src={results[0].flag} alt={`${results[0].name}'s flag'`} width={100}/>
                
                <Weather city={results[0].capital} />

            </div>
        )
    }

    else{
        return(
            <div></div>
        )
    }

}

export default Result