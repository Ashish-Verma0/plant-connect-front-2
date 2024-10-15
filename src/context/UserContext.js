import React, { useState, createContext, useEffect } from "react";
import { AxiosGet, AxiosPost, AxiosPostWithParams } from "./Axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import axios from "axios";

const ls = new SecureLS({ encodingType: "aes" });

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllow, setIsAllow] = useState(true);
  //drag and drop list data--
  const [formListData, setFormListData] = React.useState([]);
  const [dragAndDropEditData, setDragAndDropEditData] = useState([]);
  //drag and drop list data--

  const { auth, setAuth } = useAuth();
  const [selectedState, setSelectedState] = useState("All");
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      // console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };
  const checkTokenValidity = () => {
    const token = fetchToken();
    // if (!token) {
    //   handleLogout();
    // }
  };

  const handleLogout = () => {
    ls.removeAll();
    setAuth(null);
    navigate("/");
  };
  useEffect(() => {
    checkTokenValidity();
  }, []);
  const handleApiCallLoader = async (apiCall, ...args) => {
    checkTokenValidity();
    setLoading(true);
    try {
      await apiCall(...args);
    } catch (error) {
      // console.error(error, "USER CONTEXT");
    } finally {
      setLoading(false);
    }
  };

  const handleApiCall = async (apiCall, ...args) => {
    checkTokenValidity();
    try {
      await apiCall(...args);
    } catch (error) {
      // console.error(error, "USER CONTEXT");
    } finally {
    }
  };

  const [breadData, setBreadData] = useState([{ name: "States" }]);
  const changeBreadcrumWithStates = (data, type, file, page) => {
    let check = breadData.findIndex((item) => item.name == data.name);
    if (check != 1) {
      if (file === "head") {
        setBreadData([data]);
      } else {
        if (!isAllow) {
          let newData = breadData.filter((data) => data.name != "All");
          setBreadData([...newData, data]);
        } else {
          setBreadData([...breadData, data]);
        }
      }
      if (page == 1) {
        setBreadData([breadData[0], data]);
      }
    }
  };

  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
    // 0 = state
    // 1 = district
    // 2 = FPO
    // 3 = Farmer Name
  };

  const getLogin = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCallLoader(
      AxiosPost,
      "login",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };
  const getNotification = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCallLoader(
      AxiosGet,
      "getNotification",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };

  const getTableData = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCall(
      AxiosPost,
      "landingData",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };
  const [level, setLevel] = useState(1);
  const getStateDist = (params, handleApiRes, handleApiError) => {
    handleApiCall(
      AxiosPostWithParams,
      "fetchDetails",
      params,
      handleApiRes,
      handleApiError
    );
  };

  const getNxtFig = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCall(
      AxiosPost,
      "farmerDetails",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };

  const getCropTblData = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCall(
      AxiosPost,
      "cropDetails",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };

  const Refresh = (userSubmittedData, handleApiRes, handleApiError) => {
    handleApiCall(
      AxiosPost,
      "refresh",
      userSubmittedData,
      handleApiRes,
      handleApiError
    );
  };

  return (
    <UserContext.Provider
      value={{
        contextData: [userData, setUserData],
        loading,
        getLogin,
        getTableData,
        getStateDist,
        getNxtFig,
        getCropTblData,
        Refresh,
        getNotification,
        changeBreadcrumWithStates,
        breadData,
        handleBreadcrum,
        selectedState,
        setSelectedState,
        level,
        setLevel,
        selectedDistrict,
        setSelectedDistrict,
        isAllow,
        setIsAllow,
        formListData,
        setFormListData,
        dragAndDropEditData,
        setDragAndDropEditData,
      }}
    >
      {/* {loading && <Loader />} */}
      {props.children}
    </UserContext.Provider>
  );
};
