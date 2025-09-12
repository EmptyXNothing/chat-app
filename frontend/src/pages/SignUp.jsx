import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { React } from 'react';
import axios from 'axios';
import routes from '../routes';
import notify from '../utils/notify';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import '../styles/Auth.css';

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
  const { logIn } = useUser();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async ({ username, password }) => {
        try {
          const response = await axios.post(routes.signUp(), {
            username: username,
            password: password,
          });
          navigate(routes.mainPage());
          logIn(response.data);
        } catch (e) {
          notify(e.message, 'error');
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2>Sign up</h2>
          <div className="fields">
            <div className="field">
              <label htmlFor="username">Username</label>
              <Field name="username" autoComplete="off" />
              {errors.username && touched.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" autoComplete="off" />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmpPassword">Confirm password</label>
              <Field
                name="confirmPassword"
                type="password"
                autoComplete="off"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <div className="btn">
            <button type="submit">Submit</button>
            <div>
              <span>Have account? </span>
              <Link to={routes.logInPage()}>Log in</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
