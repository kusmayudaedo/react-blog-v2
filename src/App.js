import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/rootLayout/RootLayout";
import Home from "./pages/home/Home";
import CategoryPost from "./pages/categoryPost/CategoryPost";
import Write from "./pages/write/Write";
import UpdatePost from "./pages/write/UpdatePost";
import MyPost from "./pages/myPost/MyPost";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgetPass from "./pages/forgetPassword/ForgetPass";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Loading from "./components/loading/Loading";
import Verification from "./pages/verification/Verification";
import { keepLogin } from "./store/slices/auth/slices";
import ProtectedRoute from "./protectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { isKeepLoginLoading } = useSelector((state) => {
    return {
      isKeepLoginLoading: state.auth.isKeepLoginLoading,
    };
  });

  useEffect(() => {
    dispatch(keepLogin());
  }, []);

  if (isKeepLoginLoading) {
    return <Loading />;
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route
              path=":categoryName/:categoryId/:page"
              element={<CategoryPost />}
            />
            <Route
              path="your/stories"
              element={
                <ProtectedRoute>
                  <MyPost />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <Write />
              </ProtectedRoute>
            }
          />
          <Route
            path="/write/:id"
            element={
              <ProtectedRoute>
                <UpdatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route path="/test" element={<Verification />} />
          <Route
            path="/verification-change-email/:token"
            element={<Verification />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
