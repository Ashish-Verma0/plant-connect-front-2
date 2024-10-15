import React from "react";
import "./Auth.css";
import Login from "./Login/Login";
import { useLocation } from "react-router-dom";
import Signup from "./SignUp";

const Auth = ({ setUserInfo }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <>
      {path === "signup" && <Signup setUserInfo={setUserInfo} />}
      {path === "login" && <Login setUserInfo={setUserInfo} />}
    </>
  );
};

export default Auth;
