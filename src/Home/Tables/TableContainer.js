import React, { useContext, useEffect, useState } from "react";
import StateTable from "./StateTable";
import { UserContext } from "../../context/UserContext";
import DistrictTable from "./DistrictTable";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FpoTable from "./FpoTable";
import { Link } from "react-router-dom";
import FigTable from "./FigTable";
import FarmerTable from "../../Components/JSComponents/FarmerTable";
import FarmerForm from "../../Components/Form/FarmerForm";
import "./TableContainer.css";
import SecureLS from "secure-ls";

export default function TableContainer({
  distData,
  setDistData,
  fpoData,
  setFpoData,
  figData,
  setFigData,
  farmerData,
  setFarmerData,
  farmerDetails,
  setFarmerDetails,
  tableData,
  handleCardData,
}) {
  const [open, setOpen] = useState(false);
  const {
    breadData,
    changeBreadcrumWithStates,
    handleBreadcrum,
    level,
    setLevel,
    getStateDist,
    getNxtFig,
    isAllow,
    selectedDistrict,
  } = useContext(UserContext);

  //Token data
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

  const [stateTableLoading, setStateTableLoading] = useState(false);

  //api

  //api

  const callApiWithQuery = async (param) => {
    await getStateDist(
      param,
      (apiRes) => {
        let data = apiRes.data.data;

        if (param.StateName) {
          setDistData(data.CollectiveData);
          handleCardData(data);
        } else if (param.DistrictName) {
          setFpoData(data.CollectiveData);
          handleCardData(data);
        }
        setStateTableLoading(false);
      },
      (apiErr) => {
        setStateTableLoading(false);
      }
    );
  };

  const callFarmerApi = async (body) => {
    await getNxtFig(
      body,
      (apiRes) => {
        let data = apiRes.data;
        if (data.message === "fig Details") {
          setFigData(data.data);
        } else if (data.message === "Farmer List") {
          setFarmerData(data.data);
        } else if (data.message === "Farmer Details") {
          setFarmerDetails(data.data);
        }
        setStateTableLoading(false);
      },
      (apiErr) => {
        setStateTableLoading(false);
      }
    );
  };

  const handleClickParent = (row) => {
    if (level === 0) {
      setLevel(1);
      changeBreadcrumWithStates({ ...row, name: row.StateName }, `${0}`);
      callApiWithQuery({
        StateName: row.StateName || row?.name,
        "phaseWise%5B0%5D": "Phase+IV",
      });
    } else if (level === 1) {
      setLevel(2);
      changeBreadcrumWithStates({ ...row, name: row.StateName }, `${0}`);
      callApiWithQuery({ StateName: row.StateName || row?.name });
    } else if (level === 2) {
      setLevel(3);
      changeBreadcrumWithStates({ ...row, name: row.DistrictName }, `${1}`);
      callApiWithQuery({ DistrictName: row.DistrictName });
    } else if (level === 3) {
      setLevel(4);
      changeBreadcrumWithStates({ ...row, name: row.fpoName }, `${2}`);
      callFarmerApi({ DistrictName: row?.DistrictName, fpoId: row?.fpoId });
    } else if (level === 4) {
      setLevel(5);
      changeBreadcrumWithStates({ ...row, name: row["tblFig.Name"] }, `${3}`);
      callFarmerApi({
        DistrictName: breadData[isAllow ? 2 : 1].name,
        figId: row["tblFig.id"],
      });
    }
  };

  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    if (!isAllow) {
      level = level + 1;
    }
    if (level === 0) {
      callApiWithQuery({
        StateName: row.StateName || row?.name,
        "phaseWise%5B0%5D": "Phase+IV",
      });
    } else if (level === 1) {
      callApiWithQuery({ StateName: row.StateName || row?.name });
    } else if (level === 2) {
      callApiWithQuery({ DistrictName: row.DistrictName });
    } else if (level === 3) {
      callFarmerApi({ DistrictName: row?.DistrictName, fpoId: row?.fpoId });
    } else if (level === 4) {
      callFarmerApi({
        DistrictName: breadData[isAllow ? 2 : 1].name,
        figId: row["tblFig.id"],
      });
    }

    setLevel(level + 1);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickFarmerOpen = (id) => {
    callFarmerApi({ farmerId: id });
    setOpen(true);
  };

  const UpdatedbreadData = breadData.map((data, index) => {
    return (
      <Link
        key="1"
        color="inherit"
        onClick={() => handleBreadcrumbClick(index, data)}
        style={{ cursor: "pointer" }}
      >
        {data.name === "All" ? "States" : data.name}
      </Link>
    );
  });
  return (
    <React.Fragment>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
        aria-label="breadcrumb"
      >
        {UpdatedbreadData}
      </Breadcrumbs>
      {level === 1 && (
        <StateTable
          data={[]}
          loading={stateTableLoading}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 2 && (
        <DistrictTable
          data={distData}
          loading={stateTableLoading}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 3 && (
        <FpoTable
          data={fpoData}
          loading={stateTableLoading}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 4 && (
        <FigTable
          data={figData}
          userRole={userRole}
          loading={stateTableLoading}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 5 && (
        <FarmerTable
          data={farmerData}
          hideSpComponents={true}
          loading={stateTableLoading}
          handleClickFarmerOpen={handleClickFarmerOpen}
        />
      )}

      <FarmerForm open={open} handleClose={handleClose} data={farmerDetails} />
    </React.Fragment>
  );
}
