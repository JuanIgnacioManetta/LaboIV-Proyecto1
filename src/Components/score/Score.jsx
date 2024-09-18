import './Score_styles.css';

function Score({score, highScore}){

    const percentage = `${(score / highScore) * 100}%`;
    
    return(
        <div className='score'>
            <div className='scores'>
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
           <div className='score-bar-background'>
            <div className='score-bar-fill' style={{width: `${percentage}`}}></div>
           </div>
        </div>
    )
}

export default Score;