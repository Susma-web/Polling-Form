import React, { Component } from 'react'
import GithubCorner from 'react-github-corner';
import reactLogo from './assets/react-logo.svg'
import './App.css'

import Poll from 'react-polls'


const pollQuestion1 = 'What programming language do you use during the coding interview?'
const pollAnswers1 = [
  { option: 'Python', votes: 24 },
  { option: 'Javascript', votes: 3 },
  { option: 'Go', votes: 1 }
]
const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true ,
  questionColor: '#303030',
  align: 'center',
  theme: 'purple'
}

export default class App extends Component {
  state = {
    pollAnswers1: [...pollAnswers1]
  }

  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    if (pollNumber === 1) {
      this.setState({
        pollAnswers1: newPollAnswers
      })
   } 
  }

  componentDidMount() {
    const { pollAnswers1 } = this.state
    this.autoAddVotes(pollAnswers1, 1)
  }

  autoAddVotes = (pollAnswers, pollNumber) => {
    setTimeout(() => {
      const choseAnswer = parseInt(Math.random() * 2, 10)
      this.handleVote(pollAnswers[choseAnswer].option, pollAnswers, pollNumber)
      this.autoAddVotes(pollAnswers, pollNumber)
    }, Math.random() * 5000)
  }

  render () {
    const { pollAnswers1 } = this.state

    return (
      <div className='app'>
        <header className='header'>
          <img src={reactLogo} className='logo' alt='React Logo' />
          <h1 className='name'>Vote the coding language</h1>
        </header>
        <main className='main'>
          <div>
            <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
          </div>
        </main>

        <GithubCorner
          href='https://github.com/viniciusmeneses/react-polls'
          bannerColor='#303030'
          size={80}
          direction='right'
        />
      </div>
    )
  }
}
