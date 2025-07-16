import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  const logIn = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
    setUser(() => data)
  }

  const logOut = () => {
    localStorage.removeItem("user")
    setUser(() => null)
  }

  const headers = { Authorization: `Bearer ${user.token}` }

  const value = {
    user,
    logIn,
    logOut,
    headers,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;