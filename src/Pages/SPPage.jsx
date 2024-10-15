import axios from "axios";
import SecureLS from "secure-ls";
import Map1 from "../Home/MapContent/Map1";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import MapTableCard from "../Components/MapTableCard";
import FarmerForm from "../Components/Form/FarmerForm";
import SPHeader from "../Components/SPComponents/SPHeader";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import exportBtn from "../../src/assets/images/exportBtn.png";
import MultipleSelect from "../Components/Dropdown/MultiSelect";
import SPFromModal from "../Components/SPComponents/SPForms/SPFromModal";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import SPTableContainer from "../Components/SPComponents/SPTables/SPTableContainer";

const phaseWiseArr = [
  "Phase IV Year (2023-2024 to 2025-2026)",
  "Phase III Year (2020-2021 to 2022-2023)",
];

const SPPage = () => {
  const { getNxtFig, formListData, selectedDistrict, setDragAndDropEditData } =
    useContext(UserContext);
  const [labelA, setLabelA] = useState("");
  const [fpoLevel, setFpoLevel] = useState(0);
  const [farmerList, setFarmerList] = useState([]);
  const [figLeaders, setFigLeaders] = useState([]);
  const [editedId, setEditedId] = useState(0);
  const [phaseFlag, setPhaseFlag] = useState(false);
  const [mainMapCard, setMainMapCard] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [FormTableLevel, sectTableLevel] = useState(0);
  const [districtList, setDistrictList] = useState([]);
  const [fpoTableData, setFPOTableData] = useState([]);
  const [lrpTableData, setLRPTableData] = useState([]);
  const [figLeadersID, setFigLeadersID] = useState([]);
  const [errorsSpForm, setErrorsSpForm] = useState({});
  const [figFormOpen, setFigFormOpen] = useState(false);
  const [figTableData, setFigTableData] = useState([{}]);
  const [StateDropDown, SetStateDropDown] = useState([]);
  const [farmerDetails, setFarmerDetails] = useState([]);
  const [farmerFormOpen, setFarmerFormOpen] = useState(false);
  const [selectedMapState, setSelectedMapState] = useState("");
  const [breadData, setBreadData] = useState([{ name: "All" }]);
  const [breadDataForm, setBreadDataForm] = useState([{ name: "All" }]);
  const [selectedSPDistrict, setSelectedSPDistrict] = useState({
    name: "All",
  });
  const [selectedMapDistrict, setSelectedMapDistrict] = useState({
    name: "All",
  });
  const [selectedPhases, setSelectedPhases] = useState([
    "Phase IV Year (2023-2024 to 2025-2026)",
  ]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    if (formListData && formListData.length > 0) {
      setFigLeaders(
        formListData.map((farmer) => farmer.FigLeader || farmer.content)
      );
      // onEditFPOForm(idData, formListData);
      // setData(formListData);
      setFigLeadersID(formListData.map((farmer) => farmer?.id?.split("-")[1]));
    } else if (!editedId) {
      setFigLeaders([]);
      setFigLeadersID([]);
    }
  }, [formListData.length]);

  //Token data -----
  const navigate = useNavigate();
  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      ls.remove("authToken");
    }
    return token;
  };
  const loginData = fetchToken();
  const userRole = fetchToken()?.user_role;
  //Token data -----

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };

  //farmer form open
  const [farmerData, setFarmerData] = useState([]);
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
          setFarmerDetails(data.data);
        }
      },
      (apiErr) => {}
    );
  };
  const handleClickFarmerOpen = (id) => {
    setFarmerFormOpen(true);
    fetchFarmerDetails({ farmerId: id?.split("-")[1] });
  };
  const handleClickTableFarmerOpen = (id) => {
    setFarmerFormOpen(true);
    fetchFarmerDetails({ farmerId: id });
  };
  const handleClickFarmerClose = () => {
    setFarmerFormOpen(false);
    setFarmerDetails([]);
  };
  // map Side table card
  const handleLinkClick = (label) => {
    if (label === "Total FPOs") {
      setLabelA("Total FPOs");
      setFpoLevel(0);
      setBreadData([{ name: selectedSPDistrict.name }]);
      fetchFpoList({ DistrictName: selectedSPDistrict.name });
    } else if (label === "Total FIGs") {
      setLabelA("Total FIGs");
      setFpoLevel(1);
      fetchFigList();
      setBreadData([{ name: selectedSPDistrict?.name }]);
    } else if (label === "Total LRPs") {
      setFpoLevel(0);
      setLabelA("Total LRPs");
      setBreadData([{ name: selectedSPDistrict?.name }]);
      fetchLrpList({ DistrictName: selectedSPDistrict?.name });
    }
  };
  const mapArray = [
    {
      label: "Total Area (Ha)",
      value: mainMapCard?.totalLandArea || 0,
      isLink: false,
    },
    {
      label: "Total FPOs",
      value: mainMapCard?.totalFpos || 0,
      isLink: true,
    },
    {
      label: "Total LRPs",
      value: mainMapCard?.totalLrps || 0,
      isLink: selectedDistrict ? true : true,
    },
    {
      label: "Total FIGs",
      value: mainMapCard?.totalFigs || 0,
      isLink: selectedDistrict ? true : true,
    },
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
  // ----------------------------------------Get Apis
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
  useEffect(() => {
    if (selectedSPDistrict.name && labelA === "Total FIGs") {
      fetchFigList();
    }
  }, [selectedSPDistrict.name]);

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
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        autoHideDuration: 3000,
      });
    }
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
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        autoHideDuration: 3000,
      });
    }
  };
  // ----------------------------------------Get Apis

  //phaseWiseState
  useLayoutEffect(() => {
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
        setSelectedMapState(state);
        setSelectedSPDistrict({ name: "All" });
        setDistrictList(district);
        const updatedData = ["All", ...district];
        SetStateDropDown(updatedData);
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
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

  // ----------------------------------------------FPO Form
  //FPO Open modal
  const [FPOFormOpen, setFPOFormOpen] = useState(false);
  const [errorsFPOForm, setErrorsFPOForm] = useState({});
  const [status, setStatus] = useState("");
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
    board_of_directors: [],
    chairman_name: "",
    chairman_contact_number: "",
    office_address: "",
  });

  const validateFieldsFPO = (name, value) => {
    let isValid = true;
    let errorMsg = "";

    switch (name) {
      case "fpo_contact_number":
      case "ceo_contact_number":
        isValid = /^[6789]\d{9}$/.test(value);
        errorMsg = isValid
          ? ""
          : "Must be a valid 10-digit Indian phone number.";
        break;
      case "official_email_id":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMsg = isValid ? "" : "Invalid email format.";
        break;
      case "pin_code":
        isValid = /^\d{6}$/.test(value);
        errorMsg = isValid ? "" : "Must be a valid 6-digit PIN code.";
        break;
      default:
        break;
    }
    return { isValid, errorMsg };
  };

  useEffect(() => {
    if (!FPOFormData?.board_of_directors.length > 0) {
      setFPOFormData((prev) => ({
        ...prev,
        chairman_name: "",
        chairman_contact_number: "",
      }));
    }
  }, [FPOFormData?.board_of_directors]);

  const figLeaderContactNumber = React.useMemo(() => {
    const match = formListData.find(
      (data) => data.FigLeader === FPOFormData?.chairman_name
    );
    return match ? match.FigLeaderContact : null;
  }, [FPOFormData?.chairman_name]);

  React.useEffect(() => {
    setFPOFormData((prev) => ({
      ...prev,
      chairman_contact_number: figLeaderContactNumber,
    }));
  }, [figLeaderContactNumber]);

  useEffect(() => {
    if (FPOFormData?.district && !editedId) {
      setFPOFormData((prev) => ({
        ...prev,
        board_of_directors: [],
        chairman_contact_number: "",
      }));
    }
  }, [FPOFormData?.district, editedId]);

  const formFieldsFPO = [
    {
      label: "FPO Name",
      placeholder: "FPO Name",
      required: true,
      name: "fpo_name",
    },
    {
      label: "Registration number of FPO",
      placeholder: "Registration number of FPO",
      required: true,
      name: "registration_number_fpo",
    },
    ...(editedId
      ? [
          {
            label: "Date of registration",
            placeholder: "Date of registration",
            required: false,
            name: "date_of_registration",
            type: "date",
          },
        ]
      : []),
    {
      label: "District",
      placeholder: "Select District",
      required: true,
      name: "district",
      type: "dropdown",
      options: StateDropDown,
    },

    {
      label: "Block",
      placeholder: "Block",
      required: true,
      name: "block",
    },
    {
      label: "PIN code",
      placeholder: "PIN code",
      required: true,
      name: "pin_code",
      type: "number",
    },
    {
      label: "Landline Number",
      placeholder: "Landline Number",
      required: true,
      name: "fpo_contact_number",
      type: "number",
    },
    {
      label: "Official Email ID",
      placeholder: "Official Email ID",
      required: true,
      name: "official_email_id",
      type: "email",
    },
    {
      label: "CEO Name",
      placeholder: "CEO Name",
      required: true,
      name: "ceo_name",
    },
    {
      label: "CEO Contact Number",
      placeholder: "CEO Contact Number",
      required: true,
      name: "ceo_contact_number",
      type: "number",
    },
    {
      label: "Accountant Name",
      placeholder: "Accountant Name",
      required: false,
      name: "accountant_name",
    },
    {
      label: "Board of Directors* (First Mapped FIG to FPO)",
      placeholder: "Select Board of Directors",
      required: true,
      name: "board_of_directors",
      type: "multi-select",
      options: figLeaders || [],
    },
    {
      label: "Chairman Name",
      placeholder: "Select Chairman",
      required: true,
      name: "chairman_name",
      type: "dropdown",
      options: FPOFormData?.board_of_directors || [],
    },
    {
      label: "Chairman Contact Number",
      placeholder: "Chairman Contact Number",
      required: false,
      name: "chairman_contact_number",
      type: "number",
      disabled: true,
    },
    {
      label: "Office Address",
      placeholder: "Office Address",
      required: true,
      name: "office_address",
    },
  ];

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

  const handleCancelFPOForm = () => {
    resetFPPForm();
    setFPOFormData(existingDataFPO);
    setErrorsFPOForm({});
    setFPOFormOpen(false);
    setEditedId(0);
    setFigLeaders([]);
    setDragAndDropEditData([]);
  };

  const handleClickOpenFPOForm = () => {
    setFPOFormOpen(true);
  };

  const handleChangeFPOForm = (e, name) => {
    const value = e.target.value;
    const { errorMsg } = validateFieldsFPO(name, value);

    setFPOFormData((prev) => ({ ...prev, [name]: value }));
    setErrorsFPOForm((prev) => ({ ...prev, [name]: errorMsg }));
  };
  const handleSubmitFPOForm = (data) => {
    const newErrors = {};

    if (data === "Submit" || data === "Save") {
      formFieldsFPO.forEach((field) => {
        const fieldValue = FPOFormData[field.name];
        if (field.required) {
          const isString = typeof fieldValue === "string";
          const isArray = Array.isArray(fieldValue);
          if (!isString && !isArray) {
            newErrors[field.name] = "This field is required.";
          } else if (isString && fieldValue.trim() === "") {
            newErrors[field.name] = "This field is required.";
          } else if (isArray && fieldValue.length === 0) {
            newErrors[field.name] = "This field is required.";
          }
        }
      });
    }

    if (Object.keys(newErrors).length === 0) {
      const dataToSend = {
        Name: FPOFormData.fpo_name,
        Phase: "Phase IV",
        figId: figLeadersID,
        RegistrationNo: FPOFormData.registration_number_fpo,
        // State: selectedMapState,
        District: FPOFormData.district,
        Block: FPOFormData.block,
        Pincode: FPOFormData.pin_code,
        FpoContactNo: FPOFormData.fpo_contact_number,
        EmailId: FPOFormData.official_email_id,
        CeoName: FPOFormData.ceo_name,
        CeoContactNo: FPOFormData.ceo_contact_number,
        AccountName: FPOFormData.accountant_name,
        BoardOfDirector: FPOFormData.board_of_directors,
        ChairManName: FPOFormData.chairman_name,
        OfficeAddress: FPOFormData.office_address,
        chairman_contact_number: FPOFormData.chairman_contact_number,
        Status: data, // "Save" or "Submit"
        // Coordinates: coordinates,
      };
      if (editedId > 0) {
        dataToSend.fpoId = editedId;
      }
      axios
        .post(`${process.env.REACT_APP_API_URL_LOCAL}/createFPO`, dataToSend, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          fetchFpoList();
          setFpoLevel(0);
          setLabelA("Total FPOs");
          handleCancelFPOForm();
          enqueueSnackbar(response?.data?.message, {
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
          if (error?.response?.data?.message == "Please provide figId in Array")
            enqueueSnackbar("First Mapped FIG to FPO", {
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
    } else {
      setErrorsFPOForm(newErrors);
    }
  };

  const resetFPPForm = () => {
    setStatus("");
    setEditedId(0);
    sectTableLevel(0);
    setFPOFormData(existingDataFPO);
  };
  const [RejectReasonMessage, setRejectReasonMessage] = useState("");
  const [dataArray, setDataArray] = useState([]);
  let dataId = localStorage.getItem("id");
  useEffect(() => {
    onEditFPOForm(dataId, formListData);
  }, [formListData.length]);

  const onEditFPOForm = (id, data) => {
    setDataArray((prev) => ({ ...prev, ...data }));
    const matchedArray = [];

    for (let i = 0; i < dataArray?.length; i++) {
      const element = dataArray[i].FigLeader;
      matchedArray.push(element);
    }
    const item = fpoTableData.find((item) => item?.id == id);
    if (item) {
      console.log("ashish matched array darta", matchedArray);
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
        chairman_contact_number: item.ChairManContactNo || "",
        office_address: item.OfficeAddress || "",
        chairman_name: item.ChairManName || "",
        board_of_directors: matchedArray || [],
      }));
      setEditedId(id);
      setFPOFormOpen(true);
      setStatus(item.Status);
      setRejectReasonMessage(item?.RejectReason);
      const modifiedFigDetails = (item?.figDetails || []).map((fig) => ({
        ...fig,
        BoardOfDirector: item?.BoardOfDirector || [],
      }));
      setDragAndDropEditData(modifiedFigDetails);
    }
  };
  // ----------------------------------------------FPO Form

  // ----------------------------------------------FIG Form

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

  const { figVillageList, subDistricts } = React.useMemo(() => {
    const filteredData = villageList?.find(
      (data) => data.DistrictName === SPFormData?.district
    );
    return {
      figVillageList: filteredData?.VillageNames || [],
      subDistricts: filteredData?.SubDistrictNames || [],
    };
  }, [SPFormData?.district?.length, villageList?.length]);

  React.useEffect(() => {
    if (!formListData?.length) {
      setFigLeaders([]);
    }
  }, [formListData?.length]);

  useEffect(() => {
    if (!formListData.length > 0) {
      setSPFormData((prev) => ({
        ...prev,
        fig_leader: "",
      }));
    }
  }, [formListData.length]);

  //fig figLeaderContact No.
  const figLeaderContactNo = React.useMemo(() => {
    const farmer = formListData.find(
      (farmer) => farmer.content === SPFormData?.fig_leader
    );
    return farmer ? farmer.MobileNo : "";
  }, [SPFormData?.fig_leader, editedId]);

  const formFields = [
    {
      label: "FIG Name",
      placeholder: "FIG Name",
      required: true,
      name: "fig_name",
    },
    {
      label: "District",
      placeholder: "Select District",
      required: true,
      name: "district",
      type: "dropdown",
      options: StateDropDown,
    },
    {
      label: "Block Name",
      placeholder: "Block Name",
      required: true,
      name: "block_name",
      type: "dropdown",
      options: subDistricts,
    },
    {
      label: "Village",
      placeholder: "Village",
      required: true,
      name: "Village",
      type: "dropdown",
      options: figVillageList,
    },
    {
      label: "PIN Code",
      placeholder: "PIN Code",
      required: true,
      name: "pin_code",
      type: "number",
    },
    {
      label: "Farmer Count",
      placeholder: "Farmer Count",
      required: false,
      name: "farmer_count",
      type: "number",
      disabled: true,
    },

    ...(editedId
      ? [
          {
            label: "Created Date",
            placeholder: "Created Date",
            required: false,
            name: "created_date",
            type: "date",
          },
        ]
      : []),
    {
      label: "FIG Leader (First Mapped Farmer to FIG)",
      placeholder: "Select FIG Leader",
      required: true,
      name: "fig_leader",
      type: "dropdown",
      options: figLeaders,
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

  const handleClickFigFormOpen = () => {
    setFigFormOpen(true);
    fetchVillageList();
  };

  const handleCancelSpForm = () => {
    setSPFormData(existingData);
    setErrorsSpForm({});
    setFigFormOpen(false);
    setEditedId(0);
    setStatus("");
    setDragAndDropEditData([]);
  };

  const handleChangeSpForm = (e, name) => {
    setSPFormData({
      ...SPFormData,
      [name]: e.target.value,
    });
    setErrorsSpForm({
      ...errorsSpForm,
      [name]: !e.target.value.trim(),
    });
  };

  const handleSubmitSpForm = () => {
    const newErrors = {};
    formFields.forEach((field) => {
      const fieldValue = String(SPFormData[field?.name] || "");
      if (field?.required && !fieldValue.trim()) {
        newErrors[field.name] = true;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      const dataToSend = {
        FarmersId: figLeadersID,
        Phase: "Phase IV",
        Name: SPFormData.fig_name,
        BlockName: SPFormData.block_name,
        District: SPFormData.district,
        PinCode: SPFormData.pin_code,
        FigLeader: SPFormData.fig_leader,
        // created_date: SPFormData.created_date,
        VillageName: SPFormData.Village,
        FigLeaderContact: figLeaderContactNo,
      };
      if (editedId > 0) {
        dataToSend.figId = editedId;
      }
      axios
        .post(`${process.env.REACT_APP_API_URL_LOCAL}/createFig`, dataToSend, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFpoLevel(1);
          fetchFigList();
          setLabelA("Total FIGs");
          handleCancelSpForm();
          enqueueSnackbar(response?.data?.message, {
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
          // console.error("Error submitting data:", error);
        });
    } else {
      setErrorsSpForm(newErrors);
    }
  };

  //unlistedFarmers list
  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/unlistedFarmers?DistrictName=${SPFormData?.district}&SubDistrict=${SPFormData?.block_name}`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        });
        setFarmerList(response?.data.data);
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

    // Check if both district and block_name are available before making the request
    if (SPFormData?.district && SPFormData?.block_name) {
      fetchUser();
    }
  }, [SPFormData?.block_name]);

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
        Village: item.VillageName,
      }));
      setEditedId(id);
      fetchVillageList();
      setFigFormOpen(true);
      setStatus(item.FpoStatus);
      setDragAndDropEditData(item?.farmerDetails || []);
      setFigLeaders([item.FigLeader]);
    }
  };
  // ----------------------------------------------FIG Form

  //-----------------------------------------------LRP Form
  const [formFigList, setFormFigList] = useState([]);
  const [errorsLRPForm, setErrorsLRPForm] = useState({});
  const [lrpFormOpen, setLRPFormOpen] = useState(false);
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
      required: false,
      name: "fig_count",
      type: "number",
      disabled: true,
    },
    ...(editedId
      ? [
          {
            label: "Created Date",
            placeholder: "Created Date",
            required: true,
            name: "created_date",
            type: "date",
          },
        ]
      : []),
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
    {
      label: "Education Qualification",
      placeholder: "Education Qualification",
      required: true,
      name: "education_qualification",
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
    education_qualification: "",
  });

  const validateFields = (name, value) => {
    let isValid = true;
    let errorMsg = "";

    switch (name) {
      case "lrp_contact_number":
        // Validate Indian phone numbers
        isValid = /^[6789]\d{9}$/.test(value);
        errorMsg = isValid
          ? ""
          : "Must be a valid 10-digit Indian phone number.";
        break;
      case "official_email_id":
        // Validate email format
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMsg = isValid ? "" : "Invalid email format.";
        break;
      case "pin_code":
        // Validate 6-digit PIN code
        isValid = /^\d{6}$/.test(value);
        errorMsg = isValid ? "" : "Must be a valid 6-digit PIN code.";
        break;
      case "education_qualification":
        // Simple non-empty check for education qualification
        isValid = value.trim().length > 0;
        errorMsg = isValid ? "" : "Education qualification is required.";
        break;
      default:
        break;
    }
    return { isValid, errorMsg };
  };

  React.useMemo(() => {
    setLRPFormData((prev) => ({
      ...prev,
      fig_count: formListData.length,
    }));
  }, [formListData?.length]);

  const existingDataLRP = {
    fig_name: "",
    block_name: "",
    district: "",
    pin_code: "",
    farmer_count: "",
    created_date: "",
    fig_leader: "",
  };

  const handleClickLRPFormOpen = () => {
    setLRPFormOpen(true);
  };

  const handleCancelLRPForm = () => {
    setLRPFormData(existingDataLRP);
    setErrorsLRPForm({});
    setLRPFormOpen(false);
    sectTableLevel(0);
  };
  // const handleChangeLRPForm = (e, name) => {
  //   setLRPFormData({
  //     ...LRPFormData,
  //     [name]: e.target.value,
  //   });
  //   setErrorsLRPForm({
  //     ...errorsLRPForm,
  //     [name]: !e.target.value.trim(),
  //   });
  // };
  const handleChangeLRPForm = (e, name) => {
    const { value } = e.target;
    const { isValid, errorMsg } = validateFields(name, value);

    setLRPFormData({
      ...LRPFormData,
      [name]: value,
    });

    setErrorsLRPForm({
      ...errorsLRPForm,
      [name]: errorMsg,
    });
  };

  const handleSubmitLRPForm = () => {
    const newErrors = {};
    formFieldsLRP.forEach((field) => {
      const fieldValue = String(LRPFormData[field.name] || "");

      if (field.required && !fieldValue.trim()) {
        newErrors[field.name] = true;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      const dataToSend = {
        figId: figLeadersID,
        Name: LRPFormData.lrp_name,
        ContactNo: LRPFormData.lrp_contact_number,
        AllocatedDistrict: [LRPFormData.allocated_district],
        PinCode: LRPFormData.pin_code,
        Address: LRPFormData.lrp_address,
        fig_count: LRPFormData.fig_count,
        created_date: LRPFormData.created_date,
        Qualification: LRPFormData.education_qualification,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL_LOCAL}/createLrp`, dataToSend, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
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
            setFpoLevel(0);
            fetchLrpList();
            setLabelA("Total LRPs");
            handleCancelLRPForm();
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == "figId is required")
            enqueueSnackbar("Please First Mapped FIG to LRP", {
              variant: "warning",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
              iconVariant: "success",
              autoHideDuration: 2000,
            });
          // console.error("Error submitting data:", error);
        });
    } else {
      setErrorsLRPForm(newErrors);
    }
  };

  //unlistedFigs list
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const district =
          FPOFormData?.district || LRPFormData?.allocated_district;
        let url = `${process.env.REACT_APP_API_URL_LOCAL}/unlistedFigs?District=${district}`;

        if (FPOFormData?.district) {
          url += "&fpo=true";
        } else if (LRPFormData?.allocated_district) {
          url += "&lrp=true";
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        });

        if (response?.data?.data) {
          setFormFigList(response.data.data);
        } else {
          enqueueSnackbar("No data found", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 2000,
          });
        }
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || "Error fetching data",
          {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 2000,
          }
        );
      }
    };

    if (FPOFormData?.district || LRPFormData?.allocated_district) {
      fetchUser();
    }
  }, [FPOFormData?.district, LRPFormData?.allocated_district]);

  // ----------------------------------------------LRP Form
  //dropdown
  // const handleSpDistrict = (e) => {
  //   const districtName = e;
  //   setSelectedMapDistrict({ name: districtName });
  //   setSelectedSPDistrict({ name: districtName });
  //   setBreadData([{ name: districtName }]);

  //   if (districtName === "All") {
  //     if (labelA === "Total FIGs") {
  //       fetchFigList();
  //       setFpoLevel(1);
  //     } else {
  //       fetchFpoList({ DistrictName: districtName });
  //       fetchLrpList({ DistrictName: districtName });
  //       setFpoLevel(0);
  //     }
  //   } else if (labelA === "Total LRPs") {
  //     fetchFpoList({ DistrictName: districtName });
  //     fetchLrpList({ DistrictName: districtName });
  //     setFpoLevel(0);
  //   } else if (labelA === "Total FIGs") {
  //     setFpoLevel(1);
  //     fetchFigList();
  //   } else {
  //     fetchFpoList({ DistrictName: districtName });
  //     setFpoLevel(0);
  //   }
  // };
  const handleSpDistrict = (e) => {
    const districtName = e;
    setSelectedMapDistrict({ name: districtName });
    setSelectedSPDistrict({ name: districtName });
    setBreadData([{ name: districtName }]);

    if (districtName === "All") {
    } else if (labelA === "Total LRPs") {
      fetchFpoList({ DistrictName: districtName });
      fetchLrpList({ DistrictName: districtName });
      setFpoLevel(0);
    } else if (labelA === "Total FIGs") {
      setFpoLevel(1);
    } else {
      fetchFpoList({ DistrictName: districtName });
      setFpoLevel(0);
    }
  };
  //-----------------------------------------------table
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

  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
  };
  // const handleBreadcrumbClick = (level, row) => {
  //   handleBreadcrum(level, row);
  //   if (level === 0) {
  //     setFpoLevel(labelA === "Total FIGs" ? 1 : 0);
  //     fetchFpoList({ DistrictName: row.name });
  //   } else if (level === 1) {
  //     let fetchParams = {};
  //     if (labelA === "Total FIGs") {
  //       setFpoLevel(2);
  //       fetchParams = { fpoId: row.id };
  //     } else if (labelA === "Total LRPs") {
  //       setFpoLevel(1);
  //       fetchParams = { lrpId: row.id };
  //     } else {
  //       setFpoLevel(1);
  //       fetchParams = { fpoId: row.id };
  //     }
  //     fetchFigList(fetchParams);
  //   }
  //   setLRPTableData([]);
  // };
  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    if (level === 0) {
      setFpoLevel(labelA === "Total FIGs" ? 1 : 0);
      fetchFpoList({ DistrictName: row.name });
      if (labelA === "Total FIGs") {
        setFpoLevel(1);
        fetchFigList({ DistrictName: row.name });
      } else if (labelA === "Total LRPs") {
        setFpoLevel(0);
        fetchLrpList({ DistrictName: row.name });
      } else {
        setFpoLevel(0);
        // fetchFpoList({ DistrictName: row.name });
      }
    } else if (level === 1) {
      let fetchParams = {};
      if (labelA === "Total FIGs") {
        setFpoLevel(2);
        fetchParams = { fpoId: row.id };
      } else if (labelA === "Total LRPs") {
        setFpoLevel(1);
        fetchParams = { lrpId: row.id };
      } else {
        setFpoLevel(1);
        fetchParams = { fpoId: row.id };
      }
      fetchFigList(fetchParams);
    }
    setLRPTableData([]);
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
  //-----------------------------------------------table
  //-----------------------------------------------Form table

  const handleClickFormParent = (data) => {
    if (FormTableLevel == 0) {
      sectTableLevel(1);
      fetchFarmerDetails({ figId: data?.id?.split("-")[1] });
      changeBreadcrumWithStates({ ...data, name: data.Name }, 1);
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
  //-----------------------------------------------Form table

  // ----FIG Form Table
  const headCellsFIGForm = [
    { id: "id", label: "S.No" },
    { id: "FarmerCode", label: "Farmer Code" },
    { id: "FarmerName", label: "Farmer Name" },
    { id: "Area(Ha)", label: "Area (Ha)" },
    { id: "FullDetail", label: "Full Detail" },
  ];
  // ----LRP Form Table
  const headCellsLRPForm = [
    { id: "id", label: "S.No" },
    { id: "FIG", label: "FIG" },
    { id: "FIG Block", label: "FIG Block" },
    { id: "Farmer", label: "Farmer" },
    { id: "Created Date", label: "Created Date" },
  ];
  // ----LRP  Table
  const headCellsLRP = [
    {
      id: "id",
      label: "S.No",
    },
    {
      id: "LRP",
      label: "LRP",
    },
    {
      id: "Contact No",
      label: "Contact No",
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
  return (
    <React.Fragment>
      {/* SP Form */}
      <SPFromModal
        status={status}
        editedId={editedId}
        hideComponent={false}
        errors={errorsSpForm}
        formData={SPFormData}
        formFields={formFields}
        FIGformbuttonShow={true}
        figFormOpen={figFormOpen}
        DragDropList={farmerList}
        formListData={formListData}
        headCells={headCellsFIGForm}
        FormTableLevel={FormTableLevel}
        sectTableLevel={sectTableLevel}
        handleCancel={handleCancelSpForm}
        handleChange={handleChangeSpForm}
        handleSubmit={handleSubmitSpForm}
        DragDropNameList="Farmers Available"
        RejectReasonMessage={RejectReasonMessage}
        handleClickFarmerOpen={handleClickFarmerOpen}
      />
      {/* LRP Form */}
      <SPFromModal
        editedId={editedId}
        hideComponent={false}
        formData={LRPFormData}
        errors={errorsLRPForm}
        FIGformbuttonShow={false}
        formFields={formFieldsLRP}
        figFormOpen={lrpFormOpen}
        DragDropList={formFigList}
        formListData={formListData}
        farmerDetails={farmerData}
        headCells={headCellsLRPForm}
        FormTableLevel={FormTableLevel}
        sectTableLevel={sectTableLevel}
        DragDropNameList="FIGs Available"
        handleCancel={handleCancelLRPForm}
        handleChange={handleChangeLRPForm}
        handleSubmit={handleSubmitLRPForm}
        UpdatedFormbreadData={UpdatedFormbreadData}
        handleClickFarmerOpen={handleClickFarmerOpen}
        handleClickFormParent={handleClickFormParent}
        handleClickTableFarmerOpen={handleClickTableFarmerOpen}
      />
      {/* FPO Form */}
      <SPFromModal
        status={status}
        editedId={editedId}
        hideComponent={true}
        errors={errorsFPOForm}
        formData={FPOFormData}
        figFormOpen={FPOFormOpen}
        DragDropList={formFigList}
        formFields={formFieldsFPO}
        formListData={formListData}
        figTableData={figTableData}
        resetFPPForm={resetFPPForm}
        farmerDetails={farmerData}
        headCells={headCellsLRPForm}
        FormTableLevel={FormTableLevel}
        sectTableLevel={sectTableLevel}
        handleCancel={handleCancelFPOForm}
        handleChange={handleChangeFPOForm}
        handleSubmit={handleSubmitFPOForm}
        DragDropNameList="FIGs Available"
        RejectReasonMessage={RejectReasonMessage}
        handleClickFarmerOpen={handleClickFarmerOpen}
        handleClickFormParent={handleClickFormParent}
        handleClickTableFarmerOpen={handleClickTableFarmerOpen}
        onEditFPOForm={onEditFPOForm}
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
              label={"Districts"}
              items={StateDropDown}
              handleChange={(e) => handleSpDistrict(e)}
              selectedItem={selectedSPDistrict.name}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="map-container">
        <Grid container spacing={4} className="map-con">
          <Grid item lg={8} sm={12} xs={12} className="map-grid-item">
            <Map1
              selectedState={selectedMapState}
              selectedDistrict={selectedSPDistrict}
              districtList={districtList}
              LegendList={[]}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
              }}
              mb={1.299}
            >
              <Grid item lg={6} sm={6} xs={12}>
                <Card className="mapCardHeading">
                  District : {selectedSPDistrict.name}
                </Card>
              </Grid>
              <img src={exportBtn} alt="exportBtn" />
            </Grid>
            <Grid item xs={12}>
              <MapTableCard
                mapArray={mapArray}
                handleLinkClick={handleLinkClick}
                height="550px"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SPHeader
              labelA={labelA}
              handleClickOpenFPOForm={handleClickOpenFPOForm}
              handleClickLRPFormOpen={handleClickLRPFormOpen}
              handleClickFigFormOpen={handleClickFigFormOpen}
            />
          </Grid>
          {labelA === "Total LRPs" && fpoLevel === 0 ? (
            <Grid item lg={12} xs={12}>
              <SPTableContainer
                lrpTrue={false}
                data={lrpTableData}
                UpdatedbreadData={UpdatedbreadData}
                handleClickParent={handleClickParent}
                selectedDistrict={selectedSPDistrict}
                figTableData={figTableData}
                fpoLevel={fpoLevel}
                headCells={headCellsLRP}
                headCellsFigTable={headCellsFigTable}
                farmerData={farmerData}
                handleClickFarmerOpen={handleClickTableFarmerOpen}
                farmerFormOpen={farmerFormOpen}
                onEditFIGForm={onEditFIGForm}
                handleClickFarmerClose={handleClickFarmerClose}
              />
            </Grid>
          ) : (
            <Grid item lg={12} xs={12}>
              <SPTableContainer
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
                headCells={headCellsFPO}
                onEditFIGForm={onEditFIGForm}
                handleClickFarmerOpen={handleClickTableFarmerOpen}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default SPPage;
