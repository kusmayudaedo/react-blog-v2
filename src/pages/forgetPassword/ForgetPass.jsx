import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { forgetPassword } from "../../store/slices/auth/slices";
import { forgetPasswordValidation } from "../../store/slices/auth/validation";
import "./forgetPass.css";

function ForgetPass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isResetPasswordLoading } = useSelector((state) => {
    return {
      isResetPasswordLoading: state.auth.isResetPasswordLoading,
    };
  });
  console.log("test");
  return (
    <div className='forget'>
      <div className='forget-container'>
        <h2>Forget Your Password?</h2>
        <span>Enter your email address</span>

        <Formik
          initialValues={{ email: "" }}
          validate={(value) => {
            try {
              forgetPasswordValidation.validateSync(value);
              return {};
            } catch (error) {
              return { message: error.message };
            }
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(forgetPassword(values));
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
            <Form className='forget-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  id='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.message && <span>{errors.message}</span>}
              <button className='forget-button' type='submit'>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgetPass;
