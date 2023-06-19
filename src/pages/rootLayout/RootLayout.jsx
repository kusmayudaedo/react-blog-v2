import "../home/home.css";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Topbar />
      <div className="root-layout">
        <Header />
        <div className="home">
          <div className="home-post">
            <Outlet />
          </div>
          <div className="home-sidebar">
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
