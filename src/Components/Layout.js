import { Outlet } from "react-router-dom";
import "./Layout.css";
import Loader from "./Loader/Loader";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Layout = () => {
  const { loading } = useContext(UserContext);
  return (
    <main className="App">
      {loading && (
        <>
          <div className="overlay"></div>
          <div className="loader-container">
            <Loader />
          </div>
        </>
      )}
      <div className={`${loading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
