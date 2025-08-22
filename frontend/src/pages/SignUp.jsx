import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

const SignUp = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async ({ username, password}) => {
        try{
          const response = await axios.post('/api/v1/signup', { username: username, password: password })
          console.log(response)
        } catch (e) {
          console.log(e)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" />
          {errors.username && touched.username && <div>{errors.username}</div>}
          <Field name="password" type="password" />
          {errors.password && touched.password && <div>{errors.password}</div>}
          <Field name="confirmPassword" type="password" />
          {errors.confirmPassword && touched.confirmPassword && (
            <div>{errors.confirmPassword}</div>
          )}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUp;
