import axios from "axios";
import SecureLS from "secure-ls";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import MultipleSelect from "../Components/Dropdown/MultiSelect";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import SPAppraisalTable from "../Components/SPAppraisalComponents/SPAppraisalTable";
import SPAppraisalFormTable from "../Components/SPAppraisalComponents/SPAppraisalFormTable";

const phaseWiseArr = [
  "Phase IV Year (23-24, 24-25, 25-26)",
  "Phase III Year (20-21, 21-22, 22-23)",
];
const Home = () => {
  const [phaseFlag, setPhaseFlag] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [getActivity, setGetActivity] = useState([]);
  const [quarterWiseData, setQuarterWiseData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [activityTableData, setActivityTableData] = useState([]);
  const [openSPAppraisalForm, setOpenSPAppraisalForm] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("MOKOKCHUNG");
  const [selectedPhases, setSelectedPhases] = useState([
    "Phase IV Year (23-24, 24-25, 25-26)",
  ]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchData({
        year: selectedYear,
        district: selectedDistrict,
      });
    }
  }, [selectedDistrict]);

  const handleClickOpenSPAppraisalForm = () => {
    setOpenSPAppraisalForm(true);
    fetchData({
      year: selectedYear,
      district: selectedDistrict,
    });
  };

  const handleCloseSPAppraisalForm = () => {
    setOpenSPAppraisalForm(false);
    resetForm();
  };

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
  const userRole = fetchToken()?.user_role;
  const loginData = fetchToken();
  //Token data -----

  const handleSelectChange = (event) => {
    setSelectedDistrict(event);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event);
  };

  const fetchData = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/getactivity`,
        data,
        {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        }
      );
      setGetActivity(response.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      QuarterWiseData({ year: selectedYear });
    }
  }, [selectedYear]);

  const QuarterWiseData = async (data) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/quarter/view`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json",
        },
      });
      resetForm();
      setQuarterWiseData(response.data);
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
  const handleFileChange = (event) => {
    setFileUpload(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setFileUpload(null);
  };
  const resetForm = () => {
    setFileUpload(null);
    setGetActivity([]);
    setActivityTableData([]);
    setOpenSPAppraisalForm(false);
  };
  const handleInputChange = (e, activityId, field, activity, quarterId) => {
    const { value } = e.target;

    setActivityTableData((prevData) => {
      const existingEntryIndex = prevData.findIndex(
        (entry) =>
          entry.activity_id === activityId &&
          entry.activity === activity &&
          entry.quarter_id === quarterId
      );

      if (existingEntryIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[existingEntryIndex] = {
          ...updatedData[existingEntryIndex],
          [field]: value,
          quarter_id: quarterId,
        };
        return updatedData;
      } else {
        return [
          ...prevData,
          {
            activity_id: activityId,
            activity: activity,
            [field]: value,
            quarter_id: quarterId,
          },
        ];
      }
    });
  };
  const handleSubmitFPOForm = (status) => {
    const formData = new FormData();

    formData.append("tabledata", JSON.stringify(activityTableData));

    if (fileUpload) {
      formData.append("quarter_attachment", fileUpload);
    }

    formData.append("sp_district", "MOKOKCHUNG");
    formData.append("year", selectedYear);
    formData.append("quarter_status", status);

    axios
      .post(`${process.env.REACT_APP_API_URL_LOCAL}/create`, formData, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // resetForm();
        QuarterWiseData({ year: selectedYear });
        enqueueSnackbar(response?.data || "Server Error", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          autoHideDuration: 2000,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data || "Server Error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          autoHideDuration: 2000,
        });
      });
  };

  const onEditForm = (quarter) => {
    setOpenSPAppraisalForm(true);
    const item = getActivity?.find((item) => item.quarter_name === quarter);
    fetchData({
      quarter_name: quarter,
      year: selectedYear,
      district: selectedDistrict,
    });
    // setGetActivity([item]);
    if (item) {
      const { tabledata } = item;
      if (Array.isArray(tabledata) && tabledata.length > 0) {
        setActivityTableData(
          tabledata.map((data) => ({
            activity_id: data.activity_id,
            activity: data.activity,
            startDate: data.startDate ? formatDate(data.startDate) : null,
            dueDate: data.dueDate ? formatDate(data.dueDate) : null,
            status: data.status || "Pending",
            remark: data.remarks || "",
            quarter_id: data.quarter_id,
          }))
        );
      } else {
        setActivityTableData([]);
      }
    } else {
      setActivityTableData([]);
    }

    setOpenSPAppraisalForm(true);
  };
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };
  const headCells = [
    { id: "id", label: "S.No" },
    { id: "Activity", label: "Activity" },
    { id: "Start Date - Due Date", label: "Start Date - Due Date" },
    { id: "Status", label: "Status" },
    { id: "Remarks", label: "Remarks" },
    // { id: "Attachment", label: "Attachment" },
  ];
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
          <Grid item>
            <AutocompleteSelect
              label={"Select Year"}
              items={["2023-2024", "2024-2025", "2025-2026"]}
              handleChange={handleYearChange}
              selectedItem={selectedYear}
            />
          </Grid>
        </Grid>
      </Grid>
      <SPAppraisalFormTable
        data={getActivity}
        loading={false}
        userRole={userRole}
        headCells={headCells}
        fileUpload={fileUpload}
        handleChange={handleChange}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
        selectedDistrict={selectedDistrict}
        handleInputChange={handleInputChange}
        activityTableData={activityTableData}
        handleSelectChange={handleSelectChange}
        handleSubmitFPOForm={handleSubmitFPOForm}
        openSPAppraisalForm={openSPAppraisalForm}
        handleCloseSPAppraisalForm={handleCloseSPAppraisalForm}
      />
      <div className="map-container">
        <Grid container spacing={4} className="map-con">
          <Grid item lg={12} xs={12} sm={12}>
            <SPAppraisalTable
              loading={false}
              userRole={userRole}
              data={quarterWiseData}
              onEditForm={onEditForm}
              handleClickOpenSPAppraisalForm={handleClickOpenSPAppraisalForm}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default Home;
