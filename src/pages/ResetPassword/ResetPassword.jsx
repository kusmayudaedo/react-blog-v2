import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { resetPassword } from "../../store/slices/auth/slices";
import { resetPasswordValidation } from "../../store/slices/auth/validation";
import "./resetPassword.css";
import { useEffect } from "react";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { id, isResetPasswordLoading } = useSelector((state) => {
    return {
      isResetPasswordLoading: state.auth.isResetPasswordLoading,
    };
  });
  useEffect(() => {
    const verifyAccountToken = location.pathname.split("/")[2];
    localStorage.setItem("token", verifyAccountToken);
  });

  return (
    <div className='reset'>
      <div className='reset-container'>
        <h2>Reset Your Password</h2>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validate={(value) => {
            try {
              resetPasswordValidation.validateSync(value);
              return {};
            } catch (error) {
              return { message: error.message };
            }
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(resetPassword(values));
            setSubmitting(false);
            navigate("/login");
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
            <Form className='reset-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='password'> Password </label>
                <input
                  type='password'
                  id='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='confirmPassword'> Confirm Password </label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <button className='reset-button' type='submit'>
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
