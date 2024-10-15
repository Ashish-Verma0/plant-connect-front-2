import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  whiteSpace: "nowrap",
  borderRight: "1px solid rgba(224, 224, 224, 1)",
  [theme.breakpoints.down("sm")]: {
    padding: "4px",
    fontSize: "0.8rem",
  },
}));

const StyledTableContainer = styled(TableContainer)({
  borderRadius: 12,
  width: "100%",
  // height: "672px",
  minHeight: { xs: "300px", md: "600px", lg: "628px" },
  // maxHeight: { xs: "300px", md: "400px", lg: "620px" },
  // width: "100%",
  height: "640px",

  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
  overflowX: "auto",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "#BEFCE8",
  },
});

const SPFormTable = ({
  data,
  handleClickFarmerOpen,
  loading,
  headCells,
  DragDropNameList,
  handleClickFormParent,
}) => {
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
  const entriesPerPageOptions = [5, 10, 15];

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const handleEntriesPerPageChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math?.min((pageIndex + 1) * pageSize, data.length);
  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        totals.landArea += Number(row.landArea || 0);
        return totals;
      },
      { landArea: 0 }
    );
  };

  const totals = calculateTotals(data);

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

  return (
    <React.Fragment>
      <Card
        style={{
          padding: "12px 12px 12px 12px",
          borderRadius: "12px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <StyledTableRow>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={headCell.id}
                    style={{ color: "white" }}
                    align="center"
                  >
                    {headCell.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : data.length > 0 ? (
                data
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, index) => {
                    const originalTimestamp = row?.createdAt;
                    const originalDate = new Date(originalTimestamp);
                    const options = {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    };
                    const convertedTimestamp = originalDate?.toLocaleString(
                      "en-GB",
                      options
                    );
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            color:
                              DragDropNameList === "FIGs Available"
                                ? row.farmerCount === "0"
                                  ? "#808080"
                                  : "blue"
                                : "#808080",
                            textDecoration:
                              DragDropNameList === "FIGs Available"
                                ? row.farmerCount === "0"
                                  ? "none"
                                  : "underline"
                                : "none",
                            cursor:
                              DragDropNameList === "FIGs Available"
                                ? row.farmerCount === "0"
                                  ? "default"
                                  : "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (
                              DragDropNameList === "FIGs Available" &&
                              row.farmerCount !== "0"
                            ) {
                              handleClickFormParent(row);
                            }
                          }}
                        >
                          {row.FarmerCount ? row.content : row.FarmerCode}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.FarmerCount ? row.BlockName : row.content}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.FarmerCount ? row.FarmerCount : row.LandArea}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.FarmerCount ? (
                            convertedTimestamp
                          ) : (
                            <Tooltip
                              title="Farmer Details"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                userRole === "SP" &&
                                handleClickFarmerOpen(row.id)
                              }
                            >
                              <PersonIcon />
                            </Tooltip>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    colSpan={headCells.length}
                    style={{ height: "620px" }}
                    align="center"
                    className="colorCodeTable"
                  >
                    No data available
                  </StyledTableCell>
                </TableRow>
              )}
              {!loading &&
                data.length > 0 &&
                renderPlaceholderRows(
                  Math.max(
                    0,
                    pageSize -
                      data.slice(
                        pageIndex * pageSize,
                        (pageIndex + 1) * pageSize
                      ).length
                  )
                )}
              {/* {!loading && data.length > 0 && (
                <StyledTableRow key={"totals"}>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                    component="th"
                    scope="row"
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    &nbsp;
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    &nbsp;
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.landArea}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    &nbsp;
                  </StyledTableCell>
                </StyledTableRow>
              )} */}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Grid item>
            <Typography variant="caption">
              Showing {entriesStart} - {entriesEnd} of {data.length} entries
            </Typography>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(data.length / pageSize)}
              page={pageIndex + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Box>
      </Card>
    </React.Fragment>
  );
};

export default SPFormTable;
