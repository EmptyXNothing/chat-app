import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from '../pages/Login.jsx';
import UserProvider, { UserContext } from '../Contexts/UserProvider.jsx';
import Main from '../pages/Main.jsx';
import { useContext } from 'react';
import Header from '../components/Header.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <div className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />

              <Route path="*" element={<h1>Такой страницы нет!</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
