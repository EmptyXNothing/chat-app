import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LogIn from '../pages/LogIn.jsx';
import UserProvider from '../contexts/UserProvider.jsx';
import Main from '../pages/Main.jsx';
import Header from '../components/Header.jsx';
import SignUp from '../pages/SignUp.jsx';
import { useUser } from '../hooks/useUser.jsx';
import routes from '../routes.js';

const MainPrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to={routes.logInPage()} />;
};

const AuthenticationPrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? <Navigate to={routes.mainPage()} /> : children;
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
                path={routes.mainPage()}
                element={
                  <MainPrivateRoute>
                    <Main />
                  </MainPrivateRoute>
                }
              />
              <Route
                path={routes.signUpPage()}
                element={
                  <AuthenticationPrivateRoute>
                    <SignUp />
                  </AuthenticationPrivateRoute>
                }
              />
              <Route
                path={routes.logInPage()}
                element={
                  <AuthenticationPrivateRoute>
                    <LogIn />
                  </AuthenticationPrivateRoute>
                }
              />

              <Route path={routes.notFound()} element={<h1>Такой страницы нет!</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
