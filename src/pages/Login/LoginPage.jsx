import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "./Api";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          // Generate a unique token
          const token =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          // Store the token in localStorage

          const user = await login(values.username, values.password);
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            window.location.reload();
            navigate("/PosPage");
          } else {
            setFieldError("password", "Invalid username or password");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" name="username" id="username" />
              <span className="error-message">
                <ErrorMessage name="username" />
              </span>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" id="password" />
              <span className="error-message">
                <ErrorMessage name="password" />
              </span>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
