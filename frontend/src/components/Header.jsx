import '../styles/App.css';
import { UserContext } from '../Contexts/UserProvider.jsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(UserContext);

  return (
    <div className="header">
      <h3>Chat app</h3>
      { user ? <button
        onClick={() => {
          logOut();
          navigate('/login');
        }}
      >
        Log out
      </button> : null}
    </div>
  );
};

export default Header;
