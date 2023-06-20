import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
  "blogs/getArticles",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id_cat, page, sort } = payload;
      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`;

      // @request to get articles
      const { data } = await api.get("/blog?" + encodeURI(PARAMETER));

      // @return data
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "blogs/getCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/blog/allCategory");
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMostFavorite = createAsyncThunk(
  "blogs/getMostFavorite",
  async (payload, { rejectWithValue }) => {
    try {
      // @request to get articles
      const { data } = await api.get("/blog/pagFav");

      // @return data
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLikedPost = createAsyncThunk(
  "blogs/getLikedPost",
  async (payload, { rejectWithValue }) => {
    try {
      const { page } = payload;
      // @request to get articles
      const { data } = await api.get(`/blog/pagLike?page=${page}`);
      // @return data
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const geAllPost = createAsyncThunk(
  "blogs/geAllPost",
  async (payload, { rejectWithValue }) => {
    try {
      const { page } = payload;
      // @request to get articles
      const { data } = await api.get(`/blog?page=${page}`);

      // @return data
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentAllBlogPage = createAsyncThunk(
  "blogs/setCurrentAllBlogPage",
  async (payload, { rejectWithValue }) => {
    try {
      return 1;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/blog", payload);
      Toast.success(data.message)
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const { id } = payload;
      const { data } = await api.patch(`/blog/remove/${id}`);
      Toast.success('Stories deleted successfully')
      return data;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeArticle = createAsyncThunk(
  "blogs/likeArticle",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post("/blog/like", payload);
      Toast.success('You liked this stories')
      return;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const setBlogPost = createAsyncThunk(
  "blogs/setBlogPost",
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      Toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
