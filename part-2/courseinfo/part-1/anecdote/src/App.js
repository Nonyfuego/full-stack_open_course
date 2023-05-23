//import './App.css';
import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1> 

const Button = ({text, HandleClick}) => <button onClick={HandleClick}>{text}</button>

const getHighestVote = (anecdotes, anecdotesVotes) => {
  var highestVote = 0
  var highestVoteIndex = null
  for (let i = 0; i < anecdotesVotes.length; i++) {
    if (anecdotesVotes[i] > highestVote) {
      highestVote = anecdotesVotes[i]
      highestVoteIndex = i
    }
  }
  return {
      text: anecdotes[highestVoteIndex],
      votes: highestVote 
    }

  }


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [anecdotesVotes, setAnecdotesVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [selectedAnecdote, setSelectedAnecdote] = useState({
    text: anecdotes[selected],
    votes: anecdotesVotes[selected]
  })
  const [highestVote, setHighestVote] = useState({})

  // app method 
  const chooseRandomly = () => {
    // create a new random number to update the compnents
    let newSelected = Math.floor(Math.random() * anecdotes.length)
    // state setter functions are asynchronous and the result is not instant
    // until the parent function is exited
    setSelected(newSelected)
    let newSelectedAnecdote = {
      text: anecdotes[newSelected],
      votes: anecdotesVotes[newSelected]
    }
    setSelectedAnecdote(newSelectedAnecdote)
  }
  
  //app method
  const vote = () => {
    // always create a copy of complex data structure
    // make new copies of anecdotes
    let anecdotesVotesCopy = [...anecdotesVotes]
    anecdotesVotesCopy[selected] += 1
    setAnecdotesVotes(anecdotesVotesCopy)
    // update the selected anecdote object state to take effect
    // immediately on display
    let newSelectedAnecdote = {
      ...selectedAnecdote,
      votes: anecdotesVotesCopy[selected] 
    }
    setSelectedAnecdote(newSelectedAnecdote)
    const newHighestVote = getHighestVote(anecdotes, anecdotesVotesCopy)
    setHighestVote(newHighestVote)
  }

  return (
    <div className="App">
      <Display text="Anecdote of the day"/>
      <p>{selectedAnecdote.text}</p>
      <p>has {selectedAnecdote.votes} votes</p>
      <Button text="next anecdote" HandleClick={chooseRandomly}/>
      <Button text="vote" HandleClick={vote}/>
      <Display text="Anecdote with most votes"/>
      <p>{highestVote.text || "No votes yet"}</p>
      <p>{highestVote.votes? `has ${highestVote.votes} votes` : ""}</p>
    </div>
  );
}

export default App;
