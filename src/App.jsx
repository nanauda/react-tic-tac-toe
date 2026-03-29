import { useState, useCallback } from 'react'
import './App.css'

const BOARD_SIZE = 15
const WIN_COUNT = 5

function createBoard() {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
}

function checkWinner(board, row, col, player) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]

  for (const [dr, dc] of directions) {
    let count = 1
    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row + dr * i
      const c = col + dc * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      count++
    }
    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row - dr * i
      const c = col - dc * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      count++
    }
    if (count >= WIN_COUNT) return true
  }
  return false
}

function Cell({ value, onClick, isWinning }) {
  return (
    <td className="cell" onClick={onClick}>
      <div className="intersection">
        {value && (
          <div className={`stone ${value === 'black' ? 'stone-black' : 'stone-white'}${isWinning ? ' stone-winning' : ''}`} />
        )}
      </div>
    </td>
  )
}

function App() {
  const [board, setBoard] = useState(createBoard)
  const [isBlackTurn, setIsBlackTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [winningCells, setWinningCells] = useState([])

  const handleClick = useCallback((row, col) => {
    if (board[row][col] || winner) return

    const player = isBlackTurn ? 'black' : 'white'
    const newBoard = board.map(r => [...r])
    newBoard[row][col] = player

    if (checkWinner(newBoard, row, col, player)) {
      setBoard(newBoard)
      setWinner(player)
      setWinningCells(getWinningCells(newBoard, row, col, player))
    } else {
      setBoard(newBoard)
      setIsBlackTurn(t => !t)
    }
  }, [board, isBlackTurn, winner])

  const handleReset = useCallback(() => {
    setBoard(createBoard())
    setIsBlackTurn(true)
    setWinner(null)
    setWinningCells([])
  }, [])

  const winningSet = new Set(winningCells.map(([r, c]) => `${r},${c}`))

  let statusText
  if (winner) {
    statusText = `${winner === 'black' ? '黒 (●)' : '白 (○)'} の勝ち！`
  } else {
    statusText = `手番: ${isBlackTurn ? '黒 (●)' : '白 (○)'}`
  }

  return (
    <div className="game">
      <h1>五目並べ</h1>
      <div className={`status ${winner ? 'status-winner' : ''}`}>{statusText}</div>
      <div className="board-wrapper">
        <table className="board">
          <tbody>
            {board.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <Cell
                    key={c}
                    value={cell}
                    onClick={() => handleClick(r, c)}
                    isWinning={winningSet.has(`${r},${c}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="reset-btn" onClick={handleReset}>リセット</button>
    </div>
  )
}

function getWinningCells(board, row, col, player) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]

  for (const [dr, dc] of directions) {
    const cells = [[row, col]]
    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row + dr * i
      const c = col + dc * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      cells.push([r, c])
    }
    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row - dr * i
      const c = col - dc * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      cells.push([r, c])
    }
    if (cells.length >= WIN_COUNT) return cells
  }
  return []
}

export default App
