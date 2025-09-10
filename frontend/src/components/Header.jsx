import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.jsx';
import routes from '../routes.js';
import logoutSrc from '../assets/logout.svg';

const Header = () => {
  const navigate = useNavigate();
  const { logOut, user } = useUser();

  return (
    <div className="header">
      <h3>Chat app</h3>
      { user ? <div className='header-info'>
        <span>{user.username}</span>
        <button
        onClick={() => {
          logOut();
          navigate(routes.logInPage());
        }}
      >
        <img src={logoutSrc} alt="" />
      </button>
      </div> : null}
    </div>
  );
};

export default Header;
