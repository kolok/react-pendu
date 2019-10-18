import React, {Component} from 'react';
import Letter from './Letter'
import PropTypes from 'prop-types'

import './App.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SENTENCES = [
  'PIERRE QUI ROULE',
  'CECI EST UN TEST',
  'DANS LE PORT D\'AMSTERDAM',
  'CECILE MA FILLE',
  'MICHEAL JACKSON',
  'NICOLAS LE JARDINIER',
]
const MAX_ERROR_AUTHORIZED = 10

class App extends Component {
  // State initilization
  state = {
    letters: LETTERS.split(''),
    sentence: '',
    usedLetters: [],
    clickCount: 0,
    gameStatus: "playing",
  }

  // State propTypes
  static propTypes = {
    letters: PropTypes.array,
    sentence: PropTypes.string,
    usedLetters: PropTypes.array,
    clickCount: PropTypes.number,
    gameStatus: PropTypes.string,
  }

  // Set a sentence before mount the App component
  componentWillMount() {
    this.chooseASentence()
  }

  /* 
   * Reset the state with default values
   * 
   * Note: Arrow fx for binding
   */
  reset = () => {
    this.setState({
      gameStatus: "playing",
      usedLetters: [], 
      clickCount: 0, 
      sentence: SENTENCES[Math.floor(Math.random()*SENTENCES.length)]
    })
  }

  /* 
   * Pick a sentence from the SENTENCES list and set it to the state
   * 
   * Note: Arrow fx for binding
   */
  chooseASentence = () => {
    var s = SENTENCES[Math.floor(Math.random()*SENTENCES.length)]
    this.setState({
      sentence: s,
    })
  }

  // Compute the resolved sentence with discovered letters
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
      )
  }

  /* 
   * Handle the click on a letter
   * 
   * Note: Arrow fx for binding
   */
  handleLetterClick = letter => {
    const {sentence, usedLetters, clickCount} = this.state
    // Letter is already clicked : nothing to do
    if (usedLetters.includes(letter)) {
      return
    }
    // Count one more click if the letter is not part of the sentence to find
    var newClickCount = clickCount
    if (!sentence.includes(letter)) {
      newClickCount += 1
    }
    // Game Over if the payer reach the max number of try allowed to find the sentence
    if (newClickCount >= MAX_ERROR_AUTHORIZED) {
      this.setState({ gameStatus: "gameover" })
    }
    // Check if the player won : no more '_' in the sentence 
    if (!this.computeDisplay(sentence, [...usedLetters, letter]).includes('_')) {
      this.setState({ gameStatus: "won" })
    }
    //
    this.setState({ usedLetters: [...usedLetters, letter], clickCount: newClickCount})
  }

  // Arrow fx for binding
  getLetterStatus(letter, usedLetters) {
    return usedLetters.includes(letter) ? 'inactive' : 'active'
  }
    
  render() {
    const {letters, sentence, usedLetters, clickCount, gameStatus} = this.state
    return (
      <div className="Content">
        {/* conditional display the 'gameover' layer */} 
        { gameStatus === "gameover" && 
          <div className="Content__Layer Content__GameOver">
            <h1>Game Over !!!</h1>
            <button className="Content__Link" onClick={this.reset}>Please click here to start a new game</button>
          </div>
        }
        {/* conditional display the 'won' layer */} 
        { gameStatus === "won" && 
          <div className="Content__Layer Content__Winner">
            <h1>YOU WIN !!!</h1>
            <button className="Content__Link" onClick={this.reset}>Please click here to start a new game</button>
          </div>
        }
        {/* reset button */}
        <button className="Content__Button" onClick={this.reset}> Reset </button>
        {/* resolved sentence */}
        <div className="Content__Sentence">{this.computeDisplay(sentence, usedLetters)}</div>
        {/* keyboard */}
        <ul>
          {
            letters.map((letter) => (
              <Letter key={letter} status={this.getLetterStatus(letter, usedLetters)} letter={letter} onClick={this.handleLetterClick}/>
            ))
          }
        </ul>
        {/* Error counter */}
        <div className="Content__Counter">Nunber of error: <b>{clickCount}</b> / Number of authorized try: <b>{MAX_ERROR_AUTHORIZED}</b></div>
      </div>
    )
  }
}
export default App;
