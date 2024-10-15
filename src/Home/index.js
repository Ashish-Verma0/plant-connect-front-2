import { Button, Grid } from "@mui/material";
import MapBox from "./MapContent/MapBox";
import { getFetch } from "../Components/API/Api";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import PlantTableContainer from "./PlantTables/PlantTableContainer";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import HMTModal from "../Components/PlantModals/HMTModal";

const Home = () => {
  const { selectedState, selectedDistrict } = useContext(UserContext);
  const [level, setLevel] = useState(0);
  const [mainMapCard, setMainMapCard] = useState({});
  const [plantWiseData, setPlantWiseData] = useState([]);
  const [stateDropDown, SetStateDropDown] = useState([]);
  const [nurseryWiseData, setNurseryWiseData] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [districtDropdown, setDistrictDropdown] = useState([]);
  const [breadcrumbData, setBreadcrumbData] = useState(["District"]);
  const [districtWisePlantData, setDistrictWisePlantData] = useState([]);
  const [PlantNurseryTableLoder, setPlantNurseryTableLoder] = useState(false);
  const [PlantVarietyTableLoder, setPlantVarietyTableLoder] = useState(false);
  const [PlantDistrictTableLoder, setPlantDistrictTableLoder] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    year: "2024",
    state: "Uttarakhand",
    division: "Kumaon",
    district: "All",
  });

  //handlechange Dropdowns
  const handleStates = (newValue, key) => {
    setLevel(0);
    setBreadcrumbData(["District"]);
    setSelectedValue((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };

  //Division and dristrict according data comes
  useEffect(() => {
    const fetchUser = async () => {
      setPlantDistrictTableLoder(true);
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/districts?divisionName=${selectedValue.division}&districtName=${selectedValue.district}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          setPlantDistrictTableLoder(false);
          setDistrictWisePlantData(response?.data?.data);
        }
      } catch (error) {
        setPlantDistrictTableLoder(false);
        enqueueSnackbar(error?.response?.data?.message || "Server Error", {
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
  }, [selectedValue.district, selectedValue.division]);

  //Division according district dropdown comes
  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/district/division?division=${selectedValue.division}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          setPlantDistrictTableLoder(false);
          setDistrictDropdown(["All", ...response?.data?.data]);
        }
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message || "Server Error", {
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
  }, [selectedValue.division]);

  //district according numrserys comes
  const fetchNurserys = async (district) => {
    setPlantNurseryTableLoder(true);
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/district?district=${district}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantNurseryTableLoder(false);
        setNurseryWiseData(response.data);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
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

  //nursery according Plants comes
  const fetchPlants = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/plantName?nurseryId=${nurseryId}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantWiseData(response.data.data);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
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

  const [plantVarietiesData, setPlantVarietiesData] = useState([]);
  console.log(plantVarietiesData, "==plantVarietiesData");
  //Plant Name according Plant Variety comes
  const fetchPlantVariety = async (plantName) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/plantName/plntVariety?plantName=${plantName}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantVarietiesData(response.data.data);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
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
  // map Side table card
  const mapArray = [
    {
      label: "Total Area (Ha)",
      value: mainMapCard?.landArea || 0,
      isLink: false,
    },
    {
      label: "Total FPOs",
      value: mainMapCard?.stateOrDistrictFpoCount || 0,
      isLink: selectedDistrict ? true : false,
    },
    { label: "Total FIGs", value: mainMapCard?.totalFigs || 0, isLink: false },
    {
      label: "Total no. of Farmers",
      value: mainMapCard?.totalFarmer || 0,
      isLink: false,
    },
  ];

  const [HMTModalopen, setHMTModalOpen] = useState(false);

  const handleClickHMTModalOpen = () => {
    setHMTModalOpen(true);
  };

  const handleHMTModalClose = () => {
    setHMTModalOpen(false);
  };

  return (
    <React.Fragment>
      <HMTModal
        HMTModalopen={HMTModalopen}
        handleHMTModalClose={handleHMTModalClose}
      />
      <Grid
        style={{
          marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#426d52",
          height: "3rem",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "33px",
            marginTop: "-3rem",
          }}
          spacing={2}
        >
          <Grid item>
            <AutocompleteSelect
              label={"Select Year"}
              items={["2022", "2023", "2024"]}
              handleChange={(newValue) => handleStates(newValue, "year")}
              selectedItem={selectedValue.year}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select State"}
              items={["Uttarakhand"]}
              handleChange={(newValue) => handleStates(newValue, "state")}
              selectedItem={selectedValue.state}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select Division"}
              items={["Kumaon", "Garhwal"]}
              handleChange={(newValue) => handleStates(newValue, "division")}
              selectedItem={selectedValue.division}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select District"}
              items={districtDropdown}
              handleChange={(newValue) => handleStates(newValue, "district")}
              selectedItem={selectedValue.district}
            />
          </Grid>
        </Grid>
      </Grid>
      <MapBox
        mapArray={mapArray}
        // userRole={userRole}
        mainMapCard={mainMapCard}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        districtList={stateDropDown}
        LegendList={uniqueDistricts}
      />

      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          padding: "20px 33px 20px 33px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "-60px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#426d52",
            }}
            onClick={handleClickHMTModalOpen}
          >
            Place Order
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <PlantTableContainer
            level={level}
            setLevel={setLevel}
            fetchPlants={fetchPlants}
            plantWiseData={plantWiseData}
            fetchNurserys={fetchNurserys}
            breadcrumbData={breadcrumbData}
            nurseryWiseData={nurseryWiseData}
            setBreadcrumbData={setBreadcrumbData}
            fetchPlantVariety={fetchPlantVariety}
            plantVarietiesData={plantVarietiesData}
            districtWisePlantData={districtWisePlantData}
            PlantDistrictTableLoder={PlantDistrictTableLoder}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Home;
