// import React, { useContext, useEffect } from "react";
// import NavBar from "../Components/NavBar/NavBar";
// import PosterCard from "../Components/Home/PosterCard/PosterCard";
// import DistrictTable from "./DistrictTable";
// import { UserContext } from "../context/UserContext";

// export default function Public() {
//   const { getStateDist } = useContext(UserContext);

//   const fetchDrillingData = () => {
//     let data = {
//       //   StateName: "Arunachal Pradesh",
//     };
//     let params = {
//       StateName: "Bihar",
//     };

//     getStateDist(
//       data,
//       params,
//       (apiRes) => {
//         // if (apiRes.status === 200) {

//         // }
//       },
//       (apiErr) => {
//       }
//     );
//   };

//   useEffect(() => {
//     fetchDrillingData();
//   }, []);

//   return (
//     <>
//       {/* <NavBar />
//       <PosterCard /> */}
//       <DistrictTable />
//     </>
//   );
// }
