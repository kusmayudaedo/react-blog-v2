import "./userBar.css";

import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth/slices";
import { useDispatch, useSelector } from "react-redux";

function UserBar({ handleUserBarItemClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, isKeepLogin } = useSelector((state) => {
    return {
      id: state.auth.id,
      isKeepLogin: state.auth.isKeepLogin,
    };
  });

  const handleLogoutClick = () => {
    dispatch(logout());
    if (!id) return <Navigate to="/home" replace />;
  };
  return (
    <div className="userbar">
      <div className="userbar-container">
        <ul className="userbar-list">
          <li
            className="userbar-list-item"
            onClick={() => {
              navigate("/write");
              handleUserBarItemClick();
            }}
          >
            Write Stories
          </li>

          <li
            className="userbar-list-item"
            onClick={() => {
              navigate("/your/stories");
              handleUserBarItemClick();
            }}
          >
            My Stories
          </li>

          <li
            className="userbar-list-item"
            onClick={() => {
              navigate("/settings");
              handleUserBarItemClick();
            }}
          >
            Account
          </li>

          <li
            className="userbar-list-item"
            onClick={() => {
              handleLogoutClick();
              handleUserBarItemClick();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserBar;
