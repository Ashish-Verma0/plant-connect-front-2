import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import {
  Box,
  Card,
  Grid,
  Skeleton,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import SecureLS from "secure-ls";
import NotificationLoder from "../NotificationLoder";

const ls = new SecureLS({ encodingType: "aes" });

const headCells = [
  {
    id: "id",
    label: "S.No",
  },

  {
    id: "fpoCount",
    label: "FPOs",
  },
  {
    id: "LRPs",
    label: "LRPs",
  },
  {
    id: "figCount",
    label: "FIGs",
  },
  {
    id: "area",
    label: "Area (Ha)",
  },
  {
    id: "farmerCount",
    label: "Farmer",
  },
];

export default function FpoTable({ data, handleClickParent, loading }) {
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
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.fpoName?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setFilteredData(filtered);
    setPageIndex(0);
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);
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
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto",
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        totals.figCount += Number(row.figCount);
        totals.landArea += Number(row.landArea);
        totals.farmerCount += Number(row.farmerCount);

        return totals;
      },
      {
        figCount: 0,
        landArea: 0,
        farmerCount: 0,
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
  return (
    <>
      <Card
        style={{
          padding: "12px 12px 12px 12px",
          borderRadius: "12px",
          minHeight: "700px",
        }}
        elevation={6}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Grid item>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              FPO
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Search"
              placeholder="Search FPO"
              autoComplete="false"
              value={search}
              size="small"
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ml: 2 }}
            />
          </Grid>
        </Box>

        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <StyledTableRow>
                <StyledTableCell style={{ color: "white" }} align="center">
                  S.No
                </StyledTableCell>

                <StyledTableCell style={{ color: "white" }} align="center">
                  FPOs
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  LRP
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  FIGs
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  Area (Ha)
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  Farmers
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    return (
                      <StyledTableRow key={ind}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.fpoName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.lrpCount}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            color:
                              userRole === "JS"
                                ? row.figCount === "0"
                                  ? "#808080"
                                  : "blue"
                                : "#808080",
                            textDecoration:
                              userRole === "JS"
                                ? row.figCount === "0"
                                  ? "none"
                                  : "underline"
                                : "#808080",
                            cursor:
                              userRole === "JS"
                                ? row.figCount === "0"
                                  ? "default"
                                  : "pointer"
                                : "#808080",
                          }}
                          onClick={() =>
                            userRole === "JS" &&
                            row.figCount !== "0" &&
                            handleClickParent(row)
                          }
                          align="center"
                        >
                          {row.figCount}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.landArea}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.farmerCount}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headCells.length}
                    style={{ height: "500px" }}
                    align="center"
                    className="colorCodeTable"
                  >
                    <NotificationLoder />
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                filteredData.length < pageSize &&
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
                    // colSpan={2}
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    0
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.figCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.landArea}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.farmerCount}
                  </StyledTableCell>
                </StyledTableRow>
              )}
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
    </>
  );
}
