import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from '../pages/Login.jsx';
import UserProvider from '../contexts/UserProvider.jsx';
import Main from '../pages/Main.jsx';

import Header from '../components/Header.jsx';
import SignUp from '../pages/SignUp.jsx';
import { useUser } from '../hooks/useUser.jsx';

const MainPrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

const AuthenticationPrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? <Navigate to="/" /> : children;
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
                  <MainPrivateRoute>
                    <Main />
                  </MainPrivateRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthenticationPrivateRoute>
                    <SignUp />
                  </AuthenticationPrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthenticationPrivateRoute>
                    <Login />
                  </AuthenticationPrivateRoute>
                }
              />

              <Route path="*" element={<h1>Такой страницы нет!</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
