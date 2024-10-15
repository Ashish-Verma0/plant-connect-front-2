import { Card, Grid } from "@mui/material";
import SecureLS from "secure-ls";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import MultipleSelect from "../../Components/Dropdown/MultiSelect";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../context/UserContext";
import Map1 from "../../Home/MapContent/Map1";
import MapTableCard from "../../Components/MapTableCard";
import exportBtn from "../../assets/images/exportBtn.png";
import { Link, useNavigate } from "react-router-dom";
import AutocompleteSelect from "../../Components/Dropdown/AutocompleteSelect";
import DcHeader from "../../Pages/DistrictCollector/DcHeader";
import SLARequestTableContainer from "./SLARequestTableContainer";
import SLAFromModal from "./SLAFromModal";
import FarmerForm from "../Form/FarmerForm";

const phaseWiseArr = [
  "Phase IV Year (23-24, 24-25, 25-26)",
  "Phase III Year (20-21, 21-22, 22-23)",
];

const headCellsFigTable = [
  { id: "id", label: "S.No" },
  { id: "figName", label: "FIG" },
  { id: "lrpName", label: "LRP" },
  { id: "figBlock", label: "FIG Block" },
  { id: "figLeader", label: "FIG Leader" },
  { id: "farmerCount", label: "Farmers" },
  { id: "createdDate", label: "Created Date" },
  { id: "Action", label: "Action" },
];

