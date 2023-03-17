import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'


export default function App() {

  const getNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const getNewDice = () => {
    const diceRandomNumbers = []
    for (let i = 0; i < 10; i++) {
      diceRandomNumbers.push(getNewDie())
    }
    return diceRandomNumbers
  }

  const [dice, setDice] = React.useState(getNewDice())
  const [tenzies, setTenzies] = React.useState(false)


  const diceElements = dice.map(die => <Die key={die.id} holdDie={() => holdDie(die.id)} number={die.value} isHeld={die.isHeld} />)

  // React.useEffect(() => {

  // }, [])

  const roll = () => {

    if (tenzies === false) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld ? die : getNewDie()
        })
      })
    } else {
      setDice(getNewDice())
      setTenzies(prevTenzies => !prevTenzies)
    }

  }

  const holdDie = (id) => {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  const checkTenzies = () => {
    return dice.every(die => die.isHeld)
  }

  React.useEffect(() => {
    if (checkTenzies()) {
      setTenzies(prevTenzies => !prevTenzies)
    }
  }, [dice])

  return (
    <React.Fragment>
      <header className='header'>
        <h1>Tenzies</h1>
      </header>
      <main className='main'>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </React.Fragment>
  )
}