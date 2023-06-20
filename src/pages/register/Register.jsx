import Loading from "../../components/loading/Loading";
import { Formik, Form } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../store/slices/auth/validation";
import { register } from "../../store/slices/auth/slices";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isRegisterLoading } = useSelector((state) => {
    return {
      isRegisterLoading: state.auth.isRegisterLoading,
    };
  });
  return (
    <div className='register'>
      <div className='register-container'>
        <h2>Register</h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(value) => {
            try {
              registerValidationSchema.validateSync(value);
              return {};
            } catch (error) {
              return { message: error.message };
            }
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(register(values));
            setSubmitting(false);
            if (!isRegisterLoading) return navigate('/login');
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
            <Form className='register-form' onSubmit={handleSubmit}>
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
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  id='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Phone</label>
                <input
                  type='text'
                  id='phone'
                  value={values.phone}
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

              <div className='form-group'>
                <label htmlFor='password'>Conmfirm Password</label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errors.message && <span>{errors.message}</span>}
              <span>
                Have any account?{" "}
                <span className='link' onClick={() => navigate("/login")}>
                  Login
                </span>
              </span>
              <button className='register-button' type='submit'>
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
