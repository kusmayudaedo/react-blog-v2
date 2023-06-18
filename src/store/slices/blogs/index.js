import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import {
  getArticles,
  getCategory,
  getMostFavorite,
  getLikedPost,
  geAllPost,
  setCurrentAllBlogPage,
  createBlog,
  likeArticle,
  setBlogPost,
  deleteBlog,
} from "./slices";

const INITIAL_STATE = {
  //@Get srticle by category
  articles: [],
  totalBlogPage: "",
  totalLikePage: "",
  currentBlogPage: 1,
  isLoadingArticles: false,

  //@Category
  allCategory: [],
  categoryId: 1,
  categoryName: "",
  isLoadingCategory: false,

  //@get all articles
  allArticle: [],
  currentAllBlogPage: 1,
  totalAllArticlesPage: "",
  isLoadingAllArticles: false,

  //@Favorite articels
  mostFavorite: [],
  currentFavPage: 1,
  totalFavPage: "",
  isLoadingMostFavorite: false,

  //@Liked articles
  likedArticles: [],
  currentLikedPage: 1,
  totalLikedPage: "",
  isloadingLikedArticle: false,

  //Cretae Blog//
  loadingCreateBlog: false,
  blogContent: null,

  //@SetBlogPost
  blogPost: null,

  //@DeleteBlog
  loadingDeleteBlog: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Get Articles by category
    [getArticles.pending]: (state, action) => {
      state.isLoadingArticles = true;
    },
    [getArticles.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoadingArticles: false,
        articles: action.payload?.result,
        totalBlogPage: action.payload?.page,
        currentBlogPage: action.payload?.blogPage,
      });
    },
    [getArticles.rejected]: (state, action) => {
      state.isLoadingArticles = false;
    },

    //@Get the category
    [getCategory.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoadingCategory: false,
        allCategory: action.payload,
        categoryId: action.payload?.id,
        categoryName: action.payload?.name,
      });
    },
    [getCategory.pending]: (state, action) => {
      state.isLoadingCategory = true;
    },

    //@Get the most favorite Post
    [getMostFavorite.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoadingMostFavorite: false,
        mostFavorite: action.payload?.result,
        currentFavPage: action.payload?.blogPage,
        totalFavPage: action.payload?.page,
      });
    },
    [getMostFavorite.pending]: (state, action) => {
      state.isLoadingMostFavorite = true;
    },

    //@get the post user like
    [getLikedPost.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isloadingLikedArticle: false,
        likedArticles: action.payload?.result,
        currentLikedPage: action.payload?.blogPage,
        totalLikedPage: action.payload?.page,
      });
    },
    [getLikedPost.pending]: (state, action) => {
      state.isloadingLikedArticle = true;
    },

    //@Get all the posts form home page
    [geAllPost.pending]: (state, action) => {
      state.isLoadingAllArticles = true;
    },
    [geAllPost.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoadingAllArticles: false,
        allArticle: action.payload?.result,
        totalAllArticlesPage: action.payload?.page,
        currentAllBlogPage: action.payload?.blogPage,
      });
    },
    [geAllPost.rejected]: (state, action) => {
      state.isLoadingAllArticles = false;
    },
    [setCurrentAllBlogPage.fulfilled]: (state, action) => {
      state.currentAllBlogPage = action.payload;
    },

    //@Cretae Blog
    [createBlog.pending]: (state, action) => {
      state.loadingCreateBlog = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        loadingCreateBlog: false,
        // blogContent : action.payload,
      });
    },
    [createBlog.rejected]: (state, action) => {
      state.loadingCreateBlog = false;
    },

    //@Blogpost
    [setBlogPost.fulfilled]: (state, action) => {
      state.blogPost = action.payload;
    },

    //@delete
    [deleteBlog.pending]: (state, action) => {
      state.loadingDeleteBlog = true;
    },

    [deleteBlog.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        loadingDeleteBlog: false,
        // blogContent : action.payload,
      });
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loadingDeleteBlog = false;
    },
  },
});

export default blogsSlice.reducer;
