import { useEffect, useState } from 'react';
import './Control_styles.css'

function Controll({setGameSequence, isPlaying, setIsPlaying, gameOver, setGameOver, setScore, difficulty, setDifficulty}){

    const [buttonActive, setButtonActive] = useState();

    // Inicia o reinicia el juego
    const startGame = () => {
        setGameSequence([]);
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
        console.log('Juego iniciado');
    };

    useEffect(() => {
        if(isPlaying){
            setButtonActive(true);
        }else{
            setButtonActive(false);
        }
    },[isPlaying])

    // Función para cambiar la dificultad del juego
    const handleDificulty = (dificultyToChange) => {
        if(dificultyToChange === difficulty) return;
        if(dificultyToChange === 'easy'){
            setDifficulty(1);
        }else if(dificultyToChange === 'medium'){
            setDifficulty(2);
        }
        else if(dificultyToChange === 'hard'){
            setDifficulty(2.5);
        }
        else if(dificultyToChange === 'expert'){
            setDifficulty(3);
        }
        console.log('Dificulty:', dificultyToChange);
    }

    return(
        <div className='controll'>
            <div className='controll-dificulty'>
                <div className='controll-dificulty-buttons'>
                    <button className='dificulty-easy' onClick={() => handleDificulty('easy')} disabled={buttonActive}><span>Facil</span></button>
                    <button className='dificulty-medium' onClick={() => handleDificulty('medium')} disabled={buttonActive}><span>Medio</span></button>
                    <button className='dificulty-hard' onClick={() => handleDificulty('hard')} disabled={buttonActive}><span>Dificil</span></button>
                    <button className='dificulty-expert' onClick={() => handleDificulty('expert')} disabled={buttonActive}><span>Experto</span></button>
                </div>
                <div className='controll-dificulty-span'>
                    <span>Dificultad: {difficulty === 1 ? 'Facil' : difficulty === 2 ? 'Medio' : difficulty === 3 ? 'Dificil' : 'Experto'}</span>
                </div>
            </div>
            <div className='controll-game'>
                {
                    !gameOver ? 
                    <div className='controll-game-start'>
                        <button className='game-start' onClick={startGame} disabled={isPlaying}>Iniciar</button> 
                    </div>
                    : gameOver ?
                    <div className='controll-game-pause'>
                        <button className='game-restart' onClick={startGame}>Reiniciar</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Controll;