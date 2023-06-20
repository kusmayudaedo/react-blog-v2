import "./sidebar.css";

import RenderPostCard from "../postCard/PostCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import RenderCategory from "../category/Category";
import { getCategory, getMostFavorite } from "../../store/slices/blogs/slices";

function Sidebar() {
  const dispatch = useDispatch();

  const { allCategory, loading, currentPage, mostFavorite } = useSelector(
    (state) => {
      return {
        user: state.auth.id,
        loading: state.blogs.isLoadingCategory,
        allCategory: state.blogs.allCategory,
        currentPage: state.blogs.currentPage,
        mostFavorite: state.blogs.mostFavorite,
      };
    }
  );

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    dispatch(getMostFavorite());
  }, []);

  if (loading) return <Loading />;
  return (
    <div className='sidebar'>
      <div className='sidebar-item'>
        <h3 className='sidebar-title'>Categories</h3>
        <ul className='sidebar-list'>
          <RenderCategory allCategory={allCategory} currentPage={currentPage} />
        </ul>
      </div>

      <div className='sidebar-item'>
        <h3 className='sidebar-title'>Favorited Post</h3>
        <div className='sidebar-recent-card'>
          <RenderPostCard
            mostFavorite={mostFavorite}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
