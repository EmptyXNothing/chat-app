import '../styles/Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser.jsx';
import routes from '../routes.js';
import { useState } from 'react';

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

const LogIn = () => {
  const [ error, setError] = useState()
  const navigate = useNavigate();
  const { logIn } = useUser();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try{const { data } = await axios.post(routes.logIn(), values);
      logIn(data);
      navigate(routes.mainPage());} catch(e) {
        setError(() => e.message)
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
          <Link to={routes.signUpPage()}>Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
