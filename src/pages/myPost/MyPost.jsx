import "./myPost.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  geAllPost,
  getLikedPost,
  setCurrentAllBlogPage,
} from "../../store/slices/blogs/slices";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import RenderPost from "../../components/post/Post";
import RenderLikedPost from "../../components/post/likedPost";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";

function MyPost() {
  const dispatch = useDispatch();
  const [storiesToggle, setStoriesToggle] = useState(0);

  const {
    user,
    loading,
    currentAllBlogPage,
    totalAllArticlesPage,
    allArticle,
  } = useSelector((state) => {
    return {
      user: state.auth.id,
      loading: state.blogs.isLoadingArticles,
      allArticle: state.blogs.allArticle,
      currentAllBlogPage: state.blogs.currentAllBlogPage,
      totalAllArticlesPage: state.blogs.totalAllArticlesPage,
    };
  });

  const {
    loadngLikedArticles,
    likedArticles,
    currentLikedPage,
    totalLikedPage,
  } = useSelector((state) => {
    return {
      loadngLikedArticles: state.blogs.loadngLikedArticles,
      likedArticles: state.blogs.likedArticles,
      currentLikedPage: state.blogs.currentLikedPage,
      totalLikedPage: state.blogs.totalLikedPage,
    };
  });

  useEffect(() => {
    dispatch(geAllPost({ page: currentAllBlogPage }));
  }, [currentAllBlogPage, allArticle]);

  useEffect(() => {
    dispatch(getLikedPost());
  }, [currentLikedPage, likedArticles]);

  const myPost = allArticle.filter((item) => item.UserId === user);

  const onClickStoriesTogle = (index) => {
    setStoriesToggle(index);
    dispatch(setCurrentAllBlogPage(1));
  };
  const onChangePagination = (type) => {
    dispatch(
      geAllPost({
        page: type === "prev" ? currentAllBlogPage - 1 : currentAllBlogPage + 1,
      })
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <Topbar />
      <Header />
      <div className='stories'>
        <div className='stories-container'>
          <div className='stories-title'>
            <nav className='stories-nav'>
              <button
                className={
                  storiesToggle === 0
                    ? "stories-button-active"
                    : "stories-button"
                }
                onClick={() => onClickStoriesTogle(0)}
              >
                My Stories
              </button>
              <button
                className={
                  storiesToggle === 1
                    ? "stories-button-active"
                    : "stories-button"
                }
                onClick={() => onClickStoriesTogle(1)}
              >
                Liked Stories
              </button>
            </nav>
          </div>
          <div className='stories-post'>
            {storiesToggle === 0 ? (
              myPost.length !== 0 ? (
                <RenderPost
                  articles={myPost}
                  currentPage={currentAllBlogPage}
                />
              ) : (
                <p>Let's make other stories</p>
              )
            ) : (
              <RenderLikedPost
                articles={likedArticles}
                currentPage={currentLikedPage}
              />
            )}
          </div>
        </div>
        <div className='stories-sidebar'>
          <Sidebar />
        </div>
      </div>
      {storiesToggle === 0 ? (
        <Pagination
          onChangePagination={onChangePagination}
          disabledPrev={currentAllBlogPage === 1}
          disabledNext={currentAllBlogPage >= totalAllArticlesPage}
        />
      ) : (
        <Pagination
          onChangePagination={onChangePagination}
          disabledPrev={currentLikedPage === 1}
          disabledNext={currentLikedPage >= totalLikedPage}
        />
      )}
      <Footer />
    </>
  );
}

export default MyPost;
