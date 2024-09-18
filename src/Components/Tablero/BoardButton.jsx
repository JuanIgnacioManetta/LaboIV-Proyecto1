import React, { useEffect } from 'react';

import './BoardButton_styles.css';

function BoardButton({color ,handlePlayerPick, isActive, difficulty}){

    const [activeClass, setActiveClass] = React.useState('');

    useEffect(() => {
        if (isActive) {
          setActiveClass('active');
          console.log(activeClass)
          setTimeout(() => setActiveClass(''), 600 / difficulty); // Duración de la animación
        }
    }, [isActive]);

    return(
        <section className='board-section'>
            <button className={`board-button ${activeClass} ${color}` } onClick={() => handlePlayerPick(color)}></button>
        </section>
    )
}

export default BoardButton;