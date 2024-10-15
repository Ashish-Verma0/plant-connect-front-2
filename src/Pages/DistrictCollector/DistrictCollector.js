import { Button, Card, Grid } from "@mui/material";
import SecureLS from "secure-ls";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import MultipleSelect from "../../Components/Dropdown/MultiSelect";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import MapBox from "../../Home/MapContent/MapBox";
import { UserContext } from "../../context/UserContext";
import DcTableContainer from "./DcTableContainer";
import Map1 from "../../Home/MapContent/Map1";
import MapTableCard from "../../Components/MapTableCard";
import exportBtn from "../../assets/images/exportBtn.png";
import { Link } from "react-router-dom";
import DcHeader from "./DcHeader";

const phaseWiseArr = [
  "Phase IV Year (23-24, 24-25, 25-26)",
  "Phase III Year (20-21, 21-22, 22-23)",
];

export default function DistrictCollector() {
  const {
    breadData,

    getNxtFig,
  } = useContext(UserContext);
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
      // console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };
  const loginData = fetchToken();
  const userRole = fetchToken()?.user_role;
  const [selectedPhases, setSelectedPhases] = useState([
    "Phase IV Year (23-24, 24-25, 25-26)",
  ]);
  const [dcselectedState, setDcselectedState] = useState("");
  const [dcselectedDistrict, setDcselectedDistrict] = useState({});
  const [stateTableLoading, setStateTableLoading] = useState(false);
  const [dcbreadData, setDcBreadData] = useState([{ name: "SPWiseDetail" }]);
  const [dcLevel, setDcLevel] = useState(1);
  const [sptableData, setSptableData] = useState();
  const [dcFigtableData, setDcFigtableData] = useState([]);
  const [dcFarmerTable, setDcFarmerTable] = useState([]);
  const [open, setOpen] = useState();
  const [dcFarmerFormDetails, setDcFarmerFormDetails] = useState();
  const [lrpTableData, setLRPTableData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        });
        let data = response?.data.data;
        setDcselectedState(data.State);
        setDcselectedDistrict({ name: data.District[0] });
      } catch (error) {
        enqueueSnackbar(error || "Server Error", {
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

  const [phaseDropDown, SetPhaseDropDown] = useState([]);
  const [StateDropDown, SetStateDropDown] = useState([]);

  const [phaseFlag, setPhaseFlag] = useState(false);
  const [mainMapCard, setMainMapCard] = useState([]);
  const [fpoDetailTblData, setFpoDetailTblData] = useState([]);
  const [figfpoDetail, setFigfpoDetail] = useState("SPWiseDetail");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };

  const dcmapArray = [
    {
      label: "Total Area (Ha)",
      value: mainMapCard?.totalLandArea || 0,
      isLink: false,
    },
    {
      label: "Total FPOs",
      value: mainMapCard?.totalFpos || 0,
      isLink: dcselectedDistrict ? true : false,
    },
    {
      label: "Total LRPs",
      value: mainMapCard?.totalLrps || 0,
      isLink: dcselectedDistrict ? true : true,
    },
    { label: "Total FIGs", value: mainMapCard?.totalFigs || 0, isLink: true },
    {
      label: "Total no. of Farmers",
      value: mainMapCard?.totalFarmer || 0,
      isLink: false,
    },
    {
      label: "Total Production (MT.)",
      value: mainMapCard?.totalCropProduction || 0,
      isLink: false,
    },
  ];
  const changeBreadcrumWithStates = (data, type) => {
    if (type === 0) {
      setDcBreadData((prev) => [...prev, data]);
    } else {
      setDcBreadData((prev) => [...prev, data]);
    }
  };
  const handleClickParent = (row) => {
    setStartDate(null);
    setEndDate(null);
    setStatus("");
    if (dcLevel === 0) {
      setDcLevel(1);

      changeBreadcrumWithStates({ ...row, name: "SPWiseDetail" }, 0);
    } else if (dcLevel === 1) {
      setDcLevel(2);
      changeBreadcrumWithStates({ ...row, name: row.userName }, 1);

      // fetchAllFpo({ spId: row.spId });
      if (dcselectedDistrict.name === "All") {
        fetchAllFpo({ spId: row.spId });
      } else {
        fetchAllFpo({ spId: row.spId, DistrictName: dcselectedDistrict?.name });
      }
    } else if (dcLevel === 2) {
      setDcLevel(3);
      changeBreadcrumWithStates({ ...row, name: row.Name }, 2);

      fetchAllFig(row);
    } else if (dcLevel === 3) {
      changeBreadcrumWithStates({ ...row, name: row.Name }, 3);

      if (row.lrpName && !row.AllocatedDistrict) {
        setDcLevel(4);
        callFarmerApi({
          DistrictName: dcselectedDistrict.name,
          figId: row?.id,
        });
      } else if (row.AllocatedDistrict) {
        setFigfpoDetail("Total LRPs1");
        setDcLevel(3);
        fetchAllFig(row);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickFarmerOpen = (id) => {
    callFarmerApi({ farmerId: id });
    setOpen(true);
  };

  const fetchallSp = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/allSpList`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.data.status) {
        setSptableData(response.data.data.tableData);
        setMainMapCard(response.data.data);
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
  useEffect(() => {
    fetchallSp();
  }, []);
  const fetchAllFpo = async (data) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allfpolist`);
    const params = new URLSearchParams();

    // Conditionally add parameters
    if (
      data.name !== "All" &&
      data.DistrictName !== "All" &&
      data.name !== "Fpo Detail" &&
      data.name !== "Total FPOs"
    ) {
      Object.keys(data).forEach((key) => {
        // Ensure both key and value are provided
        if (data[key] !== undefined && data[key] !== null) {
          params.append(key, data[key]);
        }
      });
    }

    // Append the parameters to the URL
    url.search = params;

    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.status === 200) {
        setFpoDetailTblData(response.data.data.tableData);
        setMainMapCard(response.data.data);
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

  const fetchAllFig = async (data) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allFigList`);

    if (data.id && !data.AllocatedDistrict) {
      url.searchParams.append("fpoId", data.id);
    } else if (data.AllocatedDistrict) {
      url.searchParams.append("lrpId", data.id);
    }

    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });

      if (response.status === 200) {
        setDcFigtableData(response.data.data);
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
  //allLrp
  const fetchLrpList = async (district) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allLrpList`);

    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.status === 200) {
        setLRPTableData(response.data.data);
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
  const callFarmerApi = async (body) => {
    await getNxtFig(
      body,
      (apiRes) => {
        let data = apiRes.data;

        if (data.message === "Farmer List") {
          setDcFarmerTable(data.data);
        } else if (data.message === "Farmer Details") {
          setDcFarmerFormDetails(data.data);
        }

        setStateTableLoading(false);
      },
      (apiErr) => {
        setStateTableLoading(false);
      }
    );
  };
  useEffect(() => {
    const spId = dcbreadData
      .filter((ele) => ele.spId !== undefined)
      .map((ele) => ele.spId);
    if (status && startDate && endDate) {
      if (dcselectedDistrict.name !== "All" && !spId.length > 0) {
        fetchAllFpo({
          status: status,
          startDate: new Date(startDate).toLocaleDateString("en-CA"),
          endDate: new Date(endDate).toLocaleDateString("en-CA"),
          // DistrictName: dcselectedDistrict.name,
        });
      } else if (dcselectedDistrict.name === "All" && spId.length > 0) {
        fetchAllFpo({
          status: status,
          startDate: new Date(startDate).toLocaleDateString("en-CA"),
          endDate: new Date(endDate).toLocaleDateString("en-CA"),
          spId: spId[0],
        });
      } else if (dcselectedDistrict.name != "All" && spId.length > 0) {
        fetchAllFpo({
          status: status,
          startDate: new Date(startDate).toLocaleDateString("en-CA"),
          endDate: new Date(endDate).toLocaleDateString("en-CA"),
          // DistrictName: dcselectedDistrict.name,
          spId: spId[0],
        });
      } else {
        fetchAllFpo({
          status: status,
          startDate: new Date(startDate).toLocaleDateString("en-CA"),
          endDate: new Date(endDate).toLocaleDateString("en-CA"),
        });
      }
    }
  }, [status, startDate, endDate, dcselectedDistrict]);
  // Handle changes for the date pickers
  const handleDateChange = (key, date) => {
    if (key === "startDate") {
      setStartDate(date);
    } else if (key === "endDate") {
      setEndDate(date);
    }
  };
  const handleStatusChange = (event) => {
    setStatus(event);
  };
  const handleLinkClick = (label) => {
    setStartDate(null);
    setEndDate(null);
    setStatus("");
    setFigfpoDetail(label);

    if (label === "Total FPOs" || label === "Fpo Detail") {
      setDcLevel(2);
      setDcBreadData([{ name: label }]);
      fetchAllFpo({ DistrictName: "All" });
    } else if (label === "Total FIGs" || label === "Fig Detail") {
      setDcLevel(3);
      fetchAllFig("row");
      setDcBreadData([{ name: label }]);
    } else if (label === "Total LRPs" || label === "Total LRPs1") {
      setDcLevel(3);
      fetchLrpList();
      setDcBreadData([{ name: label }]);
    } else if (label === "SPWiseDetail") {
      fetchallSp();
      setDcLevel(1);
      setDcBreadData([{ name: "SPWiseDetail" }]);
    }
  };
  const handleBreadcrum = (level, data) => {
    let newBread = dcbreadData.filter((_, i) => i <= level);
    setDcBreadData(newBread);
  };
  const handleBreadcrumbClick = (level, row) => {
    setStartDate(null);
    setEndDate(null);
    setStatus("");

    handleBreadcrum(level, row);

    if (level === 0) {
      if (figfpoDetail === "Total FPOs" || figfpoDetail === "Fpo Detail") {
        setStartDate(null);
        setEndDate(null);
        setStatus("");
        fetchAllFpo({ DistrictName: "All" });
        setDcLevel(2);
      } else if (
        figfpoDetail === "Total FIGs" ||
        figfpoDetail === "Fig Detail"
      ) {
        setDcLevel(3);
        fetchAllFig(row);
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setFigfpoDetail("Total LRPs");
        setDcLevel(3);

        fetchLrpList();
      } else if (figfpoDetail === "SPWiseDetail" || figfpoDetail === "SP") {
        setDcLevel(1);
        if (dcselectedDistrict.name !== "All") {
          fetchallSp({ DistrictName: "All" });
        }
      } else {
        setDcLevel(1);
        fetchallSp();
      }
    } else if (level === 1) {
      if (figfpoDetail === "Total FPOs" || figfpoDetail === "Fpo Detail") {
        setDcLevel(3);
        fetchAllFig(row);
      } else if (
        figfpoDetail === "Total FIGs" ||
        figfpoDetail === "Fig Detail"
      ) {
        setDcLevel(4);
        if (dcselectedDistrict.name !== "All") {
          callFarmerApi({
            DistrictName: dcselectedDistrict.name,
            figId: row?.id,
          });
        } else {
          callFarmerApi({
            figId: row?.id,
          });
        }
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setFigfpoDetail("Total LRPs1");
        setDcLevel(3);
        fetchAllFig(row);
      } else if (figfpoDetail === "SPWiseDetail" || figfpoDetail === "SP") {
        setDcLevel(2);

        if (dcselectedDistrict.name !== "All" && row.spId) {
          fetchAllFpo({
            DistrictName: dcselectedDistrict.name,
            spId: row.spId,
          });
        } else {
          fetchAllFpo(
            dcselectedDistrict.name !== "All"
              ? { DistrictName: dcselectedDistrict.name }
              : { spId: row.spId }
          );
        }
      } else {
        setDcLevel(2);
        fetchAllFpo(row.spId);
      }
    } else if (level === 2) {
      if (figfpoDetail === "Total FPOs" || figfpoDetail === "Fpo Detail") {
        setDcLevel(4);
        fetchAllFpo(row.spId);
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setDcLevel(4);
      } else {
        setDcLevel(3);
        fetchAllFig(row);
      }
    }
  };

  const UpdatedbreadData = dcbreadData.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClick(index, data)}
      style={{ cursor: "pointer", color: "#007bff" }}
    >
      {data.name}
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
            paddingLeft: "33px",
            marginTop: "-3rem",
          }}
          spacing={2}
        >
          <Grid item>
            <MultipleSelect
              label="Select Phase"
              items={phaseWiseArr}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              selectedItems={selectedPhases}
            />
          </Grid>
        </Grid>
      </Grid>

      <div className="map-container">
        <Grid container spacing={4} className="map-con">
          <Grid item lg={8} sm={12} xs={12} className="map-grid-item">
            <Map1
              selectedState={dcselectedState}
              selectedDistrict={dcselectedDistrict}
              districtList={[dcselectedDistrict.name]}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid item mb={1}>
                {dcselectedDistrict && (
                  <Card className="mapCardHeading">
                    District : {dcselectedDistrict.name}
                  </Card>
                )}
              </Grid>
              <Grid
                item
                mb={1}
                // height="50%"
                // display="flex"
                // justifyContent="end"
              >
                <img src={exportBtn} alt="exportBtn" />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <MapTableCard
                mapArray={dcmapArray}
                height="550px"
                handleLinkClick={handleLinkClick}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <DcHeader
              handleLinkClick={handleLinkClick}
              figfpoDetail={figfpoDetail}
            />
          </Grid>

          <Grid item lg={12} xs={12}>
            <DcTableContainer
              open={open}
              handleClickParent={handleClickParent}
              handleClickFarmerOpen={handleClickFarmerOpen}
              UpdatedbreadData={UpdatedbreadData}
              dcselectedDistrict={dcselectedDistrict}
              setMainMapCard={setMainMapCard}
              figfpoDetail={figfpoDetail}
              handleDateChange={handleDateChange}
              handleStatusChange={handleStatusChange}
              dcLevel={dcLevel}
              sptableData={sptableData}
              fpoDetailTblData={fpoDetailTblData}
              dcFigtableData={dcFigtableData}
              dcFarmerTable={dcFarmerTable}
              lrpTableData={lrpTableData}
              stateTableLoading={stateTableLoading}
              handleClose={handleClose}
              dcFarmerFormDetails={dcFarmerFormDetails}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
