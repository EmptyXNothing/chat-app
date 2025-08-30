import { useState } from 'react';
import { UserContext } from '../hooks/useUser.jsx';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const headers = user ? { Authorization: `Bearer ${user.token}` } : null;

  const value = { user, logIn, logOut, headers };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
