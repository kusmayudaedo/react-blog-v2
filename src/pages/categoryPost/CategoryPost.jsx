import "../home/home.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RenderPost from "../../components/post/Post";
import Loading from "../../components/loading/Loading";
import { getArticles } from "../../store/slices/blogs/slices";
import Pagination from "../../components/pagination/Pagination";

function CategoryPost() {
  const dispatch = useDispatch();
  const location = useLocation();

  const categoryIdPath = parseInt(location.pathname.split("/")[2]);
  const currentPagePath = parseInt(location.pathname.split("/")[3]);

  const { loading, currentBlogPage, totalBlogPage, articles } = useSelector(
    (state) => {
      return {
        loading: state.blogs.isLoadingArticles,
        articles: state.blogs.articles,
        currentBlogPage: state.blogs.currentBlogPage,
        totalBlogPage: state.blogs.totalBlogPage,
      };
    }
  );

  useEffect(() => {
    dispatch(
      getArticles({
        id_cat: categoryIdPath,
        page: currentPagePath,
        sort: "ASC",
      })
    );
  }, [categoryIdPath]);

  const onChangePagination = (type) => {
    dispatch(
      getArticles({
        id_cat: categoryIdPath,
        page: type === "prev" ? currentBlogPage - 1 : currentBlogPage + 1,
        sort: "ASC",
      })
    );
  };

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) return <Loading />;
  return (
    <>
      <RenderPost articles={sortedArticles} currentPage={currentBlogPage} />
      <Pagination
        onChangePagination={onChangePagination}
        disabledPrev={currentBlogPage === 1}
        disabledNext={currentBlogPage >= totalBlogPage}
      />
    </>
  );
}

export default CategoryPost;
