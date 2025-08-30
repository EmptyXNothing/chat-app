import '../styles/Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.jsx';

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
  const { logIn } = useUser();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { data } = await axios.post('/api/v1/login', values);
      logIn(data);
      navigate('/');
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
        </div>
        <div className="btn">
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
