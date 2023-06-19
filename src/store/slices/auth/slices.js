import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

// @create async thunk
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      // @do authentication with payload : { username, password }
      const { data } = await api.post("/auth/login", payload);
      // @save token to local storage
      localStorage.setItem("token", data?.token);

      Toast.success("Login Success");

      return data?.isAccountExist;
    } catch (error) {
      Toast.error(error?.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const keepLogin = createAsyncThunk(
  "auth/keepLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth"
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth", payload);

      // save token
      localStorage.setItem("token", data?.token);

      Toast.success(
        "Register success. Please check your email to verify your account."
      );

      return data?.data;
    } catch (error) {
      Toast.error(error?.response.data);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch("/auth/verify");
      return;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      Toast.success("Logout Successfully");
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImageProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/profile/single-uploaded", payload);
      Toast.success(`Image uploaded successfully`);

      return data?.imgProfile;
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changePass", payload);
      localStorage.removeItem("token", data?.token);
      Toast.success(`Update Password Successfully, Please Re-Login`);
      return data;
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const changeUsername = createAsyncThunk(
  "auth/changeUsername",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changeUsername", payload);
      Toast.success(`Username Updated to ${payload.newUsername}`);
      window.location.reload();
      return data;
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changeEmail", payload);
      Toast.success(`Email Updated to ${payload.newEmail}`);
      window.location.reload();
      return data;
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const changePhone = createAsyncThunk(
  "auth/changePhone",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changePhone", payload);
      Toast.success(`Phone Updated to ${payload.newPhone}`);
      window.location.reload();
      return data;
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/forgotPass", payload);
      Toast.success(`Please check your email to reset your password`);
      return data;
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/resetPass", payload);
      Toast.success(`Password reset successfully`);
      return
    } catch (error) {
      Toast.error(error.response.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);
