import React, { useState } from "react";
import SLADistrictCollector from "../Components/SLAComponents/SLADistrictCollector";
import SecureLS from "secure-ls";

export default function SLAPage() {
  const [DistrictDropDown, SetDistrictDropDown] = useState([
    "All",
    "MOKOKCHUNG",
    "TUENSANG",
  ]);

  const [selectedPhases, setSelectedPhases] = useState([
    "Phase IV Year (23-24, 24-25, 25-26)",
  ]);
  const [mainMapCard, setMainMapCard] = useState([]);
  const [selectedSlaState, setSelectedSlaState] = useState("Nagaland");
  const [selectedSlaDistrict, setSelectedSlaDistrict] = useState({
    name: "All",
  });
  const [districtList, setDistrictList] = useState([
    "All",
    "MOKOKCHUNG",
    "TUENSANG",
  ]);
  const [fpoDetailTblData, setFpoDetailTblData] = useState([]);
  const [figDetailTblData, setFigDetailTblData] = useState();
  const [figfpoDetailButton, setFigfpoDetailButton] = useState("");

  //Token data -----
  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };
  //Token data -----
  const loginData = fetchToken();
  //dropDown api
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
  //     try {
  //       const response = await axios.get(url, {
  //         headers: {
  //           Authorization: `Bearer ${loginData.token}`,
  //         },
  //       });
  //       const data = response?.data.data;
  //       const district = data?.District;
  //       const state = data?.State;
  //       // setSelectedMapState(state);
  //       setDistrictList(district);
  //       const updatedData = ["All", ...district];
  //       SetDistrictDropDown(updatedData);
  //     } catch (error) {
  //       enqueueSnackbar("Server Error", {
  //         variant: "warning",
  //         anchorOrigin: {
  //           vertical: "bottom",
  //           horizontal: "left",
  //         },
  //         action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //         iconVariant: "success",
  //         autoHideDuration: 2000,
  //       });
  //     }
  //   };
  //   fetchUser();
  // }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };
  const handleSlaDistrict = (e) => {
    setSelectedSlaDistrict({ name: e });
  };
  const mapArray = [
    {
      label: "Total Area (Ha)",
      value: mainMapCard?.landArea || 0,
      isLink: false,
    },
    {
      label: "Total FPOs",
      value: mainMapCard?.stateOrDistrictFpoCount || 0,
      isLink: true,
    },
    {
      label: "Total LRPs",
      value: mainMapCard?.stateOrDistrictFpoCount || 0,
      isLink: selectedSlaDistrict ? true : true,
    },
    {
      label: "Total FIGs",
      value: mainMapCard?.stateOrDistrictFpoCount || 0,
      isLink: selectedSlaDistrict ? true : true,
    },
    { label: "Total FIGs", value: mainMapCard?.totalFigs || 0, isLink: false },
    {
      label: "Total no. of Farmers",
      value: mainMapCard?.totalFarmer || 0,
      isLink: false,
    },
  ];
  const handlePassfigfpoDetailButton = (value) => {
    setFigfpoDetailButton(value);
    if (value === "Total FIGs" || value === "Fig Detail") {
      // fetchAllFig();
    } else if (value === "Total FPOs" || value === "Fpo Detail") {
      // fetchAllFpo();
    }
  };
  return (
    <>
      <SLADistrictCollector />
    </>
  );
}
