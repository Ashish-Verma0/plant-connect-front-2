// import axios from "../api/axios";
// import { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import useAuth from "./useAuth";

const useRefreshToken = () => {
  // const { setAuth } = useAuth();
  // const { Refresh } = useContext(UserContext);
  // const fetchTableData = () => {
  //   let data = {};
  //   Refresh(
  //     (apiRes) => {
  //       let data = apiRes.data;
  //       // setAuth((prev) => {
  //       //   return {
  //       //     ...prev,
  //       //     roles: response.data.roles,
  //       //     accessToken: response.data.accessToken,
  //       //   };
  //       // });
  //     },
  //     (apiErr) => {
  //     }
  //   );
  // };
  //   const refresh = async () => {
  //     const response = await axios.get("/refresh", {
  //       withCredentials: true,
  //     });
  //     setAuth((prev) => {
  //       return {
  //         ...prev,
  //         roles: response.data.roles,
  //         accessToken: response.data.accessToken,
  //       };
  //     });
  //     return response.data.accessToken;
  //   };
  //   return refresh;
};

export default useRefreshToken;