export default function SLADistrictCollector() {
  const { getNxtFig } = useContext(UserContext);
  const navigate = useNavigate();
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
  const [districtList, setDistrictList] = useState([]);
  const [farmerFormOpen, setFarmerFormOpen] = useState(false);

  const [dcselectedState, setDcselectedState] = useState("");
  const [dcselectedDistrict, setDcselectedDistrict] = useState({ name: "All" });
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
  const [figFormOpen, setFigFormOpen] = useState(false);

  const [figLeaders, setFigLeaders] = useState([]);
  const [breadDataFig, setBreadDataFig] = useState([]);
  const [FormTableLevel, setFormTableLevel] = useState(0);
  // ----------------------------------------------FPO Form
  const [errorsFPOForm, setErrorsFPOForm] = useState({});
  const [rejectMessage, setRejectMessage] = useState("");
  const [editedId, setEditedId] = useState(0);
  const [status, setStatus] = useState("");
  const [FPOFormOpen, setFPOFormOpen] = useState(false);
  const [rejectErrors, setRejectErrors] = useState({});
  const [errorsSpForm, setErrorsSpForm] = useState({});
  const [districtListWithAll, SetDistrictListWithAll] = useState([]);
  const [FPOFormData, setFPOFormData] = useState({
    fpo_name: "",
    registration_number_fpo: "",
    date_of_registration: "",
    district: "",
    block: "",
    pin_code: "",
    fpo_contact_number: "",
    official_email_id: "",
    ceo_name: "",
    ceo_contact_number: "",
    accountant_name: "",
    board_of_directors: "",
    chairman_name: "",
    chairman_contact_number: "",
    office_address: "",
  });
  const [SPFormData, setSPFormData] = useState({
    fig_name: "",
    block_name: "",
    district: "",
    pin_code: "",
    farmer_count: "",
    created_date: "",
    fig_leader: "",
    Village: "",
  });

  React.useMemo(() => {
    setFPOFormData((prev) => ({
      ...prev,
      chairman_name: prev?.board_of_directors,
    }));
  }, [FPOFormData?.board_of_directors]);
  const formFieldsFPO = [
    {
      label: "FPO Name",
      placeholder: "FPO Name",
      required: false,
      disabled: true,
      name: "fpo_name",
    },
    {
      label: "Registration number of FPO",
      placeholder: "Registration number of FPO",
      required: false,
      disabled: true,
      name: "registration_number_fpo",
    },
    ...(editedId
      ? [
          {
            label: "Date of registration",
            placeholder: "Date of registration",
            required: false,
            disabled: true,
            name: "date_of_registration",
            type: "date",
          },
        ]
      : []),
    {
      label: "District",
      placeholder: "Select District",
      required: false,
      disabled: true,
      name: "district",
      type: "dropdown",
      options: districtListWithAll,
    },
    {
      label: "Block",
      placeholder: "Block",
      required: false,
      disabled: true,
      name: "block",
    },
    {
      label: "PIN code",
      placeholder: "PIN code",
      required: false,
      disabled: true,
      name: "pin_code",
      type: "number",
    },
    {
      label: "Landline Number ",
      placeholder: "Landline Number ",
      required: false,
      disabled: true,
      name: "fpo_contact_number",
      type: "number",
    },
    {
      label: "Official Email ID",
      placeholder: "Official Email ID",
      required: false,
      disabled: true,
      name: "official_email_id",
      type: "email",
    },
    {
      label: "CEO Name",
      placeholder: "CEO Name",
      required: false,
      disabled: true,
      name: "ceo_name",
    },
    {
      label: "CEO Contact Number",
      placeholder: "CEO Contact Number",
      required: false,
      disabled: true,
      name: "ceo_contact_number",
      type: "number",
    },
    {
      label: "Accountant Name",
      placeholder: "Accountant Name",
      required: false,
      disabled: true,
      name: "accountant_name",
    },
    {
      label: "Board of Directors",
      placeholder: "Board of Directors",
      required: false,
      disabled: true,
      name: "board_of_directors",
      type: "dropdown",
      options: figLeaders,
    },
    {
      label: "Chairman Name",
      placeholder: "Chairman Name",
      required: false,
      disabled: true,
      name: "chairman_name",
    },

    {
      label: "Chairman Contact Number",
      placeholder: "Chairman_Contact_Number",
      required: false,
      disabled: true,
      name: "chairman_contact_number",
      type: "number",
    },
    // {
    //   label: "Chairman Contact Number",
    //   placeholder: "Chairman_Contact_Number",
    //   required: false,
    //   disabled: true,
    //   name: "Chairman_Contact_Number",
    //   type: "number",
    // },
    {
      label: "Office Address",
      placeholder: "Office Address",
      required: false,
      disabled: true,
      name: "office_address",
    },
  ];
  const formFieldsFIG = [
    {
      label: "FIG Name",
      placeholder: "FIG Name",
      required: false,
      disabled: true,
      name: "fig_name",
    },
    {
      label: "Block Name",
      placeholder: "Block Name",
      required: false,
      disabled: true,
      name: "block_name",
    },
    {
      label: "District",
      placeholder: "Select District",
      required: false,
      disabled: true,
      name: "district",
      type: "dropdown",
      options: districtListWithAll,
    },
    {
      label: "PIN Code",
      placeholder: "PIN Code",
      required: false,
      disabled: true,
      name: "pin_code",
      type: "number",
    },
    {
      label: "Farmer Count",
      placeholder: "Farmer Count",
      required: false,
      disabled: true,
      name: "farmer_count",
      type: "number",
    },

    ...(editedId
      ? [
          {
            label: "Created Date",
            placeholder: "Created Date",
            required: false,
            disabled: true,
            name: "created_date",
            type: "date",
          },
        ]
      : []),
    {
      label: "FIG Leader",
      placeholder: "Select FIG Leader",
      required: false,
      disabled: true,
      name: "fig_leader",
      type: "dropdown",
      options: figLeaders,
    },
    {
      label: "Village",
      placeholder: "Village",
      required: false,
      disabled: true,
      name: "Village",
      type: "dropdown",
      // options: figVillageList,
    },
  ];
  const existingData = {
    fig_name: "",
    block_name: "",
    district: "",
    pin_code: "",
    farmer_count: "",
    created_date: "",
    fig_leader: "",
  };

  const handleClickFarmerClose = () => {
    setFarmerFormOpen(false);
    // setFarmerDetails([]);
  };
  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });

      if (response.data.status) {
        // let data = response?.data.data;

        // Capitalize state and district names
        // const state = capitalize(data?.State || "");
        // const district = data?.District.map(capitalize);
        if (userRole === "DC") {
          let data = response?.data.data;

          const state = data?.State;
          const district = data?.District;
          setDistrictList(district);
          setDcselectedState(state);
          setDcselectedDistrict({ name: data.District[0] });
        } else {
          const data = response?.data.data;
          const district = data?.District;

          const state = data?.State;
          setDcselectedState(state);
          setDistrictList(district || []);
          const updatedData = ["All", ...district];
          SetDistrictListWithAll(updatedData);
          setDcselectedDistrict({ name: updatedData[0] });
        }
      } else {
        enqueueSnackbar(response?.data.message || "Server Error", {
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
    } catch (error) {
      if (error.response?.status === 401) {
        ls.removeAll();
        // setAuth(null);
        navigate("/login", { replace: true });
        localStorage.clear();
        localStorage.removeItem("authToken");
      } else {
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
    }
  };
  useLayoutEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    setDcBreadData([
      {
        name:
          dcselectedDistrict.name === "All"
            ? figfpoDetail
            : dcselectedDistrict.name,
      },
    ]);
  }, [dcselectedDistrict]);

  const [phaseDropDown, SetPhaseDropDown] = useState([]);

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
    if (data.name === "ALL") {
      setDcBreadData([{ name: data.name }]);
    } else {
      if (type === 0) {
        setDcBreadData((prev) => [...prev, data]);
      } else {
        setDcBreadData((prev) => [...prev, data]);
      }
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
        fetchAllFpo({ spId: row.spId, DistrictName: dcselectedDistrict.name });
      }

      // fetchAllFpo({ spId: row.spId });
    } else if (dcLevel === 2) {
      setDcLevel(3);
      changeBreadcrumWithStates({ ...row, name: row.Name }, 2);

      fetchFigList({ fpoId: row.id });
    } else if (dcLevel === 3) {
      changeBreadcrumWithStates({ ...row, name: row.Name }, 3);

      if (row.lrpName && !row.AllocatedDistrict) {
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
      } else if (row.AllocatedDistrict) {
        setFigfpoDetail("Total LRPs1");
        setDcLevel(3);
        fetchFigList({ lrpId: row.id });
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

  const fetchallSp = async (data) => {
    // const url = `${process.env.REACT_APP_API_URL_LOCAL}/allSpList`;
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allSpList`);
    if (data.name != "All") {
      url.searchParams.append(
        "DistrictName",
        data.name || dcselectedDistrict.name
      );
    }
    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.data.status) {
        setSptableData(response.data.data.tableData);
        setMainMapCard(response.data.data);
      } else {
        enqueueSnackbar(response?.data?.message || "Server Error", {
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
      // setFormFigList(response?.data.data);
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
    fetchallSp(dcselectedDistrict);
  }, []);
  //alfpolist api

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
        // setFPOTableData(response.data.data.tableData);
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
    const spId = dcbreadData
      .filter((ele) => ele.spId !== undefined)
      .map((ele) => ele.spId);

    if (status && startDate && endDate) {
      if (dcselectedDistrict.name !== "All" && !spId.length > 0) {
        fetchAllFpo({
          status: status,
          startDate: new Date(startDate).toLocaleDateString("en-CA"),
          endDate: new Date(endDate).toLocaleDateString("en-CA"),
          DistrictName: dcselectedDistrict.name,
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
          DistrictName: dcselectedDistrict.name,
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

  const handleClickFormParent = (data) => {
    if (dcLevel == 0) {
      setFormTableLevel(1);
      callFarmerApi({ figId: data.id });
      // fetchFarmerDetails({ figId: data?.id?.split("-")[1] });
      changeBreadcrumWithStates({ ...data, name: data.Name }, 1);
    }
  };
  const handleClickFormParentFIG = (data) => {
    if (FormTableLevel == 0) {
      setFormTableLevel(1);
      // fetchFigList();
      callFarmerApi({ figId: data.id });
      // fetchFarmerDetails({ figId: data?.id?.split("-")[1] });
      changeBreadcrumWithForModal({ ...data, name: data.Name }, 1);
    }
  };
  // Handle change for status
  const handleStatusChange = (event) => {
    setStatus(event);
  };
  //allfig
  const fetchFigList = async (data) => {
    try {
      const baseURL = `${process.env.REACT_APP_API_URL_LOCAL}/allFigList`;
      const params = new URLSearchParams();

      if (data && data.District !== "All") {
        Object.keys(data).forEach((key) => {
          params.append(key, data[key]);
        });
      }

      const url = `${baseURL}?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });

      setDcFigtableData(response?.data.data);
      // setFormFigList(response?.data.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      enqueueSnackbar(errorMessage, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        autoHideDuration: 3000,
      });
    }
  };
  //allLrp
  const fetchLrpList = async (district) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allLrpList`);
    if (district?.DistrictName !== "All") {
      url.searchParams.append("District", district?.DistrictName || "");
    }
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
  const handleSpDistrict = (e) => {
    const districtName = e;

    setDcselectedDistrict({ name: districtName });
    setDcBreadData([
      {
        name: districtName !== "All" ? districtName : figfpoDetail,
      },
    ]);
    if (
      figfpoDetail === "Total FPOs" ||
      (figfpoDetail === "Fpo Detail" && !status)
    ) {
      if (districtName === "All") {
        fetchAllFpo({ name: "All" });
        setDcLevel(2);
      } else {
        fetchAllFpo({ DistrictName: districtName || dcselectedDistrict.name });
        setDcLevel(2);
      }
    } else if (figfpoDetail === "Total FIGs" || figfpoDetail === "Fig Detail") {
      setDcLevel(3);
      fetchFigList({ District: districtName });
    } else if (
      figfpoDetail === "Total LRPs" ||
      figfpoDetail === "Total LRPs1"
    ) {
      setFigfpoDetail("Total LRPs");
      setDcLevel(3);
      if (districtName === "All") {
        fetchLrpList({ DistrictName: districtName });
      } else {
        fetchLrpList({ DistrictName: districtName });
      }

      // setFpoLevel(0);
    } else if (figfpoDetail === "SPWiseDetail" || figfpoDetail === "SP") {
      setDcLevel(1);
      fetchallSp({ name: districtName });
    }
  };

  const handleLinkClick = (label) => {
    setStartDate(null);
    setEndDate(null);
    setStatus("");
    setFigfpoDetail(label);
    if (label === "Total FPOs" || label === "Fpo Detail") {
      setDcLevel(2);
      setDcBreadData([
        {
          name:
            dcselectedDistrict.name != "All" ? dcselectedDistrict.name : label,
        },
      ]);
      fetchAllFpo({ DistrictName: dcselectedDistrict.name });
    } else if (label === "Total FIGs" || label === "Fig Detail") {
      setDcLevel(3);
      if (dcselectedDistrict.name != "All") {
        fetchFigList({ District: dcselectedDistrict.name });
      } else {
        fetchFigList({ District: "All" });
      }

      setDcBreadData([
        {
          name:
            dcselectedDistrict.name != "All" ? dcselectedDistrict.name : label,
        },
      ]);
    } else if (label === "Total LRPs" || label === "Total LRPs1") {
      setDcLevel(3);
      if (dcselectedDistrict.name !== "All") {
        fetchLrpList({ DistrictName: dcselectedDistrict.name });
      } else {
        fetchLrpList({ DistrictName: dcselectedDistrict.name });
      }

      setDcBreadData([
        {
          name:
            dcselectedDistrict.name != "All" ? dcselectedDistrict.name : label,
        },
      ]);
    } else if (label === "SPWiseDetail" || label === "SP") {
      fetchallSp(dcselectedDistrict);
      setDcLevel(1);
      setDcBreadData([
        {
          name:
            dcselectedDistrict.name != "All" ? dcselectedDistrict.name : label,
        },
      ]);
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
        fetchAllFpo(
          dcselectedDistrict.name != "All"
            ? { DistrictName: dcselectedDistrict.name }
            : row
        );

        setDcLevel(2);
      } else if (
        figfpoDetail === "Total FIGs" ||
        figfpoDetail === "Fig Detail"
      ) {
        setDcLevel(3);

        if (dcselectedDistrict.name != "All") {
          fetchFigList({ District: dcselectedDistrict.name });
        } else {
          fetchFigList({ District: "All" });
        }
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setFigfpoDetail("Total LRPs");
        setDcLevel(3);
        if (dcselectedDistrict.name !== "All") {
          fetchLrpList({ DistrictName: dcselectedDistrict.name });
        } else {
          fetchLrpList({ DistrictName: dcselectedDistrict.name });
        }
      } else if (figfpoDetail === "SPWiseDetail" || figfpoDetail === "SP") {
        setDcLevel(1);
        if (dcselectedDistrict.name === "All") {
          fetchallSp(dcselectedDistrict);
        } else {
          fetchallSp({ spId: row.spId });
        }
      }
    } else if (level === 1) {
      if (figfpoDetail === "Total FPOs" || figfpoDetail === "Fpo Detail") {
        setDcLevel(3);
        fetchFigList({ fpoId: row.id });
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
      } else if (figfpoDetail === "SPWiseDetail" || figfpoDetail === "SP") {
        setDcLevel(2);

        if (dcselectedDistrict.name != "All" && row.spId) {
          fetchAllFpo({
            DistrictName: dcselectedDistrict.name,
            spId: row.spId,
          });
        } else {
          fetchAllFpo(
            dcselectedDistrict.name != "All"
              ? { DistrictName: dcselectedDistrict.name }
              : { spId: row.spId }
          );
        }
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setDcLevel(3);
        fetchFigList({ lrpId: row.id });
      }
    } else if (level === 2) {
      if (figfpoDetail === "Total FPOs" || figfpoDetail === "Fpo Detail") {
        setDcLevel(4);
      } else if (
        figfpoDetail === "Total LRPs" ||
        figfpoDetail === "Total LRPs1"
      ) {
        setDcLevel(4);
      } else {
        setDcLevel(3);
        fetchFigList({ fpoId: row.id });
      }
    }
  };
  const changeBreadcrumWithForModal = (data, type) => {
    if (data.name === "ALL") {
      setBreadDataFig([{ name: data.name }]);
    } else {
      if (type === 0) {
        setBreadDataFig((prev) => [...prev, data]);
      } else {
        setBreadDataFig((prev) => [...prev, data]);
      }
    }
  };
  const handleBreadcrumModalFig = (level, data) => {
    let newBread = breadDataFig.filter((_, i) => i <= level);
    setBreadDataFig(newBread);
  };
  const handleBreadcrumbClickModalFig = (level, row) => {
    handleBreadcrumModalFig(level, row);
    if (level === 0) {
      setFormTableLevel(0);
      fetchFigList({ fpoId: row.id });
      // fetchFpoList({ DistrictName: "All" });
    } else if (level === 1) {
      setFormTableLevel(1);
      callFarmerApi({ figId: row.id }); // if (labelA === "Total FIGs") {
      //   setFormTableLevel(2);
      //   fetchFigList({ fpoId: row.id });
      // } else {
      //   setFormTableLevel(1);
      //   fetchFigList({ fpoId: row.id });
      // }
    }
  };
  const existingDataFPO = {
    fpo_name: "",
    registration_number_fpo: "",
    date_of_registration: "",
    district: "",
    block: "",
    pin_code: "",
    fpo_contact_number: "",
    official_email_id: "",
    ceo_name: "",
    ceo_contact_number: "",
    accountant_name: "",
    board_of_directors: "",
    chairman_name: "",
    chairman_contact_number: "",
    office_address: "",
  };
  const onEditFPOForm = (id) => {
    const item = fpoDetailTblData.find((item) => item?.id === id);

    if (item) {
      const dateOfRegistration = item.createdAt
        ? item.createdAt.split("T")[0]
        : "";

      setFPOFormData((prevFormData) => ({
        ...prevFormData,
        fpo_name: item.Name || "",
        registration_number_fpo: item.RegistrationNo || "",
        date_of_registration: dateOfRegistration,
        district: item.District || "",
        block: item.Block || "",
        pin_code: item.Pincode || "",
        fpo_contact_number: item.FpoContactNo || "",
        official_email_id: item.EmailId || "",
        ceo_name: item.CeoName || "",
        ceo_contact_number: item.CeoContactNo || "",
        accountant_name: item.AccountName || "",
        board_of_directors: item.BoardOfDirector || "",
        chairman_name: item.ChairManName || "",
        chairman_contact_number: item.ChairManContactNo || "7777",
        office_address: item.OfficeAddress || "",
        Status: item.Status || "",
      }));
      fetchFigList({ fpoId: id });
      // changeBreadcrumWithForModal({ ...item, name: item.Name }, 1);
      changeBreadcrumWithForModal({ ...item, name: item.Name }, 1);
      setEditedId(id);
      setFPOFormOpen(true);
      setStatus(item.Status);
    }
  };
  const resetFPPForm = () => {
    setStatus("");
    setEditedId(0);
    setBreadDataFig([]);
    setFormTableLevel(0);
    // setRejectEnabled(false);
    setFPOFormData(existingDataFPO);
  };
  const handleFPOFormClose = () => {
    setFPOFormOpen(false);
  };
  const handleCancelFPOForm = () => {
    resetFPPForm();
    setFPOFormData(existingDataFPO);
    setErrorsFPOForm({});
    handleFPOFormClose();
  };
  const handleChangeFPOForm = (e, name) => {
    setFPOFormData({
      ...FPOFormData,
      [name]: e.target.value,
    });
    setErrorsFPOForm({
      ...errorsFPOForm,
      [name]: !e.target.value.trim(),
    });
  };
  const handleSubmitFPOForm = (data) => {
    if (data === "Approve") {
      let dataToSend = { fpoId: editedId };
      axios
        .post(`${process.env.REACT_APP_API_URL_LOCAL}/approve`, dataToSend, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          handleFPOFormClose();
          setBreadDataFig([]);
          fetchAllFpo({ DistrictName: dcselectedDistrict.name });
          enqueueSnackbar(response?.data?.message || "Server Error", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
            iconVariant: "success",
            autoHideDuration: 2000,
          });
        })
        .catch((error) => {
          // console.error("Error submitting data:", error);
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
        });
    } else if (data === "Reject") {
      if (!rejectMessage.trim()) {
        setRejectErrors({ rejectMessage: "Reject message is required" });
        return;
      }
      if (rejectMessage) {
        let dataToSend = { fpoId: editedId, RejectionReason: rejectMessage };
        axios
          .post(`${process.env.REACT_APP_API_URL_LOCAL}/reject`, dataToSend, {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            handleFPOFormClose();
            setRejectErrors({});
            setRejectMessage("");
            setBreadDataFig([]);
            fetchAllFpo({ DistrictName: dcselectedDistrict.name });
            enqueueSnackbar(response?.data?.message || "Server Error", {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
              iconVariant: "success",
              autoHideDuration: 2000,
            });
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
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
          });
      }
    }
  };
  const onEditFIGForm = (id) => {
    const item = dcFigtableData.find((item) => item?.id === id);
    if (item) {
      const dateOfRegistration = item.createdAt
        ? item.createdAt.split("T")[0]
        : "";
      setSPFormData((prevFormData) => ({
        ...prevFormData,
        fig_name: item.Name || "",
        block_name: item.BlockName || "",
        district: item.District || "",
        pin_code: item.PinCode || "",
        farmer_count: item.farmerCount || "",
        created_date: dateOfRegistration || "",
        fig_leader: item.FigLeader || "",
        Village: item.VillageName || "",
        Status: item.Status,
      }));
      setEditedId(id);
      callFarmerApi({ figId: item.id });
      // fetchVillageList();
      setFigFormOpen(true);
      setStatus(item.FpoStatus);
      // setDragAndDropEditData(item?.farmerDetails || []);
    }
  };
  const handleClickTableFarmerOpen = (id) => {
    setFarmerFormOpen(true);
    callFarmerApi({ farmerId: id });
  };
  const handleCancelSpForm = () => {
    setSPFormData(existingData);
    setErrorsSpForm({});
    setFigFormOpen(false);
    setEditedId(0);
    setStatus("");
    // setDragAndDropEditData([]);
  };
  const UpdatedbreadDataFIG = breadDataFig.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClickModalFig(index, data)}
      style={{ cursor: "pointer", color: "#007bff" }}
    >
      {data.name}
    </Link>
  ));
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
      {/* FPO Form */}
      <SLAFromModal
        rejectMessage={rejectMessage}
        rejectErrors={rejectErrors}
        setRejectMessage={setRejectMessage}
        status={status}
        editedId={editedId}
        hideComponent={false}
        errors={errorsFPOForm}
        formData={FPOFormData}
        formFields={formFieldsFPO}
        figFormOpen={FPOFormOpen}
        setFormTableLevel={setFormTableLevel}
        isSLAUser={true}
        spTrue={true}
        UpdatedbreadDataFIG={UpdatedbreadDataFIG}
        headCells={headCellsFigTable}
        // DragDropList={formFigList}
        formListData={[]}
        figTableData={dcFigtableData}
        resetFPPForm={resetFPPForm}
        FormTableLevel={FormTableLevel}
        farmerDetails={dcFarmerTable}
        handleCancel={handleCancelFPOForm}
        handleChange={handleChangeFPOForm}
        handleSubmit={handleSubmitFPOForm}
        onEditFIGForm={onEditFIGForm}
        // rejectEnabled={rejectEnabled}
        DragDropNameList="FIGs Available"
        handleClickFarmerOpen={handleClickFarmerOpen}
        handleClickFormParent={handleClickFormParentFIG}
        handleClickTableFarmerOpen={handleClickTableFarmerOpen}
      />
      {/* FIG MODAL */}
      <SLAFromModal
        status={status}
        editedId={editedId}
        hideComponent={false}
        errors={errorsFPOForm}
        formData={SPFormData}
        formFields={formFieldsFIG}
        figFormOpen={figFormOpen}
        setFormTableLevel={setFormTableLevel}
        isSLAUser={false}
        spTrue={true}
        headCells={headCellsFigTable}
        // DragDropList={formFigList}
        formListData={[]}
        figTableData={dcFigtableData}
        resetFPPForm={resetFPPForm}
        FormTableLevel={FormTableLevel}
        farmerDetails={dcFarmerTable}
        handleCancel={handleCancelSpForm}
        handleChange={handleChangeFPOForm}
        handleSubmit={handleSubmitFPOForm}
        onEditFIGForm={onEditFIGForm}
        // rejectEnabled={rejectEnabled}
        DragDropNameList="FIGs Available"
        handleClickFarmerOpen={handleClickFarmerOpen}
        handleClickFormParent={handleClickFormParent}
        handleClickTableFarmerOpen={handleClickTableFarmerOpen}
      />
      <FarmerForm
        open={farmerFormOpen}
        handleClose={handleClickFarmerClose}
        data={dcFarmerFormDetails}
      />
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
          {userRole === "SLA" && (
            <Grid item>
              <AutocompleteSelect
                label={"Districts"}
                items={districtListWithAll}
                handleChange={(e) => handleSpDistrict(e)}
                selectedItem={dcselectedDistrict.name}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <div className="map-container">
        <Grid container spacing={4} className="map-con">
          <Grid item lg={8} sm={12} xs={12} className="map-grid-item">
            <Map1
              selectedState={dcselectedState}
              setDcselectedDistrict={setDcselectedDistrict}
              selectedDistrict={dcselectedDistrict}
              districtList={districtList}
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
            <SLARequestTableContainer
              lrpTrue={true}
              spTrue={true}
              headCellsFigTable={headCellsFigTable}
              open={open}
              onEditForm={onEditFPOForm}
              onEditFIGForm={onEditFIGForm}
              startDate={startDate}
              endDate={endDate}
              status={status}
              handleDateChange={handleDateChange}
              handleStatusChange={handleStatusChange}
              handleClickParent={handleClickParent}
              handleClickFarmerOpen={handleClickFarmerOpen}
              UpdatedbreadData={UpdatedbreadData}
              dcselectedDistrict={dcselectedDistrict}
              setMainMapCard={setMainMapCard}
              figfpoDetail={figfpoDetail}
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
