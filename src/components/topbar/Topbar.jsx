import "./topbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useTransition } from "react";
import {
  getCategory,
  setCurrentAllBlogPage,
} from "../../store/slices/blogs/slices";
import PPImage from "../../asset/no-profile-picture.png";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import RenderCategory from "../category/Category";
import Modal from "react-modal";
import UserBar from "../userBar/UserBar";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "flex-end", // Aligns the modal to the right
    alignItems: "flex-start", // Aligns
  },
  content: {
    position: "absolute",
    top: "65px",
    right: "0",
    left: "auto",
    marginRight: "65px",
    width: "250px",
    height: "max-content",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    border: "none",
  },
};

function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    user,
    isKeepLogin,
    allCategory,
    loading,
    currentBlogPage,
    imgProfile,
    username,
  } = useSelector((state) => {
    return {
      loading: state.blogs.isLoadingCategory,
      user: state.auth.id,
      username: state.auth.username,
      isKeepLogin: state.auth.isKeepLogin,
      imgProfile: state.auth.imgProfile,
      allCategory: state.blogs.allCategory,
      currentBlogPage: state.blogs.currentBlogPage,
    };
  });

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  if (loading) return <Loading />;

  const handleCategoryClick = () => {
    dispatch(setCurrentAllBlogPage(1));
    navigate(`/`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserBarItemClick = () => {
    closeModal();
    dispatch(setCurrentAllBlogPage());
  };

  return (
    <>
      <div className='top'>
        <div className='top-left'>
          <i
            className='bx bxl-facebook-circle top-icon'
            onClick={() => (window.location.href = "https://www.facebook.com")}
          ></i>

          <i
            className='bx bxl-instagram-alt top-icon'
            onClick={() =>
              (window.location.href = "https://www.instagram.com/")
            }
          ></i>
          <i
            className='bx bxl-pinterest top-icon'
            onClick={() => (window.location.href = "https://id.pinterest.com/")}
          ></i>
          <i
            className='bx bxl-twitter top-icon'
            onClick={() => (window.location.href = "https://twitter.com/")}
          ></i>
        </div>

        <div className='top-center'>
          {/* <h1 className="topbar-title">E-Corp Blog</h1> */}
          <div className='topbar-list'>
            <ul className='top-list'>
              <li className='top-list-item' onClick={handleCategoryClick}>
                Home
              </li>
              <RenderCategory
                allCategory={allCategory}
                currentBlogPage={currentBlogPage}
              />
            </ul>
          </div>
        </div>

        <div className='top-right'>
          {user && isKeepLogin ? (
            <>
              <span className="top-right-username">{username}</span>
              <img
                onClick={openModal}
                className='top-img'
                src={
                  imgProfile
                    ? `${process.env.REACT_APP_IMAGE_URL + imgProfile}`
                    : PPImage
                }
                alt=''
              />
            </>
          ) : (
            <div className='login-register-button'>
              <button type='submit' onClick={() => navigate("/login")}>
                {" "}
                Log In
              </button>
              <button type='submit' onClick={() => navigate("/register")}>
                {" "}
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <UserBar handleUserBarItemClick={handleUserBarItemClick} />
      </Modal>
    </>
  );
}

export default Topbar;
