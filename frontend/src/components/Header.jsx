import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { logOut, user } = useUser();

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
