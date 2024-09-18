import './Header_styles.css';

function Header({gameTitle, gameDescription}) {
    return (
        <div className='header'>
            <h1>{gameTitle}</h1>
            <p>{gameDescription}</p>
        </div>
    )
}

export default Header;