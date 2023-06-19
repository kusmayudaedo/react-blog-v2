import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import {
  login,
  keepLogin,
  logout,
  register,
  verifyAccount,
  updateImageProfile,
  changePassword,
  changeUsername,
  changeEmail,
  changePhone,
  forgetPassword,
  resetPassword,
} from "./slices";

// @initial state
const INITIAL_STATE = {
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isLogoutLoading: false,
  isUploadImageLoading: false,
  isKeepLogin: false,
  isVerifyLoading: false,
  isRegisterLoading: false,
  id: null,
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  imgProfile: null,
  isVerified: false,
  role: true,

  //@change Profile
  isChangePasswordLoading: false,
  isChangeUsernameLoading: false,
  isChangeEmailLoading: false,
  isChangePhoneLoading: false,

  isForgetPasswordLoading: false,
  isResetPasswordLoading: false,
};

// @create slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: {
    [register.pending]: (state, action) => {
      state.isRegisterLoading = true;
    },

    [register.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isRegisterLoading: false,
        id: action.payload?.id,
        username: action.payload?.username,
        email: action.payload?.email,
        password: action.payload?.password,
        role: action.payload?.role,
        token: action.payload.token,
      });
    },

    [register.rejected]: (state, action) => {
      state.isRegisterLoading = false;
    },
    [login.pending]: (state, action) => {
      state.isLoginLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoginLoading: false,
        id: action.payload?.id,
        username: action.payload?.username,
        phone: action.payload?.phone,
        imgProfile: action.payload?.imgProfile,
        email: action.payload?.email,
        password: action.payload?.password,
        role: action.payload?.role,
        isVerified: action.payload?.isVerified,
        isKeepLogin: true,
      });
    },
    [login.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },
    [keepLogin.pending]: (state, action) => {
      state.isKeepLoginLoading = true;
    },
    [keepLogin.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isKeepLoginLoading: false,
        isKeepLogin: true,
        id: action.payload?.id,
        username: action.payload?.username,
        phone: action.payload?.phone,
        imgProfile: action.payload?.imgProfile,
        email: action.payload?.email,
        role: action.payload?.role,
        isVerified: action.payload?.isVerified,
      });
    },
    [keepLogin.rejected]: (state, action) => {
      state.isKeepLoginLoading = false;
      state.isKeepLogin = false;
    },

    //@Verify account
    [verifyAccount.pending]: (state, action) => {
      state.isVerifyLoading = true;
    },
    [verifyAccount.fulfilled]: (state, action) => {
      state.isVerifyLoading = false;
      state.isVerified = true;
    },

    //@Logout
    [logout.pending]: (state, action) => {
      state.isLogoutLoading = true;
      state = Object.assign(state, INITIAL_STATE);
    },
    [logout.fulfilled]: (state, action) => {
      state = Object.assign(state, INITIAL_STATE);
    },
    [logout.rejected]: (state, action) => {
      state.isLogoutLoading = false;
    },
    [updateImageProfile.pending]: (state, action) => {
      state.isUploadImageLoading = true;
    },
    [updateImageProfile.fulfilled]: (state, action) => {
      state.isUploadImageLoading = false;
      state.imgProfile = action.payload;
    },
    [updateImageProfile.rejected]: (state, action) => {
      state.isUploadImageLoading = false;
    },

    //Change Password
    [changePassword.pending]: (state, action) => {
      state.isChangePasswordLoading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isChangePasswordLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },
    [changePassword.rejected]: (state, action) => {
      state.isChangePasswordLoading = false;
    },

    //Change Username
    [changeUsername.pending]: (state, action) => {
      state.isChangeUsernameLoading = true;
    },
    [changeUsername.fulfilled]: (state, action) => {
      state.isChangeUsernameLoading = false;
    },
    [changeUsername.rejected]: (state, action) => {
      state.isChangeUsernameLoading = false;
    },

    //Change Email
    [changeEmail.pending]: (state, action) => {
      state.isChangeEmailLoading = true;
    },
    [changeEmail.fulfilled]: (state, action) => {
      state.isChangeEmailLoading = false;
    },
    [changeEmail.rejected]: (state, action) => {
      state.isChangeEmailLoading = false;
    },

    //Change Phone
    [changePhone.pending]: (state, action) => {
      state.isChangePhoneLoading = true;
    },
    [changePhone.fulfilled]: (state, action) => {
      state.isChangePhoneLoading = false;
    },
    [changePhone.rejected]: (state, action) => {
      state.isChangePhoneLoading = false;
    },

    //Forget Password
    [forgetPassword.pending]: (state, action) => {
      state.isForgetPasswordLoading = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.isForgetPasswordLoading = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isForgetPasswordLoading = false;
    },

    //Reset Password
    [resetPassword.pending]: (state, action) => {
      state.isResetPasswordLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isResetPasswordLoading = false;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isResetPasswordLoading = false;
    },
  },
});

// export reducer
export default authSlice.reducer;
