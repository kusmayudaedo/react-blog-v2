import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { geAllPost } from "../../store/slices/blogs/slices";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/Header";
import RenderPost from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";

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
      <Topbar />
      <Header />
      <div className='home'>
        <div className='home-post'>
          <RenderPost
            articles={allArticle}
            currentAllBlogPage={currentAllBlogPage}
          />
        </div>
        <div className='home-sidebar'>
          <Sidebar />
        </div>
      </div>
      <Pagination
        onChangePagination={onChangePagination}
        disabledPrev={currentAllBlogPage === 1}
        disabledNext={currentAllBlogPage >= totalAllArticlesPage}
      />
      <Footer />
    </>
  );
}

export default Home;
