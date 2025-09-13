import "../styles/Auth.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser.jsx";
import routes from "../routes.js";
import notify from "../utils/notify.js";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Too Short!")
    .max(35, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(35, "Too Long!")
    .required("Required"),
});

const LogIn = () => {
  const navigate = useNavigate();
  const { logIn } = useUser();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        try {
          const { data } = await axios.post(routes.logIn(), values);
          logIn(data);
          navigate(routes.mainPage());
        } catch (e) {
          notify(e.message, 'error');
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2>Log in</h2>
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
              <Field name="password" autoComplete="off" />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="btn">
            <button type="submit">Log in</button>
            <div>
              <span>No account? </span>
              <Link to={routes.signUpPage()}>Sign up</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogIn;
