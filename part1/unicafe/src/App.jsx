import { useState } from 'react'
import { Statistics } from './Statistics'
import { Button } from './Button'

function App() {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const calculateTotal = () => good + neutral + bad;
  const calculateAverage = () => (good * 1 + neutral * 0 + bad * -1) / calculateTotal();
  const calculatePositive = () => (good / calculateTotal()) * 100
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <h2>statistics</h2>
      {
        calculateTotal() === 0 ? (
          <p>No feedback givern</p>
        ) : (
          <table>
            <tbody>
              <Statistics value={good} text='good' />
              <Statistics value={neutral} text='neutral' />
              <Statistics value={bad} text='bad' />
              <Statistics value={calculateTotal() || 0} text='all' />
              <Statistics value={calculateAverage() || 0} text='average' />
              <Statistics value={calculatePositive() || 0} text='positive' />
            </tbody>
          </table>
        )
      }
    </div>
  )
}
export default App
