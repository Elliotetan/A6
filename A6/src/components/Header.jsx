import styleH from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';

function Header() {
  const navigate = useNavigate();
  const { firstName, logout } = useStoreContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (firstName !== "") {  // If the user is logged in, show logout button
    return (
      <div className={styleH.top}>
        <div className={styleH.logo}>
          <h2 className={styleH.title}>10//10 Films</h2>
        </div>
        <div className={styleH.menu}>
        </div>
        <div className={styleH.login}>
          <button className={styleH.loginButton} onClick={handleLogout}>Logout</button>
          <button className={styleH.registerButton} onClick={() => navigate('/settings')}>Profile</button> 
        </div>
      </div>
    );
  } else {  // If the user is not logged in, show login/register buttons
    return (
      <div className={styleH.top}>
        <div className={styleH.logo}>
          <h2 className={styleH.title}>10//10 Films</h2>
        </div>
        <div className={styleH.menu}>
          {/* Add any other menu items if needed */}
        </div>
        <div className={styleH.login}>
          <button className={styleH.loginButton} onClick={() => navigate('/login')}>Login</button>
          <button className={styleH.registerButton} onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    );
  }
}

export default Header;
