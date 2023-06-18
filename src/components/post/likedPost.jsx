import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PPImage from "../../asset/no-profile-picture.png";
import ThumbnailImg from "../../asset/no-thumbnail-image.png";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { likeArticle } from "../../store/slices/blogs/slices";
import "./post.css";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "80%",
    width: "80%",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    overflow: "auto",
    border: "none",
  },
};

function LikedPost({
  postId = "",
  title = "",
  content = "",
  categoryName = "",
  categoryId = "",
  thumbnail = "",
  userProfilePicture,
  userId = "",
  username = "asdasdasd",
  dateCreated = "",
  currentPage = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeButtonColor, setlikeButtonColor] = useState("teal");

  const { user } = useSelector((state) => {
    return {
      user: state.auth.id,
    };
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLikeClick = (id) => {
    if (!user) navigate("/login");
    setlikeButtonColor("teal");
    dispatch(likeArticle({ BlogId: id }));
  };

  return (
    <div className="post">
      <img className="post-img" src={ThumbnailImg} alt="" />
      <div className="post-info">
        <h2 className="post-title" onClick={openModal}>
          {title}
        </h2>
        <hr />
        <div className="post-category">
          <span className="singepost-category">
            <Link className="link">{categoryName}</Link>
          </span>
        </div>

        <div className="post-description">
          <p>{content}</p>
        </div>
        <button className="read-more" onClick={openModal}>
          Read more
        </button>

        <div className="post-user-info">
          <img
            className="post-user-info-img"
            src={
              userProfilePicture
                ? `${process.env.REACT_APP_IMAGE_URL + userProfilePicture}`
                : PPImage
            }
            alt=""
          />
          <div className="post-user-info-name">
            <span className="post-user-info-username">{username}</span>
            <span className="post-user-info-date">
              {new Date(dateCreated).toDateString()}
            </span>
          </div>
        </div>
      </div>

      <Modal
        className="modal-post"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className="single-post">
          <div className="single-post-container">
            <div className="close-modal">
              <span className="single-post-modal-close" onClick={closeModal}>
                <i class="bx bxs-x-circle"></i>
              </span>
            </div>
            <img
              className="single-post-img"
              src={process.env.REACT_APP_IMAGE_URL + thumbnail}
              alt=""
            />

            <h1 className="single-post-title">
              {title}
              {user == userId && (
                <div className="single-post-edit">
                  <Link to={`/write?edit=2`} className="single-post-edit-icon">
                    <i class="bx bxs-edit"></i>
                  </Link>
                  <i class="bx bxs-message-square-x single-post-edit-icon"></i>
                </div>
              )}
            </h1>
            <div className="single-post-user-info">
              <img
                className="single-post-user-info-img"
                src={
                  userProfilePicture
                    ? `${process.env.REACT_APP_IMAGE_URL + userProfilePicture}`
                    : PPImage
                }
                alt=""
              />
              <div className="single-post-user-info-name">
                <span className="single-post-user-info-username">
                  {username}
                </span>
                <span className="single-post-user-info-date">
                  {new Date(dateCreated).toDateString()}
                </span>
                <span
                  className="like-post"
                  onClick={() => handleLikeClick(postId)}
                  style={{ color: likeButtonColor }}
                >
                  <i class="bx bxs-like"></i>
                </span>
              </div>
            </div>
            <div className="single-post-content">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function RenderLikedPost({ articles = [], currentPage }) {
  return articles.map((article, index) => {
    return (
      <LikedPost
        key={article.id}
        title={article.Blog.title}
        content={article.Blog.content}
        categoryId={article.Blog.Category.id}
        categoryName={article.Blog.Category.name}
        dateCreated={article.createdAt}
        currentPage={currentPage}
      />
    );
  });
}

export default RenderLikedPost;
