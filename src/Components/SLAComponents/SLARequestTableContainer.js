import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Button, Card, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import FarmerForm from "../../Components/Form/FarmerForm";
import FarmerTable from "../../Components/JSComponents/FarmerTable";
import {
  LocalizationProvider,
  DatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SingleSelect from "../../Components/Dropdown/SingleSelect";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import SecureLS from "secure-ls";
import AutocompleteSelect from "../../Components/Dropdown/AutocompleteSelect";
import DcFpoTable from "../../Pages/DistrictCollector/DcFpoTable";
import DcFigTable from "../../Pages/DistrictCollector/DcFigTable";
import DcLrpTable from "../../Pages/DistrictCollector/DcLrpTable";
import SpTable from "../../Pages/DistrictCollector/SpTable";
import SLAFpoTable from "./SLAFpoTable";
import SLAFigTable from "./SLAFigTable";
// const headCellsDcFPO = [

//   { id: "id", label: "S.No" },
//   { id: "fpoName", label: "FPOs" },
//   { id: "figCount", label: "FIGs" },

//   { id: "area", label: "Area (Ha)" },
//   { id: "farmerCount", label: "Farmers" },
//   { id: "status", label: "Status" },
//   { id: "action", label: "Created Date" },
// ];
const headCellsDcFPO = [
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
export default function SLARequestTableContainer({
  sptableData,
  lrpTrue,
  spTrue,
  headCellsFigTable,
  onEditForm,
  onEditFIGForm,
  UpdatedbreadData,
  fpoDetailTblData,
  dcFigtableData,
  dcFarmerTable,
  handleClickFarmerOpen,
  stateTableLoading,
  handleClickParent,
  lrpTableData,
  dcselectedDistrict,
  startDate,
  endDate,
  status,
  figfpoDetail,

  dcLevel,
  handleClose,
  open,
  dcFarmerFormDetails,
  handleDateChange,
  handleStatusChange,
}) {
  const headCells = [
    { id: "id", label: "S.No" },
    { id: "figName", label: "FIG" },
    { id: "lrpName", label: "LRP" },
    { id: "figBlock", label: "FIG Block" },
    { id: "figLeader", label: "FIG Leader" },
    { id: "farmerCount", label: "Farmers" },
    { id: "createdDate", label: "Created Date" },
  ];
  return (
    <React.Fragment>
      <Grid container>
        <Grid item lg={12} sm={12} xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
            aria-label="breadcrumb"
          >
            {UpdatedbreadData}
          </Breadcrumbs>
        </Grid>

        {dcLevel === 1 && (
          <Grid item lg={12} sm={12} xs={12}>
            <SpTable
              data={sptableData}
              loading={stateTableLoading}
              handleClickParent={handleClickParent}
            />
          </Grid>
        )}
        {dcLevel === 2 && (
          <Grid item lg={12} sm={12} xs={12}>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Card
                    sx={{
                      height: "40px",
                      minWidth: {
                        xs: "70px",
                        sm: "120px",
                        md: "160px",
                        lg: "150px",
                      },
                      maxWidth: {
                        xs: "70px",
                        sm: "120px",
                        md: "160px",
                        lg: "160px",
                      },
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    elevation={6}
                  >
                    <DatePicker
                      // label="Start Date"
                      format="dd/MM/yyyy"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": {
                          borderRadius: "2px",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          padding: "-7px",
                          margin: "3px 7px",
                          backgroundColor: "var(--yellow, #FEBA55)",
                        },
                      }}
                      value={startDate}
                      onChange={(date) => handleDateChange("startDate", date)}
                    />
                  </Card>
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <Typography>TO</Typography>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Card
                    sx={{
                      height: "40px",
                      minWidth: {
                        xs: "90px",
                        sm: "120px",
                        md: "160px",
                        lg: "150px",
                      },
                      maxWidth: {
                        xs: "90px",
                        sm: "120px",
                        md: "160px",
                        lg: "160px",
                      },
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    elevation={6}
                  >
                    <DatePicker
                      // label="End Date"
                      format="dd/MM/yyyy"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": {
                          borderRadius: "2px",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          padding: "-7px",
                          margin: "3px 7px",
                          backgroundColor: "var(--yellow, #FEBA55)",
                        },
                      }}
                      value={endDate}
                      onChange={(date) => handleDateChange("endDate", date)}
                    />
                  </Card>
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <AutocompleteSelect
                  label={"Status"}
                  items={["All", "Pending", "Rejected", "Approved"]}
                  // handleChange={(e) => handleStatusChange(e)}
                  handleChange={handleStatusChange}
                  selectedItem={status}
                  size={"small"}
                />
              </Grid>
            </Grid>
            {fpoDetailTblData && (
              <>
                <SLAFpoTable
                  data={fpoDetailTblData}
                  lrpTrue={lrpTrue}
                  headCells={headCellsDcFPO}
                  onEditForm={onEditForm}
                  handleClickParent={handleClickParent}
                />
                {/* <DcFpoTable
                headCells={headCellsDcFPO}
                slaTrue={false}
                data={fpoDetailTblData}
                loading={stateTableLoading}
                handleClickParent={handleClickParent}
              /> */}
              </>
            )}
          </Grid>
        )}

        {dcLevel === 3 && (
          <>
            {figfpoDetail === "Total LRPs" ? (
              <Grid item lg={12} sm={12} xs={12}>
                <DcLrpTable
                  data={lrpTableData}
                  loading={stateTableLoading}
                  handleClickParent={handleClickParent}
                />
              </Grid>
            ) : (
              <Grid item lg={12} sm={12} xs={12}>
                <SLAFigTable
                  data={dcFigtableData}
                  onEditForm={onEditFIGForm}
                  headCells={headCellsFigTable}
                  handleClickParent={handleClickParent}
                  spTrue={spTrue}
                />
                {/* <DcFigTable
                  data={dcFigtableData}
                  headCells={headCells}
                  loading={stateTableLoading}
                  handleClickParent={handleClickParent}
                /> */}
              </Grid>
            )}
          </>
        )}
        {dcLevel === 4 && (
          <Grid item lg={12} sm={12} xs={12}>
            <FarmerTable
              data={dcFarmerTable}
              hideSpComponents={true}
              loading={stateTableLoading}
              handleClickFarmerOpen={handleClickFarmerOpen}
            />
          </Grid>
        )}
        {open && (
          <FarmerForm
            open={open}
            handleClose={handleClose}
            data={dcFarmerFormDetails}
          />
        )}
      </Grid>
    </React.Fragment>
  );
}
