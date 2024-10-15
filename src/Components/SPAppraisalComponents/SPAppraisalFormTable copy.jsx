import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DialogContentText from "@mui/material/DialogContentText";
import AutocompleteSelect from "../Dropdown/AutocompleteSelect";
import {
  Box,
  Grid,
  Card,
  Link,
  Select,
  Skeleton,
  MenuItem,
  Accordion,
  TextField,
  Typography,
  IconButton,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import "./SPAppraisal.css";
export default function SPAppraisalFormTable({
  data,
  loading,
  userRole,
  headCells,
  handleFileChange,
  selectedDistrict,
  handleInputChange,
  activityTableData,
  handleSelectChange,
  handleSubmitFPOForm,
  openSPAppraisalForm,
  handleCloseSPAppraisalForm,
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    // whiteSpace: "nowrap",
    minHeight: { xs: "400px", md: "400px", lg: "500px" },
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    [theme.breakpoints.down("sm")]: {
      padding: "4px",
      fontSize: "0.8rem",
    },
  }));
  const StyledTableContainer = styled(TableContainer)({
    borderRadius: 12,
    width: "100%",
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto",
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const filtered = data.filter((item) =>
        item.timeline?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredData(filtered);
      setPageIndex(0);
    }
  }, [search, data]);

  const renderSkeletonRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={index}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
            <Skeleton variant="text" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };
  const renderPlaceholderRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={`placeholder-${index}`}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
            &nbsp;
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };

  const field = {
    name: "fieldName",
    options: ["To be Initiated", "Inprogress", "Completed"],
  };

  return (
    <React.Fragment>
      <Dialog
        open={openSPAppraisalForm}
        onClose={handleCloseSPAppraisalForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          id="alert-dialog-title"
          flexDirection="row"
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
        >
          <AutocompleteSelect
            label={"Select Year"}
            items={["MOKOKCHUNG", "TUENSANG"]}
            handleChange={handleSelectChange}
            selectedItem={selectedDistrict}
          />
        </DialogTitle>
        <DialogContent>
          {data.map((categoryObj, index) => (
            <Accordion key={index} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  mb: 1,
                  margin: 0,
                  padding: "0px 15px 0px 15px",
                  fontSize: "18px",
                  fontWeight: 500,
                  width: "100%",
                  color: "grey",
                  lineHeight: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">
                    {categoryObj.quarter_name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton component="label">
                    <AttachFileIcon />
                    <input type="file" hidden onChange={handleFileChange} />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mb: 1,
                  padding: "0px 13px 0px 4px",
                  margin: 0,
                }}
              >
                <DialogContentText id="alert-dialog-description">
                  <Card style={{ borderRadius: "12px" }} elevation={6}>
                    <StyledTableContainer component={Paper}>
                      <Table aria-label="simple table" size={"medium"}>
                        <TableHead style={{ backgroundColor: "#43C17A" }}>
                          <TableRow>
                            {headCells.map((headCell, index) => (
                              <StyledTableCell
                                key={index}
                                style={{ color: "white", whiteSpace: "nowrap" }}
                                align="center"
                              >
                                {headCell.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            renderSkeletonRows(5)
                          ) : categoryObj.tabledata.length > 0 ? (
                            categoryObj.tabledata
                              .slice(
                                pageIndex * pageSize,
                                (pageIndex + 1) * pageSize
                              )
                              .map((row, ind) => {
                                const isEvenRow = ind % 2 === 1;
                                return (
                                  <StyledTableRow
                                    key={ind}
                                    sx={{
                                      backgroundColor: isEvenRow
                                        ? "#BEFCE8"
                                        : "transparent",
                                    }}
                                  >
                                    <StyledTableCell
                                      align="center"
                                      className="colorCodeTable"
                                    >
                                      {row.timeline}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      align="center"
                                      className="colorCodeTable"
                                      style={{ width: "35%" }}
                                    >
                                      {row.activity}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      align="center"
                                      className="colorCodeTable"
                                    >
                                      <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        variant="outlined"
                                        className="textfield-form"
                                        sx={{
                                          "& .MuiInputBase-root": {
                                            color: "#808080",
                                          },
                                        }}
                                        value={
                                          activityTableData.find(
                                            (entry) =>
                                              entry.activity_id ===
                                                row.activity_id &&
                                              entry.quarter ===
                                                categoryObj.quarter_name
                                          )?.date || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            row.activity_id,
                                            "date",
                                            categoryObj.quarter_name
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell
                                      align="center"
                                      className="colorCodeTable"
                                    >
                                      <Select
                                        displayEmpty
                                        className="textfield-form"
                                        sx={{
                                          color: "#808080",
                                          width: "150px",
                                          height: "25px",
                                        }}
                                        value={
                                          activityTableData.find(
                                            (entry) =>
                                              entry.activity_id ===
                                                row.activity_id &&
                                              entry.quarter ===
                                                categoryObj.quarter_name
                                          )?.status || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            row.activity_id,
                                            "status",
                                            categoryObj.quarter_name
                                          )
                                        }
                                      >
                                        {field.options.map((option, i) => (
                                          <MenuItem
                                            key={i}
                                            value={option}
                                            sx={{ color: "#808080" }}
                                          >
                                            {option}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </StyledTableCell>
                                    <StyledTableCell
                                      align="center"
                                      className="colorCodeTable"
                                    >
                                      <input
                                        required
                                        fullWidth
                                        size="small"
                                        name="remark"
                                        placeholder="Remark"
                                        style={{
                                          width: "150px",
                                          height: "25px",
                                          backgroundColor: "white",
                                          border: "none",
                                          outline: "none",
                                          paddingLeft: "10px",
                                        }}
                                        className="textfield-form"
                                        value={
                                          activityTableData.find(
                                            (entry) =>
                                              entry.activity_id ===
                                                row.activity_id &&
                                              entry.quarter ===
                                                categoryObj.quarter_name
                                          )?.remark || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            row.activity_id,
                                            "remark",
                                            categoryObj.quarter_name
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })
                          ) : (
                            <TableRow>
                              <StyledTableCell
                                style={{ height: "500px" }}
                                colSpan={headCells.length}
                                align="center"
                              >
                                No data available
                              </StyledTableCell>
                            </TableRow>
                          )}

                          {!loading &&
                            categoryObj.tabledata.length < pageSize &&
                            categoryObj.tabledata.length > 0 &&
                            renderPlaceholderRows(
                              Math.max(
                                0,
                                pageSize -
                                  categoryObj.tabledata.slice(
                                    pageIndex * pageSize,
                                    (pageIndex + 1) * pageSize
                                  ).length
                              )
                            )}
                        </TableBody>
                      </Table>
                    </StyledTableContainer>

                    <Box display="flex" alignItems="center" mt={1} mb={0.5}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item ml={2} lg={2.5} sm={3} xs={12}>
                          <TextField
                            required
                            fullWidth
                            size="small"
                            type="number"
                            name="captcha"
                            placeholder="Requisition Amount: ₹"
                            sx={{
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <span className="spam-SP-Appraisal">
                            Date - 19/06/2024
                          </span>
                        </Grid>
                        <Grid item ml={2} lg={2.5} sm={3} xs={12}>
                          <TextField
                            required
                            fullWidth
                            size="small"
                            type="number"
                            name="captcha"
                            placeholder="Approved Amount: ₹"
                            sx={{
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <span className="spam-SP-Appraisal">
                            Date - 19/06/2024
                          </span>
                          <Link ml={2} fontSize={11} sx={{ cursor: "pointer" }}>
                            Attachment: .pdf
                          </Link>
                        </Grid>
                        {userRole == "DC" && (
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent="flex-end"
                          >
                            <Grid item ml={2}>
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
                                  size="small"
                                  style={{
                                    borderRadius: "12px",
                                    color: "#2A7E65",
                                    fontWeight: "500",
                                  }}
                                >
                                  Add New Entry
                                </Button>
                              </Card>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Card>
                </DialogContentText>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseSPAppraisalForm}>Cancel</Button>
          <Button
            onClick={handleSubmitFPOForm}
            color="primary"
            variant="contained"
            style={{
              borderRadius: "20px",
              color: "#FFFFFF",
              marginLeft: "10px",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
