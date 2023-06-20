import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { login } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, loading } = useSelector((state) => {
    return {
      id: state.auth.id,
      loading: state.auth.isLoading,
    };
  });

  if (id) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h2>Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(value) => {
            try {
              loginValidationSchema.validateSync(value);
              return {};
            } catch (error) {
              return { message: error.message };
            }
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(login(values));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className='login-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.message && <span>{errors.message}</span>}
              <span>
                Don't have any account?{" "}
                <span className='link' onClick={() => navigate("/register")}>
                  Register
                </span>
              </span>
              <button
                className='login-button'
                type='submit'
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span className='loading loading-spinner'>loading</span>
                ) : null}
                Login
              </button>
              <span
                onClick={() => navigate("/forget-password")}
                className='link forget-password'
              >
                Forget password?
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
