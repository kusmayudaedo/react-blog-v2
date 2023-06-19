import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { geAllPost } from "../../store/slices/blogs/slices";
import RenderPost from "../../components/post/Post";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const dispatch = useDispatch();

  const { loading, currentAllBlogPage, totalAllArticlesPage, allArticle } =
    useSelector((state) => {
      return {
        loading: state.blogs.isLoadingArticles,
        allArticle: state.blogs.allArticle,
        currentAllBlogPage: state.blogs.currentAllBlogPage,
        totalAllArticlesPage: state.blogs.totalAllArticlesPage,
      };
    });

  useEffect(() => {
    dispatch(geAllPost({ page: currentAllBlogPage }));
  }, [currentAllBlogPage]);

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
      <RenderPost
        articles={allArticle}
        currentAllBlogPage={currentAllBlogPage}
      />
      <Pagination
        onChangePagination={onChangePagination}
        disabledPrev={currentAllBlogPage === 1}
        disabledNext={currentAllBlogPage >= totalAllArticlesPage}
      />
    </>
  );
}

export default Home;
