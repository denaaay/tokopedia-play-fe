import '../Styles/Header.css';
import '../Styles/Fonts.css';
import { Link, useNavigate } from 'react-router-dom';

function Header({ sessionToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('sessionToken', '');
        navigate('/');
        window.location.reload();
    };
    
    return (
        <header className='header fonts'>
            <div className='header-logo'>
                <a href='/'>tokopedia-play</a>
            </div>

            {sessionToken !== '' ? (
            <div className='button-header'>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
            ) : (
            <div className='button-header'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            )}
        </header>
    );
}

export default Header;