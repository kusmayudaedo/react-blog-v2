import "../home/home.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import RenderPost from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
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

  if (loading) return <Loading />;
  return (
    <>
      <Topbar />
      <Header />
      <div className='home'>
        <div className='home-post'>
          <RenderPost articles={articles} currentPage={currentBlogPage} />
        </div>
        <div className='home-sidebar'>
          <Sidebar />
        </div>
      </div>
      <Pagination
        onChangePagination={onChangePagination}
        disabledPrev={currentBlogPage === 1}
        disabledNext={currentBlogPage >= totalBlogPage}
      />
      <Footer />
    </>
  );
}

export default CategoryPost;