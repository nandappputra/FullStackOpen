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

const StatisticLine = ({text,value}) =>{
  if(text==="positive"){
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>%</td>
      </tr>
    )
  }

  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good,neutral,bad}) =>{
  if(good===0 && neutral===0 && bad===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good+neutral+bad}/>
          <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)}/>
          <StatisticLine text="positive" value={(good)/(good+neutral+bad)*100}/>
        </tbody>
      </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App