import { useState } from 'react'
import './styles.css'

import circle from '../assets/circle.svg'
import x from '../assets/x.svg'

function Game() {
  const [score, setScore] = useState([0,0])
  const [playit, setPlayit] = useState(1)
  const [game_table, setGame_table] = useState([])

  function game_start() {
    document.querySelector('#game_status').innerHTML('X começa')
  }

  return (
    <div className='container'>
      <div className='scoreboard'>
        <div id='score_x'>
          <img src={x} />
          <h1>{score[0]}</h1>
        </div>
        <h1 id='game_status'></h1>
        <div id='score_o'>
          <img src={circle} />
          <h1>{score[1]}</h1>
        </div>
      </div>
      <div className='game_table' id='game_table'>
        {Array.from({ length: 9 }).map((_, index) => (
          <button key={index}><img src={game_table[index] == 1 ? x : game_table[index] == 2 ? circle : undefined} /></button>
        ))}
      </div>
      <div className='action_board'>
          <button id='game_starter' onClick={game_start()}>START</button>
      </div>
    </div>
  )
}

export default Game