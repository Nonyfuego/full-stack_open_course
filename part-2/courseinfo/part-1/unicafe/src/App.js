import { useState } from 'react'
import './App.css'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, HandleClick}) => <button className='buttons' onClick={HandleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  const total = stats.good + stats.bad + stats.neutral
  let average = (stats.good - stats.bad) / total
  let percentage = (stats.good / total) * 100

  percentage = percentage.toFixed(1)
  average = average.toFixed(1)

  if (!total) {
    return (
      <p>No feedback given</p>
    )
  }else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good}/>
          <StatisticLine text="neutral" value={stats.neutral}/>
          <StatisticLine text="bad" value={stats.bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={percentage + ' %'}/>
        </tbody>
      </table>
    )
  }

}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const incrementGood = () => setGood(good + 1)
  const incrementBad = () => setBad(bad + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="good" HandleClick={incrementGood}/>
      <Button text="neutral" HandleClick={incrementNeutral}/>
      <Button text="bad" HandleClick={incrementBad}/>
      <Header text="Statistics" />
      <Statistics stats={stats}/>
    </div>
  );
}

export default App;
