import * as Yup from "yup";

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "username must be at least 6 characters.")
    .max(20, "username must be less than 20 characters.")
    .required("username is required."),
  email: Yup.string().email("email must be a valid email."),
  password: Yup.string()
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
    .required("password is required."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match."
  ),
});

// @login validation
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "username must be at least 6 characters.")
    .max(20, "username must be less than 20 characters.")
    .required("username is required."),
  password: Yup.string()
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
    .required("password is required."),
});

export const settingsValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "username must be at least 6 characters.")
    .max(20, "username must be less than 20 characters.")
    .required("username is required."),
  email: Yup.string().email("email must be a valid email."),
  phone: Yup.string()
    .matches(/^\+?\d{10,12}$/, "Invalid phone number")
    .required("Phone number is required"),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric.")
    .required("Current password is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric.")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must be different from current password."
    )
    .required("New password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

export const forgetPasswordValidation = Yup.object({
  email: Yup.string().email("email must be a valid email."),
});

export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric.")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must be different from current password."
    )
    .required("New password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
});
