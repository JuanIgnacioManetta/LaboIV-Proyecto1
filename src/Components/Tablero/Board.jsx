import { useState, useEffect } from 'react';
import './Board_styles.css';

import useSound from 'use-sound'; // Importamos el hook useSound
import BlueButtonSound from '../../assets/sound/BlueButtonSound.mp3'; // Importamos el sonido del botón azul
import GreenButtonSound from '../../assets/sound/GreenButtonSound.mp3'; // Importamos el sonido del botón verde
import RedButtonSound from '../../assets/sound/RedButtonSound.mp3'; // Importamos el sonido del botón rojo
import YellowButtonSound from '../../assets/sound/YellowButtonSound.mp3'; // Importamos el sonido del botón amarillo

import BoardButton from './BoardButton.jsx';

const colors = ['rojo', 'azul', 'amarillo', 'verde'];

function Board({gameSequence, setGameSequence, isPlaying, setIsPlaying, difficulty, soundActive, score, setScore, setGameOver}){
    
    const [userSequence, setUserSequence] = useState([]) // Secuencia de colores del usuario
    const [activeButton, setActiveButton] = useState('')

    const [playBlueButton, {stopBlueButton}] = useSound(BlueButtonSound); // Sonido del botón azul
    const [playGreenButton, {stopGreenButton}] = useSound(GreenButtonSound); // Sonido del botón verde
    const [playRedButton, {stopRedButton}] = useSound(RedButtonSound); // Sonido del botón rojo
    const [playYellowButton, {stopYellowButton}] = useSound(YellowButtonSound); // Sonido del botón amarillo
    
    // Función para reproducir el sonido del botón
    function playSound(color){
        switch(color){
            case 'azul':
                playBlueButton();
                break;
            case 'verde':
                playGreenButton();
                break;
            case 'rojo':
                playRedButton();
                break;
            case 'amarillo':
                playYellowButton();
                break;
            default:
                break;
        }
    }
    
    // Funcion para parar el sonido del boton
    function stopSound(color){
        switch(color){
            case 'azul':
                stopBlueButton();
                break;
            case 'verde':
                stopGreenButton();
                break;
            case 'rojo':
                stopRedButton();
                break;
            case 'amarillo':
                stopYellowButton();
                break;
            default:
                break;
        }
    }



    // UseEffect para empezar el juego
    useEffect(() => {
          if(isPlaying){
            getSequence();
            setUserSequence([]);
          }
    },[isPlaying])

    // Función para generar una secuencia aleatoria
    function getSequence(){
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setGameSequence([...gameSequence, randomColor]);
    }

    // Función para mostra la animacion de la secuencia
    useEffect(() => {
      let i = 0;
        const interval = setInterval(() => {
          setActiveButton('')
          setTimeout(() => {
            setActiveButton(gameSequence[i]); // Cambiar el color activo
            if(soundActive){
              playSound(gameSequence[i]); // Reproducir el sonido del botón
            }
            console.log(gameSequence[i],i)
            i++;
            if (i > gameSequence.length) {
                clearInterval(interval); // Termina la secuencia
            }
          }, 200)
        }, 1000 / difficulty); 
        return () => clearInterval(interval);
    },[gameSequence])

    // Función para manejar la selección del jugador
    const handlePlayerPick = (color) => {
      setUserSequence([...userSequence, color]);
      if(isPlaying && userSequence.length <= gameSequence.length){
          if(color === gameSequence[userSequence.length]){
              console.log('Secuencia correcta');
              if(soundActive){
                playSound(color); // Reproducir el sonido del botón
              }
          }else{
              setIsPlaying(false);
              setGameOver(true);
              console.log('Secuencia incorrecta');
          }
      }
    }
    useEffect(() => {
      if(userSequence.length === gameSequence.length && userSequence.length > 0){
        setScore(score + 1 * difficulty);
        setUserSequence([]);
        getSequence();
      }
    },[userSequence])
    
    return (
        <div className="board">
          {
            colors.map((color) => (
              <BoardButton
                key={color}
                color={color}
                handlePlayerPick={() => handlePlayerPick(color)}
                isActive={activeButton === color} // Verifica si el botón está activo
                difficulty={difficulty}
              />
            ))
          }
        </div>
    );
}
    
export default Board;