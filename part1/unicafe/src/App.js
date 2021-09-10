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

const Entry = ({name,value}) => {
  return(
    <p>{name} {value}</p>
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
      <Headline title="statistics" />
      <Entry name='good' value={good}/>
      <Entry name='neutral' value={neutral}/>
      <Entry name='bad' value={bad}/>
    </div>
  )
}

export default App