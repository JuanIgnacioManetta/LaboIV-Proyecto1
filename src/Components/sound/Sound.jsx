import { useEffect, useState } from 'react';
import './Sound_styles.css';

import soundOnImg from '../../assets/sound/soundOn.webp';
import soundOffImg from '../../assets/sound/soundOff.webp';

import useSound from 'use-sound'; // Importamos el hook useSound
import buttonSound from '../../assets/sound/SoundButtonClicked.wav'; // Importamos el sonido del botón azul

function Sound({isPlaying, sound, setSound}){

    const [playButtonPress] = useSound(buttonSound);

    const [style, setStyle] = useState("flex-end");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if(isPlaying){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    },[isPlaying])

    const toggleSound = () => {
        if(sound){
            playButtonPress();
            setSound(false);
            setStyle("flex-end");
        }else{
            playButtonPress();
            setSound(true);
            setStyle("flex-start");
        }
    }
    return(
        <div className='sound'>
            <span>Mute: </span>
            <button className='sound-button' onClick={toggleSound} disabled={isDisabled}>
                <div className='sound-button-bar' style={{justifyContent: `${style}`}}>
                    <div className='sound-button-bar-fill' ><p>{style === 'flex-start' ? 'On' : 'Off'}</p></div>
                </div>
            </button>
            <img className='sound-icon' src={style === 'flex-start' ? soundOnImg : soundOffImg} alt={style === 'flex-start' ? 'Sonido Activo' : 'Sonido Mute'}/>
        </div>
    )
}

export default Sound;