import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import PPImage from "../../asset/no-profile-picture.png";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  settingsValidationSchema,
  changePasswordSchema,
} from "../../store/slices/auth/validation";
import { updateImageProfile } from "../../store/slices/auth/slices";
import {
  changePassword,
  changeUsername,
  changeEmail,
  changePhone,
} from "../../store/slices/auth/slices";
import { Navigate } from "react-router-dom";
import Toast from "react-hot-toast";

function Settings() {
  const {
    isChangePasswordLoading,
    isChangeUsernameLoading,
    isChangeEmailLoading,
    isChangePhoneLoading,
    userId,
    username,
    email,
    phone,
    imgProfile,
  } = useSelector((state) => {
    return {
      isChangePasswordLoading: state.auth.isChangePasswordLoading,
      isChangeUsernameLoading: state.auth.isChangeUsernameLoading,
      isChangeEmailLoading: state.auth.isChangeEmailLoading,
      isChangePhoneLoading: state.auth.isChangePhoneLoading,
      userId: state.auth.id,
      username: state.auth.username,
      email: state.auth.email,
      phone: state.auth.phone,
      imgProfile: state.auth.imgProfile,
    };
  });

  const initialUsername = username;
  const initialEmail = email;
  const initialPhone = phone;

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if a file was selected
    if (selectedImage) {
      const { type, size } = selectedImage;
      const allowedExtensions = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // Check if the file extension and size are valid
      if (allowedExtensions.includes(type) && size <= maxSize) {
        setImage(selectedImage);
      } else {
        // Invalid file, reset the input and display an error message
        setImage(null);
        e.target.value = null;
        alert(
          "Please upload a valid image file (JPEG/PNG) within 5MB size limit."
        );
      }
    }
  };

  useEffect(() => {
    if (isImageUploaded) {
      const formData = new FormData();
      formData.append("file", image);
      dispatch(updateImageProfile(formData))
        .then(() => {
          setImage(null);
          setIsImageUploaded(false);
          window.location.reload();
        })
        .catch((error) => {
          alert("Upload image failed");
        });
    }
  }, [isImageUploaded, image]);

  const handleUploadImage = (e) => {
    e.preventDefault();
    setIsImageUploaded(true);
  };

  const cancelUpload = () => {
    setImage(null);
  };

  return (
    <>
      <Topbar />
      <div className='settings'>
        <div className='settings-container'>
          <div className='settings-title'>
            <span className='settings-update-title'> Your Account </span>
          </div>
          <form className='settings-form' onSubmit={handleUploadImage}>
            <label htmlFor='profile-picture'> Profile Picture</label>
            <div className='settings-profile-picture'>
              {image ? (
                <img className='settings-img' src={image} alt='Selected' />
              ) : (
                <img
                  className='settings-img'
                  src={
                    imgProfile
                      ? process.env.REACT_APP_IMAGE_URL + imgProfile
                      : PPImage
                  }
                  alt=''
                />
              )}
              <label htmlFor='image'>
                <i className='bx bxs-edit settings-pofile-picture-icon'></i>
              </label>
              <input
                type='file'
                id='image'
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              {image && (
                <>
                  <button type='submit' className='setting-img-button'>
                    Upload
                  </button>
                  <button className='setting-img-button' onClick={cancelUpload}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>

          <Formik
            initialValues={{
              username: initialUsername,
              email: initialEmail,
              phone: initialPhone,
            }}
            validate={(value) => {
              try {
                settingsValidationSchema.validateSync(value);
                return {};
              } catch (error) {
                return { message: error.message };
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.username !== initialUsername)
                dispatch(
                  changeUsername({
                    currentUsername: initialUsername,
                    newUsername: values.username,
                  })
                );
              if (values.email !== initialEmail)
                dispatch(
                  changeEmail({
                    currentEmail: initialEmail,
                    newEmail: values.email,
                  })
                );
              if (values.phone !== initialPhone)
                dispatch(
                  changePhone({
                    currentPhone: initialPhone,
                    newPhone: values.phone,
                  })
                );
              if (
                values.username === initialUsername &&
                values.email === initialEmail &&
                values.phone === initialPhone
              )
                Toast.error("No change needed");
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
              <Form className='settings-form' onSubmit={handleSubmit}>
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
                  <label htmlFor='username'>Phone</label>
                  <input
                    type='phone'
                    id='phone'
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {errors.message && <span>{errors.message}</span>}
                <button
                  className='settings-button'
                  type='submit'
                  disabled={
                    isSubmitting ||
                    isChangeUsernameLoading ||
                    isChangeEmailLoading ||
                    isChangePhoneLoading
                  }
                >
                  Update Profile
                </button>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{
              currentPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(value) => {
              try {
                changePasswordSchema.validateSync(value);
                return {};
              } catch (error) {
                return { message: error.message };
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(changePassword(values));
              setSubmitting(false);
              if (!userId) return <Navigate to='/login' replace />;
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
              <Form className='settings-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='password'>Current Password</label>
                  <input
                    type='password'
                    id='currentPassword'
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>New Password</label>
                  <input
                    type='password'
                    id='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>Confirm Password</label>
                  <input
                    type='password'
                    id='confirmPassword'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {errors.message && <span>{errors.message}</span>}
                <button
                  className='settings-button'
                  type='submit'
                  disabled={isSubmitting || isChangePasswordLoading}
                >
                  Update Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default Settings;
