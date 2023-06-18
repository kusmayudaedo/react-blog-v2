import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import blogsReducer from "./slices/blogs";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
  },
});

export default store;
