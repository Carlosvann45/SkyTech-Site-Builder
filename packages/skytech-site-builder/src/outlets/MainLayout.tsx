import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classes from "../styles/MainLayout.module.css";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";

/**
 * @name MainLayout
 * @description handles all navigation and toast container for all main pages accross the app
 * @returns Component
 */
const MainLayout = () => (
  <div className={classes.container}>
    <TopNav />
    <div className={classes.maincontent}>
      <SideNav />
      <div className={classes.pagecontainer}>
        <Outlet />
      </div>
    </div>
    <ToastContainer
      position="bottom-center"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </div>
);

export default MainLayout;
