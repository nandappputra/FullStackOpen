import React,{useState,useEffect} from "react";
import axios from "axios";

const Weather = ({city}) =>{
    const apiKey = process.env.REACT_APP_API_KEY
    const[currentWeather,updateCurrentWeather]=useState({current:{
        temperature:'',
        weather_icons:[''],
        weather_descriptions:[''],
        wind_speed:'',
        wind_dir:''
    }})

    const obtainWeather = () =>{

        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&unit=m`)
        .then((resp)=>{
            updateCurrentWeather(resp.data)})
    }

    useEffect(obtainWeather,[])

    return(
        <div>
            <h3>{`Weather in ${city}`}</h3>
            <p>temperature {currentWeather.current.temperature}</p>
            <img src={currentWeather.current.weather_icons[0]} alt={currentWeather.current.weather_descriptions[0]} />
            <p>wind {currentWeather.current.wind_speed} kmph direction {currentWeather.current.wind_dir}</p>
        </div>
    )
}

export default Weather