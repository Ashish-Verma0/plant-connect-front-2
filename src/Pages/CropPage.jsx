import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SingleSelect from "../Components/Dropdown/SingleSelect";
import MultiSelect from "../Components/Dropdown/MultiSelect";
import CropTableContainer from "../Components/CropComponents/CropTableContainer";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const CropPage = () => {
  const phaseWiseArr = [
    "Phase IV Year (2023-2024 to 2025-2026)",
    "Phase III Year (2020-2021 to 2022-2023)",
  ];
  const { getCropTblData } = useContext(UserContext);
  const phases = ["Phase I", "Phase II", "Phase III", "Phase IV"];
  const [phaseFlag, setPhaseFlag] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  // ----GroupWise
  const [groupWiseCrop, setGroupWiseCrop] = useState([]);
  const [selectedGroupCrop, setSelectedGroupCrop] = useState("SPICES");
  // ----phaseWise
  const [phaseWiseCrop, setPhaseWiseCrop] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    if (phaseWiseCrop.length > 0 && selectedCrop === null) {
      const firstCrop = phaseWiseCrop[0];
      setSelectedCrop(firstCrop);
      fetchCropData({
        CropName: firstCrop,
        Phase: "Phase IV",
      });
    }
  }, [phaseWiseCrop, selectedCrop]);

  // ----
  const [phaseDropDown, SetPhaseDropDown] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([phaseWiseArr[0]]);
  const [cropLevel, setCropLevel] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [districtTableData, setDistrictTableData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [breadData, setBreadData] = useState([{}]);
  const [stateDropDown, SetStateDropDown] = useState(["All"]);
  useEffect(() => {
    getGroupWiseCrop();
  }, [selectedGroupCrop]);

  useEffect(() => {
    fetchStates();
    // fetchCropData();
    getphaseWiseCrop();
  }, []);
  const getphaseWiseCrop = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseCrop`;
    try {
      const response = await axios.get(url);
      const phaseWiseCrop = response?.data?.data[0].CropName;
    } catch (error) {}
  };
  const getGroupWiseCrop = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/groupWiseCrop`;
    try {
      const response = await axios.get(url);
      const groupWiseCrop = response?.data?.data || [];
      //groupWise
      let groupWiseCropGroupName = [];
      for (let i = 0; i < groupWiseCrop.length; i++) {
        groupWiseCropGroupName.push(groupWiseCrop[i].CropGroupName);
      }
      setGroupWiseCrop(groupWiseCropGroupName);

      const selectedCropGroup = groupWiseCrop.find(
        (group) => selectedGroupCrop === group.CropGroupName
      );
      setPhaseWiseCrop(selectedCropGroup.CropNames);
    } catch (error) {}
  };
  const fetchCropData = (body) => {
    let data;
    if (body) {
      data = body;
    } else {
      data = { CropName: selectedCrop, Phase: "Phase IV" };
    }

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
    const state = event.target.value;
    setSelectedState(state);
    setBreadData([{ name: state }]);
    if (event.target.value === "All") {
      fetchCropData({
        CropName: selectedCrop,
        Phase: "Phase IV",
      });
      setCropLevel(0);
    } else {
      fetchCropData({
        StateName: state,
        CropName: selectedCrop,
        Phase: "Phase IV",
      });
      setCropLevel(1);
    }
  };

  const handleCrops = (event) => {
    setSelectedCrop(event.target.value);
    setCropLevel(0);
    setBreadData([{}]);
    fetchCropData({
      CropName: event?.target?.value,
      Phase: "Phase IV",
    });
  };

  const handleGroupCrops = (event) => {
    setSelectedGroupCrop(event.target.value);
  };

  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };

  const fetchStates = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
    try {
      const response = await axios.get(url);
      if (phaseDropDown.length) {
        setSelectedPhases([phaseDropDown[1]]);
      }
      let extractedDate = response?.data?.data || [];
      let result = [];
      for (let i = 0; i < extractedDate.length; i++) {
        result = extractedDate[i].StateName;
        result.unshift("All");
      }
      SetStateDropDown(result);
    } catch (error) {}
  };

  const handleClickCrop = (row) => {
    if (row?.StateName) {
      setSelectedState(row?.StateName);
    }
    if (cropLevel === 0) {
      setCropLevel(1);
      changeBreadcrumWithStates({ ...row, name: row.StateName }, 0);
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: "Phase IV",
        CropName: selectedCrop,
      });
    } else if (cropLevel === 1) {
      setCropLevel(2);
      changeBreadcrumWithStates({ ...row, name: row.DistrictName }, 1);
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
    }
  };

  const changeBreadcrumWithStates = (data, type) => {
    if (data.name === "ALL") {
      setBreadData([{ name: data.name }]);
    } else {
      if (type === 0) {
        setBreadData([{ name: data.name }]);
      } else {
        setBreadData((prev) => [...prev, data]);
      }
    }
  };

  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
  };

  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    if (level === 0) {
      setCropLevel(1);
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: "Phase IV",
        CropName: selectedCrop,
      });
    } else if (level === 1) {
      setCropLevel(2);
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
    }
  };

  const UpdatedbreadData = breadData.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClick(index, data)}
      style={{ cursor: "pointer" }}
    >
      {data.name === "All" ? "States" : data.name}
    </Link>
  ));

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
              items={phaseWiseArr}
              selectedItems={selectedPhases}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Grid item>
            <SingleSelect
              label={"Crop"}
              items={groupWiseCrop}
              handleChange={handleGroupCrops}
              selectedItem={selectedGroupCrop}
            />
          </Grid>
          <Grid item>
            <SingleSelect
              label={"Crop Group"}
              items={phaseWiseCrop}
              handleChange={handleCrops}
              selectedItem={selectedCrop}
            />
          </Grid>
          <Grid item>
            {cropLevel > 0 && (
              <SingleSelect
                label={"States"}
                items={stateDropDown}
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
          selectedCrop={selectedCrop}
          handleClickCrop={handleClickCrop}
          DistrictTableData={districtTableData}
          UpdatedbreadData={UpdatedbreadData}
        />
      </Grid>
    </React.Fragment>
  );
};

export default CropPage;
