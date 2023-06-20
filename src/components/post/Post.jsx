import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PPImage from "../../asset/no-profile-picture.png";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import {
  likeArticle,
  setBlogPost,
  deleteBlog,
} from "../../store/slices/blogs/slices";
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

const modalDeleteStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
    width: "450px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    overflow: "hidden",
    border: "none",
  },
};

function Post({
  postId = "",
  title = "",
  content = "",
  categoryName = "",
  categoryId = "",
  keywords = "",
  thumbnail = "",
  userProfilePicture,
  userId = "",
  username = "",
  dateCreated = "",
  currentPage = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [likeButtonColor, setlikeButtonColor] = useState("inherit");

  const { user } = useSelector((state) => {
    return {
      user: state.auth.id,
      blogPost: state.blogs.blogPost,
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

  const handleUpdateButton = () => {
    const blogData = {
      postId: postId,
      title: title,
      content: content,
      categoryName: categoryName,
      categoryId: categoryId,
      keywords: keywords,
      thumbnail: thumbnail,
      dateCreated: dateCreated,
    };
    dispatch(setBlogPost(blogData));
    navigate(`/write/${postId}`);
  };

  const openDeleteModal = () => {
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleDeleteButton = (id) => {
    dispatch(deleteBlog({ id }));
    setIsModalOpen(false);
    setIsModalDeleteOpen(false);
    <Navigate to='/your/stories' replace />;
  };

  return (
    <div className='post'>
      <img
        className='post-img'
        src={process.env.REACT_APP_IMAGE_URL + thumbnail}
        alt=''
      />
      <div className='post-info'>
        <h2 className='post-title' onClick={openModal}>
          {title}
        </h2>
        <hr />
        <div className='post-category'>
          <span className='singepost-category'>
            <Link className='link'>{categoryName}</Link>
          </span>
        </div>

        <div className='post-description'>
          <p>{content}</p>
        </div>
        <button className='read-more' onClick={openModal}>
          Read more
        </button>

        <div className='post-user-info'>
          <img
            className='post-user-info-img'
            src={
              userProfilePicture
                ? `${process.env.REACT_APP_IMAGE_URL + userProfilePicture}`
                : PPImage
            }
            alt=''
          />
          <div className='post-user-info-name'>
            <span className='post-user-info-username'>{username}</span>
            <span className='post-user-info-date'>
              {new Date(dateCreated).toDateString()}
            </span>
          </div>
        </div>
      </div>

      <Modal
        className='modal-post'
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='single-post'>
          <div className='single-post-container'>
            <div className='close-modal'>
              <span className='single-post-modal-close' onClick={closeModal}>
                <i class='bx bxs-x-circle'></i>
              </span>
            </div>
            <img
              className='single-post-img'
              src={process.env.REACT_APP_IMAGE_URL + thumbnail}
              alt=''
            />

            <h1 className='single-post-title'>
              {title}
              {user === userId && (
                <div className='single-post-edit'>
                  <i
                    class='bx bxs-edit single-post-edit-icon'
                    onClick={handleUpdateButton}
                  ></i>
                  <i
                    class='bx bxs-message-square-x single-post-edit-icon'
                    onClick={openDeleteModal}
                  ></i>
                </div>
              )}
            </h1>
            <div className='single-post-user-info'>
              <img
                className='single-post-user-info-img'
                src={
                  userProfilePicture
                    ? `${process.env.REACT_APP_IMAGE_URL + userProfilePicture}`
                    : PPImage
                }
                alt=''
              />
              <div className='single-post-user-info-name'>
                <span className='single-post-user-info-username'>
                  {username}
                </span>
                <span className='single-post-user-info-date'>
                  {new Date(dateCreated).toDateString()}
                </span>
                <span
                  className='like-post'
                  onClick={() => handleLikeClick(postId)}
                  style={{ color: likeButtonColor }}
                >
                  <i class='bx bxs-like'></i>
                </span>
              </div>
            </div>
            <div className='single-post-content'>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className='modal-delete'
        isOpen={isModalDeleteOpen}
        onRequestClose={closeModalDelete}
        style={modalDeleteStyles}
      >
        <div className='delete-container'>
          <h2 className='delete-description'>Delete Post</h2>
          <p className='delete-description'>
            Are you sure you want to delete this blog post?
          </p>
          <div className='delete-button'>
            <button onClick={() => handleDeleteButton(postId)}>Delete</button>
            <button onClick={closeModalDelete}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function RenderPost({ articles = [], currentPage }) {
  return articles.map((article, index) => {
    return (
      <Post
        key={article?.id}
        postId={article?.id}
        title={article?.title}
        content={article?.content}
        thumbnail={article?.imageURL}
        categoryName={article?.Category?.name}
        categoryId={article?.Category?.id}
        keywords={article?.Blog_Keywords[0].Keyword.name}
        userProfilePicture={article?.User.imgProfile}
        userId={article?.UserId}
        username={article?.User.username}
        dateCreated={article?.createdAt}
        currentPage={currentPage}
      />
    );
  });
}

export default RenderPost;
