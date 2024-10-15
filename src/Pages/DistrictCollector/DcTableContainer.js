import React from "react";
// import { UserContext } from "../../context/UserContext";
import { Breadcrumbs, Button, Card, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { Link } from "react-router-dom";
import SpTable from "./SpTable";
import DcFigTable from "./DcFigTable";
import DcFpoTable from "./DcFpoTable";
import FarmerForm from "../../Components/Form/FarmerForm";
// import exportBtn from "../../assets/images/exportBtn.png";
import FarmerTable from "../../Components/JSComponents/FarmerTable";
// import FigDetailTbl from "./FigDetailTbl";
// import FpoDetailTbl from "./FpoDetailTbl";
import {
  LocalizationProvider,
  DatePicker,
  // MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import SingleSelect from "../../Components/Dropdown/SingleSelect";
// import axios from "axios";
// import { closeSnackbar, enqueueSnackbar } from "notistack";
// import CloseIcon from "@mui/icons-material/Close";
// import SecureLS from "secure-ls";
import DcLrpTable from "./DcLrpTable";
import AutocompleteSelect from "../../Components/Dropdown/AutocompleteSelect";
const headCellsDcFPO = [
  { id: "id", label: "S.No" },
  { id: "fpoName", label: "FPOs" },
  { id: "figCount", label: "FIGs" },

  { id: "area", label: "Area (Ha)" },
  { id: "farmerCount", label: "Farmers" },
  { id: "status", label: "Status" },
  { id: "action", label: "Created Date" },
];
export default function DcTableContainer({
  sptableData,
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
                marginBottom: "10px",
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
              <DcFpoTable
                headCells={headCellsDcFPO}
                slaTrue={false}
                data={fpoDetailTblData}
                loading={stateTableLoading}
                handleClickParent={handleClickParent}
              />
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
                {/* <Grid
                  container
                  spacing={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
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
                          // value={formState.commencementDate}
                          // onChange={(date) => handleDateChange("commencementDate", date)}
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
                          // value={formState.commencementDate}
                          // onChange={(date) => handleDateChange("commencementDate", date)}
                        />
                      </Card>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item>
                    <SingleSelect
                      label={"Status"}
                      items={[
                        "All",
                        "Pending",
                        "Resolved",
                        "Reject",
                        "Accepted",
                      ]}
                      // handleChange={handleStates}
                      selectedItem={"Open"}
                      size={"small"}
                    />
                  </Grid>
                </Grid> */}

                <DcFigTable
                  data={dcFigtableData}
                  headCells={headCells}
                  loading={stateTableLoading}
                  handleClickParent={handleClickParent}
                />
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
