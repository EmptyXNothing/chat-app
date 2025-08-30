import '../styles/Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../contexts/UserProvider.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import ERRORS from '../errors.js';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { logIn } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setError(() => null)
      try {
        const { data } = await axios.post('/api/v1/login', values);
        logIn(data);
        navigate('/');
      } catch (e) {
        if (e.status === 401) setError(() => ERRORS.login);
        else if (e.code === 'ERR_NETWORK') setError(() => ERRORS.network);
        else setError(() => ERRORS.unknown);
      }
    },
  });
  return (
    <div className="form">
      <form onSubmit={formik.handleSubmit}>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="error">{formik.errors.username}</p>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p className="error">{formik.errors.password}</p>
          {error && <div className="validation">{error}</div>}
        </div>
        <div className="btn">
          <button type="submit">Log in</button>
          <span>No account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
