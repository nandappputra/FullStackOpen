import React, { useState } from 'react'

const Button = ({clickHandler,name}) =>{
  return(
    <button onClick={clickHandler}>{name}</button>
  )
}

const Headline = ({title}) =>{
  return(
    <h1>{title}</h1>
  )
}

const Statistics = ({good,neutral,bad}) =>{
  return(
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive {(good)/(good+neutral+bad)*100} %</p>
    </div>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const fbGood =() => {
    setGood(good+1)
  }

  const fbNeutral =() => {
    setNeutral(neutral+1)
  }

  const fbBad =() => {
    setBad(bad+1)
  }
  
  return (
    <div>
      <Headline title="give feedback" />
      <Button clickHandler={fbGood} name="good"/>
      <Button clickHandler={fbNeutral} name="neutral"/>
      <Button clickHandler={fbBad} name="bad"/>
      <Statistics good={good} neutral={neutral} bad={neutral} />

    </div>
  )
}

export default App