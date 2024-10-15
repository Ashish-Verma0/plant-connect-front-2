import * as React from "react";
// import "./spheader.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
// import editForm from "../../assets/images/editForm.png";
// import resetIcon from "../../assets/images/resetIcon.png";
import DialogContentText from "@mui/material/DialogContentText";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Card,
  Grid,
  Select,
  // Tooltip,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormControl,
  DialogTitle,
  ListItemText,
  FormHelperText,
  Breadcrumbs,
} from "@mui/material";
import DcFigTable from "../../Pages/DistrictCollector/DcFigTable";
import FarmerTable from "../JSComponents/FarmerTable";
export default function SLAFromModal({
  rejectMessage,
  rejectErrors,
  setRejectMessage,
  errors,
  // status,
  editedId,
  formData,
  headCells,
  formFields,
  figFormOpen,
  handleChange,
  handleSubmit,
  handleCancel,
  formListData,
  figTableData,
  farmerDetails,
  FormTableLevel,
  setFormTableLevel,
  DragDropNameList,
  handleClickFormParent,
  handleClickFarmerOpen,
  handleClickTableFarmerOpen,
  isSLAUser = false,
  spTrue,
  onEditFIGForm,
  UpdatedbreadDataFIG,
}) {
  React.useEffect(() => {
    setFormTableLevel(0);
  }, [formListData.length]);
  return (
    <React.Fragment>
      <Dialog
        open={figFormOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
        PaperProps={{ style: { borderRadius: "12px" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            height: "60px",
          }}
          id="customized-dialog-title"
        >
          {/* {hideComponent && (
            <Tooltip title="Reset Form">
              <img
                src={resetIcon}
                alt="Reset Icon"
                onClick={resetFPPForm}
                style={{ height: "35px", cursor: "pointer" }}
              />
            </Tooltip>
          )} */}
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box component="form" noValidate autoComplete="off">
              <Card
                style={{
                  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                  borderRadius: "12px",
                }}
              >
                <Grid container spacing={2} p={2}>
                  {formFields.map((field, index) => (
                    <Grid item lg={4} sm={6} xs={12} key={index}>
                      <Typography component="div" className="label-Form">
                        {field.label}
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!errors[field.name]}
                      >
                        {field.type === "multi-select" ? (
                          <Select
                            multiple
                            value={formData[field.name] || []} // Default to an empty array
                            onChange={(e) => handleChange(e, field.name)}
                            renderValue={(selected) => selected.join(", ")}
                            className="textfield-form"
                            sx={{
                              color: (formData[field.name] || []).length
                                ? "#000000"
                                : "#9f9f9f",
                            }}
                          >
                            {field.options.map((option, i) => (
                              <MenuItem key={i} value={option}>
                                <Checkbox
                                  checked={
                                    (formData[field.name] || []).indexOf(
                                      option
                                    ) > -1
                                  }
                                  sx={{
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                  }}
                                />
                                <ListItemText primary={option} />
                              </MenuItem>
                            ))}
                          </Select>
                        ) : field.type === "dropdown" ? (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            variant="outlined"
                            type={field.type === "number" ? "number" : "text"}
                            className="textfield-form"
                            disabled={field.disabled ? true : false}
                            inputProps={{ min: "0" }}
                          />
                        ) : field.type === "date" && editedId ? (
                          <TextField
                            fullWidth
                            size="small"
                            type="date"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            variant="outlined"
                            className="textfield-form"
                            sx={{
                              "& .MuiInputBase-root": {
                                color: "#808080",
                              },
                            }}
                            disabled={field.disabled ? true : false}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            variant="outlined"
                            type={field.type === "number" ? "number" : "text"}
                            className="textfield-form"
                            disabled={field.disabled ? true : false}
                            inputProps={{ min: "0" }}
                          />
                        )}
                        {errors[field.name] && (
                          <FormHelperText>
                            {field.label} is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ))}

                  <Grid
                    container
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isSLAUser && (
                      <>
                        <Grid
                          item
                          lg={12}
                          sm={12}
                          xs={12}
                          display="flex"
                          justifyContent="center"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: { xs: 2, sm: 4, md: 6 },
                              flexWrap: "wrap",
                            }}
                          >
                            <Card
                              style={{
                                color: "#FAFAFA",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                              }}
                            >
                              <Button
                                style={{
                                  height: "40px",
                                  width: "170px",
                                  // color: "#43c17a",
                                  color:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "#A9A9A9"
                                      : "#43c17a", // Gray if disabled, green if enabled
                                  backgroundColor:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "#E0E0E0"
                                      : "#FFFFFF", // Light gray background if disabled
                                  cursor:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "not-allowed"
                                      : "pointer", // Show not-allowed cursor if disabled
                                }}
                                disabled={
                                  formData.Status === "Approved" ||
                                  formData.Status === "Rejected"
                                } // Disable if status is Approved
                                onClick={(e) => handleSubmit("Approve")}
                              >
                                Approve
                              </Button>
                            </Card>

                            <Card
                              style={{
                                color: "#FAFAFA",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                              }}
                            >
                              <Button
                                style={{
                                  height: "40px",
                                  width: "170px",
                                  // color: "#A52B0E",
                                  color:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "#A9A9A9"
                                      : "#A52B0E", // Gray if disabled, red if enabled
                                  backgroundColor:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "#E0E0E0"
                                      : "#FFFFFF", // Light gray background if disabled
                                  cursor:
                                    formData.Status === "Approved" ||
                                    formData.Status === "Rejected"
                                      ? "not-allowed"
                                      : "pointer", // Show not-allowed cursor if disabled
                                }}
                                disabled={
                                  formData.Status === "Approved" ||
                                  formData.Status === "Rejected"
                                } // Disable if status is Approved
                                onClick={() => handleSubmit("Reject")}
                              >
                                Reject
                              </Button>
                            </Card>
                            <Card
                              style={{
                                color: "#FAFAFA",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                              }}
                            >
                              <Button
                                style={{
                                  height: "40px",
                                  width: "170px",
                                  color: "#A52B0E",
                                }}
                                onClick={handleCancel}
                              >
                                Cancel
                              </Button>
                            </Card>
                          </Box>
                        </Grid>
                        {formData.Status !== "Approved" &&
                          formData.Status !== "Rejected" && (
                            <TextField
                              error={!!rejectErrors.rejectMessage}
                              margin="dense"
                              multiline
                              rows={2}
                              label="Comment*"
                              placeholder="Write your comment here...."
                              fullWidth
                              helperText={rejectErrors.rejectMessage || " "}
                              value={rejectMessage}
                              sx={{ width: "100%" }}
                              onChange={(e) => setRejectMessage(e.target.value)}
                            />
                          )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Grid container spacing={2} pt={2}>
              {isSLAUser ? (
                <>
                  <Grid item lg={12} sm={12} xs={12}>
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      {UpdatedbreadDataFIG}
                    </Breadcrumbs>
                  </Grid>
                  {FormTableLevel === 0 && (
                    <Grid item lg={12} sm={12} xs={12}>
                      <DcFigTable
                        data={figTableData}
                        headCells={headCells}
                        spTrue={spTrue}
                        onEditForm={onEditFIGForm}
                        DragDropNameList={DragDropNameList}
                        handleClickFarmerOpen={handleClickFarmerOpen}
                        handleClickParent={handleClickFormParent}
                      />
                    </Grid>
                  )}
                  {FormTableLevel === 1 && (
                    <Grid item lg={12} sm={12} xs={12}>
                      <FarmerTable
                        hideSpComponents={false}
                        data={farmerDetails || []}
                        handleClickFarmerOpen={handleClickTableFarmerOpen}
                      />
                    </Grid>
                  )}
                </>
              ) : (
                <Grid item lg={12} sm={12} xs={12}>
                  <FarmerTable
                    hideSpComponents={false}
                    data={farmerDetails || []}
                    handleClickFarmerOpen={handleClickTableFarmerOpen}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
