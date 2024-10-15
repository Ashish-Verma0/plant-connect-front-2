import React, { useContext, useEffect, useState } from "react";
import SPPage from "./SPPage";
import { Grid } from "@mui/material";
import MultiSelect from "../Components/Dropdown/MultiSelect";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import FarmerForm from "../Components/Form/FarmerForm";
import SPFromModal from "../Components/SPComponents/SPForms/SPFromModal";
import SPHeader from "../Components/SPComponents/SPHeader";
import SPTableContainer from "../Components/SPComponents/SPTables/SPTableContainer";
import axios from "axios";
import SecureLS from "secure-ls";
import { Link } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import SLATableContainer from "../Components/SLAComponents/SLATableContainer";
import SLAFromModal from "../Components/SLAComponents/SLAFromModal";

const phaseWiseArr = [
  "Phase IV Year (2023-2024 to 2025-2026)",
  "Phase III Year (2020-2021 to 2022-2023)",
];
// ----FPO  Table
const headCellsFPO = [
  {
    id: "id",
    label: "S.No",
  },
  {
    id: "FPO",
    label: "FPO",
  },
  {
    id: "LRPs",
    label: "LRPs",
  },
  {
    id: "FIG",
    label: "FIG",
  },
  {
    id: "Farmers",
    label: "Farmers",
  },
  {
    id: "Created On",
    label: "Created On",
  },
  {
    id: "Status",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
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

export default function SLARequestApp() {
  const { getNxtFig } = useContext(UserContext);
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
  const [labelA, setLabelA] = useState("");

  const [breadDataForm, setBreadDataForm] = useState([{ name: "All" }]);
  const [breadDataFig, setBreadDataFig] = useState([]);

  const [fpoLevel, setFpoLevel] = useState(0);
  const [farmerFormOpen, setFarmerFormOpen] = useState(false);
  const [breadData, setBreadData] = useState([{ name: "All" }]);

  const [selectedPhases, setSelectedPhases] = useState([
    "Phase IV Year (2023-2024 to 2025-2026)",
  ]);
  const [StateDropDown, SetStateDropDown] = useState([]);
  const [selectedSPDistrict, setSelectedSPDistrict] = useState({
    name: "All",
  });
  const [farmerDetails, setFarmerDetails] = useState([]);

  const [districtList, setDistrictList] = useState([]);

  const [fpoTableData, setFPOTableData] = useState([]);
  const [errorsLRPForm, setErrorsLRPForm] = useState({});
  const [rejectErrors, setRejectErrors] = useState({});
  const [lrpFormOpen, setLRPFormOpen] = useState(false);
  const [formFigList, setFormFigList] = useState([]);
  const [formListData, setFormListData] = React.useState([]);
  const [farmerData, setFarmerData] = useState([]);
  const [FormTableLevel, setFormTableLevel] = useState(0);
  const [figTableData, setFigTableData] = useState([{}]);
  const [figLeaders, setFigLeaders] = useState([]);
  const [figLeadersID, setFigLeadersID] = useState([]);
  const [figFormOpen, setFigFormOpen] = useState(false);
  // ----------------------------------------------FPO Form
  const [errorsFPOForm, setErrorsFPOForm] = useState({});
  const [rejectMessage, setRejectMessage] = useState("");
  const [editedId, setEditedId] = useState(0);
  const [status, setStatus] = useState("");
  const [FPOFormOpen, setFPOFormOpen] = useState(false);
  const [villageList, setVillageList] = useState([]);
  // const [rejectEnabled, setRejectEnabled] = useState(false);
  const [errorsSpForm, setErrorsSpForm] = useState({});

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
      options: StateDropDown,
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
      options: StateDropDown,
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
  // ----LRP Form Table
  const headCellsLRPForm = [
    { id: "id", label: "S.No" },
    { id: "FIG", label: "FIG" },
    { id: "FIG Block", label: "FIG Block" },
    { id: "Farmer Count", label: "Farmer Count" },
    { id: "Created Date", label: "Created Date" },
  ];
  const formFieldsLRP = [
    {
      label: "LRP Name",
      placeholder: "LRP Name",
      required: true,
      name: "lrp_name",
    },
    {
      label: "Allocated District",
      placeholder: "Allocated District",
      required: true,
      name: "allocated_district",
      type: "dropdown",
      options: StateDropDown,
    },
    {
      label: "LRP Contact Number",
      placeholder: "LRP Contact Number",
      required: true,
      name: "lrp_contact_number",
      type: "number",
    },
    {
      label: "FIG Count",
      placeholder: "FIG Count",
      required: true,
      name: "fig_count",
      type: "number",
    },
    {
      label: "Created Date",
      placeholder: "Created Date",
      required: true,
      name: "created_date",
      type: "date",
    },
    {
      label: "LRP Address",
      placeholder: "LRP Address",
      required: true,
      name: "lrp_address",
    },
    {
      label: "PIN code",
      placeholder: "PIN code",
      required: true,
      name: "pin_code",
    },
  ];
  const [LRPFormData, setLRPFormData] = useState({
    lrp_name: "",
    allocated_district: "",
    lrp_contact_number: "",
    fig_count: "",
    created_date: "",
    lrp_address: "",
    pin_code: "",
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
  const existingDataLRP = {
    fig_name: "",
    block_name: "",
    district: "",
    pin_code: "",
    farmer_count: "",
    created_date: "",
    fig_leader: "",
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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };
  //dropdown
  const handleSpDistrict = (e) => {
    const districtName = e;
    // setSelectedMapDistrict({ name: districtName });
    setSelectedSPDistrict({ name: districtName });
    setBreadData([{ name: districtName }]);

    if (districtName === "All") {
      if (labelA === "Total FIGs") {
        fetchFigList();
        setFpoLevel(1);
      } else {
        fetchFpoList({ DistrictName: districtName });
        // fetchLrpList({ DistrictName: districtName });
        setFpoLevel(0);
      }
    } else if (labelA === "Total LRPs") {
      fetchFpoList({ DistrictName: districtName });
      fetchLrpList({ DistrictName: districtName });
      setFpoLevel(0);
    } else if (labelA === "Total FIGs") {
      setFpoLevel(1);
      fetchFigList();
    } else {
      fetchFpoList({ DistrictName: districtName });
      setFpoLevel(0);
    }
  };
  const handleFPOFormClose = () => {
    setFPOFormOpen(false);
  };
  const handleClickParent = (data) => {
    if (fpoLevel == 0) {
      setFpoLevel(1);
      if (data?.AllocatedDistrict) {
        fetchFigList({ lrpId: data.id });
      } else {
        fetchFigList({ fpoId: data.id });
      }
      changeBreadcrumWithStates({ ...data, name: data.Name }, 0);
    } else if (fpoLevel == 1) {
      setFpoLevel(2);
      const requestData = {
        figId: data?.id,
        ...(selectedSPDistrict?.name !== "All" && {
          DistrictName: selectedSPDistrict?.name,
        }),
      };

      fetchFarmerDetails(requestData);
      changeBreadcrumWithStates({ ...data, name: data.Name }, 1);
    }
  };
  const handleClickTableFarmerOpen = (id) => {
    setFarmerFormOpen(true);
    fetchFarmerDetails({ farmerId: id });
  };
  const handleClickFarmerClose = () => {
    setFarmerFormOpen(false);
    // setFarmerDetails([]);
  };
  const handleCancelLRPForm = () => {
    setLRPFormData(existingDataLRP);
    setErrorsLRPForm({});
    handleLRPFormClose();
    setFormTableLevel(0);
  };
  const handleLRPFormClose = () => {
    setLRPFormOpen(false);
  };

  const handleChangeLRPForm = (e, name) => {
    setLRPFormData({
      ...LRPFormData,
      [name]: e.target.value,
    });
    setErrorsLRPForm({
      ...errorsLRPForm,
      [name]: !e.target.value.trim(),
    });
  };

  const handleSubmitLRPForm = () => {
    const newErrors = {};
    formFieldsLRP.forEach((field) => {
      if (field.required && !LRPFormData[field.name]?.trim()) {
        newErrors[field.name] = true;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      const dataToSend = {
        Name: LRPFormData.lrp_name,
        ContactNo: LRPFormData.lrp_contact_number,
        AllocatedDistrict: LRPFormData.allocated_district,
        PinCode: LRPFormData.pin_code,
        Address: LRPFormData.lrp_address,
        fig_count: LRPFormData.fig_count,
        created_date: LRPFormData.created_date,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL_LOCAL}/createLrp`, dataToSend, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          handleLRPFormClose();
        })
        .catch((error) => {});
    } else {
      setErrorsLRPForm(newErrors);
    }
  };
  const handleClickFormParent = (data) => {
    if (fpoLevel == 0) {
      setFormTableLevel(1);
      fetchFarmerDetails({ figId: data.id });
      // fetchFarmerDetails({ figId: data?.id?.split("-")[1] });
      changeBreadcrumWithStates({ ...data, name: data.Name }, 1);
    }
  };
  const handleClickFormParentFIG = (data) => {
    if (FormTableLevel == 0) {
      setFormTableLevel(1);
      // fetchFigList();
      fetchFarmerDetails({ figId: data.id });
      // fetchFarmerDetails({ figId: data?.id?.split("-")[1] });
      changeBreadcrumWithForModal({ ...data, name: data.Name }, 1);
    }
  };
  const changeBreadcrumWithStates = (data, type) => {
    if (data.name === "ALL") {
      setBreadData([{ name: data.name }]);
    } else {
      if (type === 0) {
        setBreadData((prev) => [...prev, data]);
      } else {
        setBreadData((prev) => [...prev, data]);
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
  const handleFormBreadcrum = (level, data) => {
    let newBread = breadDataForm.filter((_, i) => i <= level);
    setBreadDataForm(newBread);
  };
  const handleBreadFormcrumbClick = (level, row) => {
    handleFormBreadcrum(level, row);
    if (level === 0) {
      setFpoLevel(0);
      fetchFpoList({ DistrictName: row.name });
    } else if (level === 1) {
      setFpoLevel(1);
      fetchFigList({ fpoId: row.id });
    }
  };
  const UpdatedFormbreadData = breadDataForm.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadFormcrumbClick(index, data)}
      style={{ cursor: "pointer", color: "#007bff" }}
    >
      {data.name === "All" ? "District" : data.name}
    </Link>
  ));
  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
  };
  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    if (level === 0) {
      setFpoLevel(0);
      fetchFpoList({ DistrictName: row.name });
    } else if (level === 1) {
      if (labelA === "Total FIGs") {
        setFpoLevel(2);
        fetchFigList({ fpoId: row.id });
      } else {
        setFpoLevel(1);
        fetchFigList({ fpoId: row.id });
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
    } else if (level === 1) {
      setFormTableLevel(1);
      fetchFarmerDetails({ figId: row.id }); // if (labelA === "Total FIGs") {
      //   setFormTableLevel(2);
      //   fetchFigList({ fpoId: row.id });
      // } else {
      //   setFormTableLevel(1);
      //   fetchFigList({ fpoId: row.id });
      // }
    }
  };
  const UpdatedbreadData = breadData.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClick(index, data)}
      style={{ cursor: "pointer", color: "#007bff" }}
    >
      {data.name === "All" ? "District" : data.name}
    </Link>
  ));
  //for Modal Fig
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
  //allfpo
  const fetchFpoList = async (district) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allfpolist`);
    if (district?.DistrictName != "All") {
      url.searchParams.append("DistrictName", district?.DistrictName || "");
    }
    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.status === 200) {
        setFPOTableData(response.data.data.tableData);
        // setMainMapCard(response.data.data);
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
  //allfpo
  const fetchLrpList = async (district) => {
    const url = new URL(`${process.env.REACT_APP_API_URL_LOCAL}/allLrpList`);
    if (district?.DistrictName != "All") {
      url.searchParams.append("District", district?.DistrictName || "");
    }
    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (response.status === 200) {
        // setLRPTableData(response.data.data);
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
  //allfig
  const fetchFigList = async (data) => {
    try {
      const baseURL = `${process.env.REACT_APP_API_URL_LOCAL}/allFigList`;
      const params = new URLSearchParams();

      if (selectedSPDistrict.name !== "All") {
        params.append("District", selectedSPDistrict.name);
      }
      if (data) {
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

      setFigTableData(response?.data.data);
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
  //phaseWiseState
  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        });
        const data = response?.data.data;
        const district = data?.District;
        const state = data?.State;
        // setSelectedMapState(state);
        setDistrictList(district);
        const updatedData = ["All", ...district];
        SetStateDropDown(updatedData);
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
    fetchFpoList({ DistrictName: "All" });
  }, []);
  const fetchFarmerDetails = (body) => {
    getNxtFig(
      body,
      (apiRes) => {
        const data = apiRes.data;
        if (data.message === "Farmer List") {
          setFarmerData(data.data);
        } else if (data.message === "Farmer Details") {
          setFarmerDetails(data.data);
        } else {
          // setFarmerDetails(data.data);
        }
      },
      (apiErr) => {}
    );
  };
  const handleClickFarmerOpen = (id) => {
    setFarmerFormOpen(true);
    fetchFarmerDetails({ farmerId: id?.split("-")[1] });
  };
  const onEditFPOForm = (id) => {
    const item = fpoTableData.find((item) => item?.id === id);

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
    const newErrors = {};
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
          fetchFpoList({ DistrictName: selectedSPDistrict.name });
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
            fetchFpoList({ DistrictName: selectedSPDistrict.name });
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
      }
    }

    // if (data === "Submit") {
    //   formFieldsFPO.forEach((field) => {
    //     if (field.required && !FPOFormData[field.name]?.trim()) {
    //       newErrors[field.name] = true;
    //     }
    //   });
    // }

    // if (Object.keys(newErrors).length === 0) {
    //   const dataToSend = {
    //     Name: FPOFormData.fpo_name,
    //     Phase: "Phase IV",
    //     figId: figLeadersID,
    //     RegistrationNo: FPOFormData.registration_number_fpo,
    //     State: "Nagaland",
    //     District: FPOFormData.district,
    //     Block: FPOFormData.block,
    //     Pincode: FPOFormData.pin_code,
    //     FpoContactNo: FPOFormData.fpo_contact_number,
    //     EmailId: FPOFormData.official_email_id,
    //     CeoName: FPOFormData.ceo_name,
    //     CeoContactNo: FPOFormData.ceo_contact_number,
    //     AccountName: FPOFormData.accountant_name,
    //     BoardOfDirector: [FPOFormData.board_of_directors],
    //     ChairManName: FPOFormData.chairman_name,
    //     OfficeAddress: FPOFormData.office_address,
    //     Status: data, // "Save" or "Submit"
    //   };
    //   if (editedId > 0) {
    //     dataToSend.id = editedId;
    //   }
    //   axios
    //     .post(`${process.env.REACT_APP_API_URL_LOCAL}/createFPO`, dataToSend, {
    //       headers: {
    //         Authorization: `Bearer ${loginData.token}`,
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((response) => {
    //       handleFPOFormClose();
    //       enqueueSnackbar(response?.data?.message, {
    //         variant: "success",
    //         anchorOrigin: {
    //           vertical: "bottom",
    //           horizontal: "left",
    //         },
    //         action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
    //         iconVariant: "success",
    //         autoHideDuration: 2000,
    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error submitting data:", error);
    //       enqueueSnackbar(error?.response?.data?.message || "Server Error", {
    //         variant: "warning",
    //         anchorOrigin: {
    //           vertical: "bottom",
    //           horizontal: "left",
    //         },
    //         action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
    //         iconVariant: "success",
    //         autoHideDuration: 2000,
    //       });
    //     });
    // } else {
    //   setErrorsFPOForm(newErrors);
    // }
  };
  const onEditFIGForm = (id) => {
    const item = figTableData.find((item) => item?.id === id);
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
      fetchFarmerDetails({ figId: item.id });
      // fetchVillageList();
      setFigFormOpen(true);
      setStatus(item.FpoStatus);
      // setDragAndDropEditData(item?.farmerDetails || []);
    }
  };
  const handleCancelSpForm = () => {
    setSPFormData(existingData);
    setErrorsSpForm({});
    setFigFormOpen(false);
    setEditedId(0);
    setStatus("");
    // setDragAndDropEditData([]);
  };
  const fetchVillageList = async () => {
    try {
      const baseURL = `${process.env.REACT_APP_API_URL_LOCAL}/getVillageName`;

      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      setVillageList(response?.data.data);
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
  return (
    <>
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
        DragDropList={formFigList}
        formListData={formListData}
        figTableData={figTableData}
        resetFPPForm={resetFPPForm}
        FormTableLevel={FormTableLevel}
        farmerDetails={farmerData}
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
        DragDropList={formFigList}
        formListData={formListData}
        figTableData={figTableData}
        resetFPPForm={resetFPPForm}
        FormTableLevel={FormTableLevel}
        farmerDetails={farmerData}
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
        data={farmerDetails}
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
            <MultiSelect
              label="Select Phase"
              items={phaseWiseArr}
              handleChange={handleChange}
              selectedItems={selectedPhases}
            />
          </Grid>
          <Grid item>
            <AutocompleteSelect
              label={"States"}
              items={StateDropDown}
              handleChange={(e) => handleSpDistrict(e)}
              selectedItem={selectedSPDistrict.name}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <SPHeader
          handleClickLRPFormOpen={handleClickLRPFormOpen}
          handleClickFigFormOpen={handleClickFigFormOpen}
        />
      </Grid> */}
      <Grid item lg={12} xs={12} p={4}>
        <SLATableContainer
          lrpTrue={true}
          spTrue={true}
          data={fpoTableData}
          headCellsFigTable={headCellsFigTable}
          UpdatedbreadData={UpdatedbreadData}
          handleClickParent={handleClickParent}
          selectedDistrict={selectedSPDistrict}
          figTableData={figTableData}
          fpoLevel={fpoLevel}
          farmerData={farmerData}
          onEditForm={onEditFPOForm}
          onEditFIGForm={onEditFIGForm}
          headCells={headCellsFPO}
          handleClickFarmerOpen={handleClickTableFarmerOpen}
        />
      </Grid>
    </>
  );
}
