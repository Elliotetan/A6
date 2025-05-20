import styleH from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import SearchBar from './SearchBar';

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
          <div><SearchBar /></div>

        </div>
        <div className={styleH.login}>
          <button className={styleH.logoutButton} onClick={handleLogout}>Logout</button>
          <button className={styleH.settingsButton} onClick={() => navigate('/settings')}>Settings</button>
          <button className={styleH.cartButton} onClick={() => navigate('/cart')}>Cart</button>
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
          {/* <div><SearchBar /></div> */}
          {/* Add stuff? */}
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
