import "./myPost.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  geAllPost,
  getLikedPost,
  setCurrentAllBlogPage,
} from "../../store/slices/blogs/slices";
import RenderPost from "../../components/post/Post";
import RenderLikedPost from "../../components/post/likedPost";
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
  }, [currentAllBlogPage]);

  useEffect(() => {
    dispatch(getLikedPost({ page: currentLikedPage }));
  }, [currentLikedPage]);

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

  const onChangePaginationLike = (type) => {
    dispatch(
      getLikedPost({
        page: type === "prev" ? currentLikedPage - 1 : currentLikedPage + 1,
      })
    );
  };

  if (loading) return <Loading />;

  return (
    <>
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
      </div>
      {storiesToggle === 0 ? (
        <Pagination
          onChangePagination={onChangePagination}
          disabledPrev={currentAllBlogPage === 1}
          disabledNext={currentAllBlogPage >= totalAllArticlesPage}
        />
      ) : (
        <Pagination
          onChangePagination={onChangePaginationLike}
          disabledPrev={currentLikedPage === 1}
          disabledNext={currentLikedPage >= totalLikedPage}
        />
      )}
    </>
  );
}

export default MyPost;
