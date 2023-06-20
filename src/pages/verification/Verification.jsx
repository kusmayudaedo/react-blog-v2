import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyAccount } from "../../store/slices/auth/slices";
import "./verification.css";

function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isVerifyLoading, isVerified } = useSelector((state) => {
    return {
      isVerifyLoading: state.auth.isVerifyLoading,
      isVerified: state.auth.isVerified,
    };
  });

  useEffect(() => {
    const verifyAccountToken = location.pathname.split("/")[2];
    localStorage.setItem("token", verifyAccountToken);
    dispatch(verifyAccount());
  }, []);

  const handleSubmit = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className='verification'>
      <div className='verification-container'>
        <h2>Verification Success</h2>
        <form className='verification-form' onSubmit={handleSubmit}>
          <p>Let's explore our platform</p>
          <button className='verification-button' type='submit'>
            Click Me!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verification;
