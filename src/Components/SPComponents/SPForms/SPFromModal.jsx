import * as React from "react";
import "./spheader.css";
import SPFormTable from "./SPFormTable";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import FarmerTable from "../../JSComponents/FarmerTable";
import editForm from "../../../assets/images/editForm.png";
import resetIcon from "../../../assets/images/resetIcon.png";
import DragAndDropList from "../DragAndDrop/DragAndDropList";
import DialogContentText from "@mui/material/DialogContentText";
import DcFigTable from "../../../Pages/DistrictCollector/DcFigTable";
import {
  Box,
  Card,
  Grid,
  Select,
  Tooltip,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormControl,
  DialogTitle,
  ListItemText,
  FormHelperText,
} from "@mui/material";
export default function SPFromModal({
  errors,
  status,
  editedId,
  formData,
  headCells,
  formFields,
  figFormOpen,
  handleChange,
  handleSubmit,
  handleCancel,
  DragDropList,
  formListData,
  figTableData,
  resetFPPForm,
  hideComponent,
  farmerDetails,
  FormTableLevel,
  sectTableLevel,
  DragDropNameList,
  FIGformbuttonShow,
  RejectReasonMessage,
  handleClickFormParent,
  handleClickFarmerOpen,
  handleClickTableFarmerOpen,
  isSLAUser = false,
  spTrue,
  onEditFIGForm,
  onEditFPOForm,
}) {
  React.useEffect(() => {
    sectTableLevel(0);
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
            height: "60px",
            position: "relative",
          }}
          id="customized-dialog-title"
        >
          {hideComponent && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Reset Form">
                <img
                  src={resetIcon}
                  alt="Reset Icon"
                  onClick={resetFPPForm}
                  style={{ height: "35px", cursor: "pointer" }}
                />
              </Tooltip>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, textAlign: "center", color: "#d23a3a" }}>
            <span>{RejectReasonMessage}</span>
          </Box>

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
                <Grid container spacing={2} p={2} columnSpacing={7} mb={2}>
                  {formFields.map((field, index) => (
                    <Grid item lg={4} sm={6} xs={12} key={index}>
                      <Typography component="div" className="label-Form">
                        {field.label}
                        {field.required && <span>*</span>}
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!errors[field.name]}
                      >
                        {field.type === "multi-select" ? (
                          <Select
                            multiple
                            value={formData[field.name] || []}
                            onChange={(e) => handleChange(e, field.name)}
                            renderValue={(selected) => selected.join(", ")}
                            className="textfield-form"
                            sx={{
                              color: (formData[field.name] || []).length
                                ? "#000000"
                                : "#9f9f9f",
                            }}
                            disabled={
                              status === "Pending" || status === "Approved"
                            }
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
                          <Select
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            displayEmpty
                            className="textfield-form"
                            sx={{
                              color: formData[field.name]
                                ? "#000000"
                                : "#9f9f9f",
                            }}
                            disabled={
                              status === "Pending" || status === "Approved"
                            }
                          >
                            <MenuItem value="" disabled>
                              {field?.placeholder}
                            </MenuItem>
                            {field.options
                              ?.filter((option) => option !== "All")
                              .map((option, index) => (
                                <MenuItem key={index} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                          </Select>
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
                            disabled={true}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            variant="outlined"
                            type={field.type === "number" ? "phone" : "text"}
                            className="textfield-form"
                            disabled={
                              status === "Pending" ||
                              field.disabled ||
                              status === "Approved"
                            }
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
                  {FIGformbuttonShow ? (
                    editedId ? (
                      ""
                    ) : (
                      <Grid item lg={4} sm={6} xs={12}></Grid>
                    )
                  ) : (
                    <React.Fragment>
                      <Grid item lg={4} sm={6} xs={12}></Grid>
                    </React.Fragment>
                  )}

                  {hideComponent == false && (
                    <Grid
                      container
                      item
                      lg={4}
                      sm={12}
                      xs={12}
                      justifyContent={{ lg: "flex-end" }}
                      alignItems="center"
                    >
                      <Grid item lg={4} sm={2} xs={6}>
                        <MenuItem value="" disabled></MenuItem>
                        <Button
                          fullWidth
                          onClick={() => {
                            if (
                              editedId &&
                              (status === "Pending" || status === "Approved")
                            )
                              return;
                            handleSubmit();
                          }}
                          className="button-SP"
                          style={{
                            cursor:
                              editedId &&
                              (status === "Pending" || status === "Approved")
                                ? "not-allowed"
                                : "pointer",
                          }}
                          endIcon={
                            <img
                              src={editForm}
                              alt="Edit Note"
                              style={{ width: 15, height: 15, marginBottom: 5 }}
                            />
                          }
                          // disabled={
                          //   editedId &&
                          //   (status === "Pending" || status === "Approved")
                          // }
                        >
                          {editedId ? "Update" : "Create"}
                        </Button>
                        {editedId ? (
                          <spam className="spam-SP">
                            Last Updated - 19/06/2024
                          </spam>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  )}
                  {hideComponent && (
                    <Grid
                      item
                      lg={12}
                      sm={12}
                      xs={12}
                      display="flex"
                      justifyContent="center"
                      mt={2}
                    >
                      <Box sx={{ display: "flex", gap: 10 }}>
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
                        <Card
                          style={{
                            color: "#FAFAFA",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                          }}
                        >
                          {!status ||
                          status === "Processing" ||
                          status === "Rejected" ? (
                            <Button
                              style={{
                                height: "40px",
                                width: "170px",
                                color: "#43c17a",
                              }}
                              onClick={() => handleSubmit("Save")}
                            >
                              Save
                            </Button>
                          ) : null}
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
                          {!status && (
                            <Button
                              style={{
                                width: "170px",
                                height: "40px",
                                color: "#2f73fa",
                              }}
                              onClick={() => handleSubmit("Submit")}
                            >
                              Submit
                            </Button>
                          )}
                          {status == "Processing" && (
                            <Button
                              style={{
                                width: "170px",
                                height: "40px",
                                color: "#2f73fa",
                              }}
                              onClick={() => handleSubmit("Submit")}
                            >
                              Submit
                            </Button>
                          )}
                          {status == "Rejected" && (
                            <Button
                              style={{
                                width: "170px",
                                height: "40px",
                                color: "#2f73fa",
                              }}
                              onClick={() => handleSubmit("Submit")}
                            >
                              Submit
                            </Button>
                          )}
                        </Card>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Card>
            </Box>
            <Grid container spacing={2} pt={2}>
              {isSLAUser ? (
                <React.Fragment>
                  {FormTableLevel == 0 && (
                    <Grid item lg={12} sm={12} xs={12}>
                      <DcFigTable
                        data={figTableData}
                        headCells={headCells}
                        spTrue={spTrue}
                        onEditForm={onEditFIGForm}
                        DragDropNameList={DragDropNameList}
                        handleClickFarmerOpen={handleClickFarmerOpen}
                        handleClickFormParent={handleClickFormParent}
                      />
                    </Grid>
                  )}
                  {FormTableLevel == 1 && (
                    <Grid item lg={12} sm={12} xs={12}>
                      <FarmerTable
                        hideSpComponents={false}
                        data={farmerDetails || []}
                        handleClickFarmerOpen={handleClickTableFarmerOpen}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item lg={5.5} sm={6} xs={12}>
                    <Card
                      elevation={10}
                      sx={{
                        p: 2,
                        borderRadius: "13px",
                        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                        height: "704px",
                      }}
                    >
                      <DragAndDropList
                        status={status}
                        editedId={editedId}
                        formData={formData}
                        DragDropList={DragDropList}
                        DragDropNameList={DragDropNameList}
                        onEditFPOForm={onEditFPOForm}
                      />
                    </Card>
                  </Grid>

                  {FormTableLevel == 0 && (
                    <Grid item lg={6.5} sm={6} xs={12}>
                      <SPFormTable
                        data={formListData}
                        headCells={headCells}
                        DragDropNameList={DragDropNameList}
                        handleClickFarmerOpen={handleClickFarmerOpen}
                        handleClickFormParent={handleClickFormParent}
                      />
                    </Grid>
                  )}
                  {FormTableLevel == 1 && (
                    <Grid item lg={6.5} sm={6} xs={12}>
                      <FarmerTable
                        hideSpComponents={false}
                        data={farmerDetails || []}
                        handleClickFarmerOpen={handleClickTableFarmerOpen}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
