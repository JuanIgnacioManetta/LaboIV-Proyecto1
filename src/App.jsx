import { useEffect, useState } from 'react'

import './App.css'

import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

import Header from './Components/header/Header.jsx' // Importamos el componente Header
import Board from './Components/Tablero/Board.jsx' // Importamos el componente Board
import Score from './Components/score/Score.jsx' // Importamos el componente Score
import Sound from './Components/sound/Sound.jsx' // Importamos el componente Sound
import Controll from './Components/controll/Controll.jsx'; // Importamos el componente Controll

function App() {
  
  const [darkMode, setDarkMode] = useState(false)
  const [darkModeClass, setDarkModeClass] = useState('')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0)
  const [gameSequence, setGameSequence] = useState([]) // Secuencia de colores del juego
  const [isPlaying, setIsPlaying] = useState(false) // Indica si el juego está en curso
  const [gameOver, setGameOver] = useState(false) // Indica si el juego ha terminado
  const [pause, setPause] = useState(true) // Indica si el juego está en pausa
  const [soundActive, setSoundActive] = useState(false) // Indica si el sonido está activado
  const [difficulty, setDifficulty] = useState(1) // Nivel de dificultad del juego 1: fácil, 2: medio, 3: difícil, 4: experto

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('highScore', score)
    }
  },[score])

  useEffect(() =>{
    if (darkMode) {
      setDarkModeClass('dark')
    } else {
      setDarkModeClass('')
    }
  }, [darkMode])


  return (
    <div className={`game ${darkModeClass}`}>
      <div className='button-dark-mode'>
        <button
          className='dark-mode'
          onClick={() => setDarkMode(!darkMode)}
        >{darkMode ? <Sun/> : <Moon/>}</button>
      </div>
      <Header
        gameTitle='Secuencia Colorida'
        gameDescription='Observa una secuencia de colores y luego repítela en el mismo orden.'
      />
      <div className='main'>
        {
          isPlaying ?
          <Board 
            gameSequence={gameSequence}
            setGameSequence={setGameSequence}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            difficulty={difficulty}
            soundActive={soundActive}
            score={score}
            setScore={setScore}
            setGameOver={setGameOver}
          />
          : !isPlaying && !gameOver ? <span>Click en Iniciar para comenzar</span>
          : !isPlaying && gameOver? <span>Game Over</span> : null
        }
      </div>
      <Score 
        isPlaying={isPlaying}
        score={score}
        highScore={highScore}
      />
      <Sound 
        isPlaying={isPlaying}
        sound={soundActive}
        setSound={setSoundActive}
      />
      <Controll 
        setGameSequence={setGameSequence}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setScore={setScore} 
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        pause={pause}
        setPause={setPause}
      />
    </div>
  )
}

export default App
