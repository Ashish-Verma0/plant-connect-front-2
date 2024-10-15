import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SingleSelect from "../Components/Dropdown/SingleSelect";
import MultiSelect from "../Components/Dropdown/MultiSelect";
import CropTableContainer from "../Components/CropComponents/CropTableContainer";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const CropPage = () => {
  const { getCropTblData } = useContext(UserContext);
  const phases = ["Phase I", "Phase II", "Phase III", "Phase IV"];

  const [phaseFlag, setPhaseFlag] = useState(false);
  const [phaseWiseCrop, setPhaseWiseCrop] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState("Acid Lime");
  const [selectedPhases, setSelectedPhases] = useState([phases[3]]);
  //tableData
  const [cropLevel, setCropLevel] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [districtTableData, setDistrictTableData] = useState([]);
  // DropDown Select State and phase wise data
  const [phaseDropDown, SetPhaseDropDown] = useState([]);
  const [StateDropDown, SetStateDropDown] = useState([]);
  //PieChart Data
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    getphaseWiseCrop();
  }, []);
  const getphaseWiseCrop = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseCrop`;
    try {
      const response = await axios.get(url);
      const phaseWiseCrop = response?.data?.data[0].CropName;
      setPhaseWiseCrop(phaseWiseCrop);
    } catch (error) {}
  };
  // getCropTblData/

  const fetchCropData = (body) => {
    let data;
    body
      ? (data = body)
      : (data = {
          CropName: selectedCrop,
          Phase: selectedPhases,
        });
    getCropTblData(
      data,
      (apiRes) => {
        setTableData(apiRes?.data?.data.allCropDetails);
        setDistrictTableData(apiRes?.data?.data.allCropDetails);
        setPieChartData(apiRes?.data?.data);
      },
      (apiErr) => {}
    );
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };

  const handleStates = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCrops = (event) => {
    setSelectedCrop(event.target.value);
    setCropLevel(0);
  };

  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };
  useEffect(() => {
    fetchCropData();
  }, [selectedPhases, selectedCrop, selectedState]);

  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
      try {
        const response = await axios.get(url);
        let phaseDropDown = response?.data?.data?.map((data) => data?.Phase);

        let extractedDate = response?.data?.data || [];
        let result = [];

        for (let i = 0; i < extractedDate.length; i++) {
          result = extractedDate[i].StateName;
          result.unshift("All");
        }
        SetPhaseDropDown(phaseDropDown);
        SetStateDropDown(result);
      } catch (error) {
        enqueueSnackbar("Server Error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    };
    fetchUser();
  }, []);

  const handleClickCrop = (row) => {
    // setCropLevel(1);
    if (cropLevel === 0) {
      changeBreadcrumWithStates({ ...row, name: row.StateName }, `${0}`);
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: selectedPhases,
        CropName: selectedCrop,
      });
    } else if (cropLevel === 1) {
      changeBreadcrumWithStates({ ...row, name: row.DistrictName }, `${1}`);
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
    }
  };
  ///-----------
  const changeBreadcrumWithStates = (data, type, isAllow = false) => {
    if (data.name === "ALL") {
      setBreadData([{ name: data }]);
    } else {
      if (type === "0" && !isAllow) {
        setBreadData([{ name: data.name }]);
      } else {
        setBreadData((prev) => [...prev, data]);
      }
    }
  };
  //header
  const [breadData, setBreadData] = useState([{}]);

  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
    // 0 = state
    // 1 = district
    // 2 = FPO
    // 3 = Farmer Name
  };
  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    fetchCropData(level, row);
    if (cropLevel === 0) {
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: selectedPhases,
        CropName: selectedCrop,
      });
      setCropLevel(1);
    } else if (cropLevel === 1) {
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
      setCropLevel(1);
    }
  };
  const UpdatedbreadData = breadData.map((data, index) => {
    return (
      <Link
        key="1"
        color="inherit"
        onClick={() => handleBreadcrumbClick(index, data)}
        style={{ cursor: "pointer" }}
      >
        {data.name}
      </Link>
    );
  });
  return (
    <React.Fragment>
      <Grid
        style={{
          marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#16b566",
          height: "3rem",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "2rem",
            marginTop: "-3rem",
          }}
          spacing={2}
        >
          <Grid item>
            <MultiSelect
              label="Select Phase"
              handleChange={handleChange}
              items={phaseDropDown}
              selectedItems={selectedPhases}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Grid item>
            <SingleSelect
              label={"Crop"}
              items={phaseWiseCrop}
              handleChange={handleCrops}
              selectedItem={selectedCrop}
            />
          </Grid>
          <Grid item>
            {cropLevel > 0 && (
              <SingleSelect
                label={"States"}
                items={StateDropDown}
                handleChange={handleStates}
                selectedItem={selectedState}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ padding: "25px" }}>
        <CropTableContainer
          cropLevel={cropLevel}
          CropTableData={tableData}
          pieChartData={pieChartData}
          handleClickCrop={handleClickCrop}
          DistrictTableData={districtTableData}
          UpdatedbreadData={UpdatedbreadData}
        />
      </Grid>
    </React.Fragment>
  );
};

export default CropPage;
