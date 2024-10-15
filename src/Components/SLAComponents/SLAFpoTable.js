import React, { useEffect, useState } from "react";
import SecureLS from "secure-ls";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import "./slatablecontainer.css";
import {
  Box,
  Card,
  Grid,
  Button,
  Skeleton,
  Pagination,
  Typography,
} from "@mui/material";
export default function SLAFpoTable({
  data,
  lrpTrue,
  loading,
  headCells,
  onEditForm,
  handleClickParent,
}) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

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

  const tokenData = fetchToken();
  const userRole = tokenData?.user_role;

  useEffect(() => {
    const filtered = data.filter((item) =>
      item?.Name?.toLowerCase()?.includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setPageIndex(0);
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };
  const handleEntriesPerPageChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    whiteSpace: "nowrap",
    borderRight: "1px solid rgba(224, 224, 224, 1)", // Adds vertical divider
    [theme.breakpoints.down("sm")]: {
      padding: "4px", // Adjust padding for smaller screens
      fontSize: "0.8rem", // Adjust font size for smaller screens
    },
  }));

  const StyledTableContainer = styled(TableContainer)({
    borderRadius: 12,
    width: "100%",
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto", // Enable horizontal scrolling if needed
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });
  // const navigate = useNavigate();

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        totals.lrpCount += Number(row.lrpCount) || 0;
        totals.figCount += Number(row.figCount) || 0;
        totals.farmerCount += Number(row.farmerCount) || 0;
        return totals;
      },
      {
        lrpCount: 0,
        farmerCount: 0,
        figCount: 0,
      }
    );
  };

  const totals = calculateTotals(filteredData);
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
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#59c88a";
      case "Pending":
        return "#fabe5e";
      case "Processing":
        return "#feba55";
      case "Rejected":
        return "#f12e00";
      default:
        return "#000000";
    }
  };
  return (
    <React.Fragment>
      <Card
        style={{
          borderRadius: "12px",
          marginTop: "-30px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <StyledTableRow>
                {headCells.map((headCell, index) => (
                  <StyledTableCell
                    key={headCell.id}
                    style={{
                      color: "white",
                    }}
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
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
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
                      <StyledTableRow key={`fig-table${ind}`}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.Name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.lrpCount || row.ContactNo}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            color: row.figCount === "0" ? "#808080" : "blue",
                            textDecoration:
                              row.figCount === "0" ? "none" : "underline",
                            cursor:
                              row.figCount === "0" ? "default" : "pointer",
                            width: "7%",
                          }}
                          onClick={() =>
                            row.figCount !== "0" && handleClickParent(row)
                          }
                          align="center"
                        >
                          {row.figCount}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.farmerCount}
                        </StyledTableCell>
                        {lrpTrue && (
                          <StyledTableCell
                            align="center"
                            className="colorCodeTable tableRowNameWidth"
                          >
                            {convertedTimestamp}
                          </StyledTableCell>
                        )}
                        {lrpTrue && (
                          <StyledTableCell
                            align="center"
                            className="tableRowNameWidth"
                            style={{ color: getStatusColor(row.Status) }}
                          >
                            {row.Status}
                          </StyledTableCell>
                        )}

                        {lrpTrue ? (
                          <StyledTableCell
                            align="center"
                            style={{ color: "blue" }}
                            className="colorCodeTable tableRowNameWidth"
                          >
                            {row.Status === "Processing" ? (
                              <React.Fragment>
                                <Button
                                  className="SP-table-Button"
                                  style={{ color: "blue" }}
                                  onClick={() => onEditForm(row.id)}
                                >
                                  View & Update
                                </Button>
                              </React.Fragment>
                            ) : row.Status === "Approved" ||
                              row.Status === "Pending" ||
                              row.Status === "y" ? (
                              <Button
                                className="SP-table-Button"
                                style={{ color: "blue" }}
                                onClick={() => onEditForm(row.id)}
                              >
                                View
                              </Button>
                            ) : row.Status === "Rejected" ? (
                              <Button
                                className="SP-table-Button"
                                style={{ color: "blue" }}
                                onClick={() => onEditForm(row.id)}
                              >
                                View
                              </Button>
                            ) : null}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            align="center"
                            className="colorCodeTable"
                          >
                            {convertedTimestamp}
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow key={`fig-data${1}`}>
                  <TableCell
                    colSpan={headCells.length}
                    style={{ height: "500px" }}
                    align="center"
                    className="colorCodeTable"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                filteredData.length > 0 &&
                renderPlaceholderRows(
                  Math.max(
                    0,
                    pageSize -
                      filteredData.slice(
                        pageIndex * pageSize,
                        (pageIndex + 1) * pageSize
                      ).length
                  )
                )}
              {!loading && filteredData.length > 0 && (
                <StyledTableRow key={"totals-fpo"}>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                    component="th"
                    scope="row"
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.lrpCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.figCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.farmerCount}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={0.5}
          mb={0.5}
        >
          <Grid item ml={2}>
            <Typography variant="caption">
              Showing {entriesStart} - {entriesEnd} of {filteredData.length}{" "}
              entries
            </Typography>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(filteredData.length / pageSize)}
              page={pageIndex + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Box>
      </Card>
    </React.Fragment>
  );
}
