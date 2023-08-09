import { useEffect, useState } from 'react'
import './styles.css'

import O from '../assets/circle.svg'
import X from '../assets/x.svg'

function Game() {
  const emptyBoard = Array(9).fill('')

  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState('')
  const [score, setScore] = useState([0, 0])

  const handleCellClick = (index) => {
    if (board[index] !== '') return null
    if (winner) return null
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const checkWinner = () => {
    let l_winner = false
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === 'O')) {
        setWinner('O')
        setScore([score[0], score[1] + 1])
        l_winner = true
      } else if (cells.every(cell => cell === 'X')) {
        setWinner('X')
        setScore([score[0] + 1, score[1]])
        l_winner = true
      } 
    })

    if(!l_winner) {
      let couter = 0
      board.forEach(cell => {
        if(cell !== '') couter ++
      })
      if(couter === 9) {
        setWinner('EMPATE')
      }
    }
  }

  useEffect(checkWinner, [board])

  const resetGame = () => {
    setBoard(emptyBoard)
    setCurrentPlayer('X')
    setWinner('')
  }

  return (
    <div className='container'>
      <div className='scoreboard'>
        <div className={currentPlayer === 'X' && winner === '' ? 'playit' : ''}>
          <img src={X} />
          <h1>{score[0]}</h1>
        </div>
        <div className={currentPlayer === 'O' && winner === '' ? 'playit' : ''}>
          <img src={O} />
          <h1>{score[1]}</h1>
        </div>
      </div>
      <div className={`game_table ${winner !== '' ? 'desable' : ''}`}>
        {board.map((item, index) => (
          <div className={`cell ${item}`} key={index} onClick={() => handleCellClick(index)}><img src={item === 'X' ? X : item === 'O' ? O : ''} /></div>
        ))}
      </div>
      {winner &&
        <div className='action_board'>
          <button onClick={() => resetGame()}>Recomeçar jogo!</button>
        </div>
      }
      {winner &&
        <div className='winnerBanner'>
          <h1>{winner === 'EMPATE' ? 'Empate!' : 'Vitória!'}</h1>
          <img src={winner === 'X' ? X : winner === 'O' ? O : ''} />
        </div>
      }

    </div>
  )
}

export default Game