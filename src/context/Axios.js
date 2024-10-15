import axios from "axios";
import ApiPaths from "./ApiPaths.json";
import SecureLS from "secure-ls";

const url = `${process.env.REACT_APP_API_URL_LOCAL}/`;
const ls = new SecureLS({ encodingType: "aes" });
// const token = JSON.parse(localStorage.getItem("authToken"))?.token;
const fetchToken = () => {
  let token = null;
  try {
    const data = ls.get("authToken");
    if (typeof data === "string" && data.trim().length > 0) {
      token = JSON.parse(data)?.token;
    }
  } catch (error) {
    // console.error("Could not parse JSON", error);
    ls.remove("authToken");
  }
  return token;
};

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

const setAuthToken = () => {
  const token = fetchToken();
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

function AxiosPost(key, body, handleSuccess, handleError, config = {}) {
  setAuthToken();
  let req = { ...body };
  let finalApiUrl = url + ApiPaths.endPoints[key];
  return axios
    .post(finalApiUrl, req, config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
      return res;
    })
    .catch((err) => {
      if (handleError) handleError(err);
      throw err;
    });
}

function AxiosGet(key, handleSuccess, handleError, config = {}) {
  setAuthToken();
  let finalApiUrl = url + ApiPaths.endPoints[key];
  return axios
    .get(finalApiUrl, config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
      return res;
    })
    .catch((err) => {
      if (handleError) handleError(err);
      throw err;
    });
}

function AxiosGetWithParams(
  key,
  data,
  handleSuccess,
  handleError,
  config = {}
) {
  setAuthToken();
  const queryString = new URLSearchParams(data).toString();
  const finalApiUrl = `${url + ApiPaths.endPoints[key]}?${queryString}`;
  return axios
    .get(finalApiUrl, config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
      return res;
    })
    .catch((err) => {
      if (handleError) handleError(err);
      throw err;
    });
}

function AxiosPostWithParams(
  key,
  params,
  handleSuccess,
  handleError,
  config = {}
) {
  setAuthToken();
  const queryString = new URLSearchParams(params).toString();
  const finalApiUrl = `${url + ApiPaths.endPoints[key]}?${queryString}`;
  return axios
    .post(finalApiUrl, config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
      return res;
    })
    .catch((err) => {
      if (handleError) handleError(err);
      throw err;
    });
}

export { url, AxiosPost, AxiosGet, AxiosGetWithParams, AxiosPostWithParams };
