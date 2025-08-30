import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useContext, React } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ERRORS from '../errors';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,30}$/g,
      'Пароль слишком лёгкий'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useContext(UserContext);
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({ username, password }) => {
          try {
            const response = await axios.post('/api/v1/signup', {
              username: username,
              password: password,
            });
            logIn(response.data);
            navigate('/');
          } catch (e) {
            if (e.status === 409) setError(() => ERRORS.registration);
            else if (e.code === 'ERR_NETWORK') setError(() => ERRORS.network);
            else setError(() => ERRORS.unknown);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="username" />
            {errors.username && touched.username && (
              <div className="validation">{errors.username}</div>
            )}
            <Field name="password" type="password" />
            {errors.password && touched.password && (
              <div className="validation">{errors.password}</div>
            )}
            <Field name="confirmPassword" type="password" />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="validation">{errors.confirmPassword}</div>
            )}
            <button type="submit">Submit</button>
            {error && <div className="validation">{error}</div>}
          </Form>
        )}
      </Formik>
      <span>Have account? </span>
      <Link to="/login">Log In</Link>
    </div>
  );
};
export default SignUp;
