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
  Grid,
  Card,
  Skeleton,
  Typography,
  Pagination,
  Button,
  Stack,
} from "@mui/material";
import AutocompleteSelect from "../Dropdown/AutocompleteSelect";
const headCells = [
  { id: "id", label: "S.No" },
  { id: "Quarter", label: "Quarter" },
  { id: "Created On", label: "Created On" },
  { id: "Year", label: "Year" },
  { id: "Requistion Amount", label: "Requistion Amount" },
  { id: "Requistion Date", label: "Requistion Date" },
  { id: "Approved Amount", label: "Approved Amount" },
  { id: "Status", label: "Status" },
  { id: "Remarks by DLMC", label: "Remarks by DLMC" },
  { id: "Action", label: "Action" },
];
export default function SPAppraisalTable({
  data,
  loading,
  userRole,
  onEditForm,
  handleClickOpenSPAppraisalForm,
}) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const filtered = data.filter((item) =>
        item.Quarter?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredData(filtered);
      setPageIndex(0);
    }
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    whiteSpace: "nowrap",
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
    overflowX: "auto", // Enable horizontal scrolling if needed
  });

  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });
  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        const parseNumber = (value) => Number(value?.replace(/,/g, ""));
        totals.stateCount += parseNumber(row.stateCount);
        totals.districtCount += parseNumber(row.districtCount);
        totals.fpoCount += parseNumber(row.fpoCount);
        totals.figCount += parseNumber(row.figCount);
        totals.landArea += parseNumber(row.landArea);
        totals.farmerCount += parseNumber(row.farmerCount);
        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }
        return totals;
      },
      {
        stateCount: 0,
        districtCount: 0,
        fpoCount: 0,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#59c88a";
      case "Under Progress":
        return "#feba55";
      case "Rejected":
        return "#f12e00";
      default:
        return "#000000";
    }
  };

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between" mb={1}>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Phase IV
        </Typography>
        {userRole == "SP" && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickOpenSPAppraisalForm}
            style={{
              borderRadius: "20px",
              color: "#FFFFFF",
              marginLeft: "10px",
            }}
          >
            Create New
          </Button>
        )}
      </Stack>
      <Card
        style={{
          borderRadius: "12px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <StyledTableCell
                    key={index}
                    style={{ color: "white" }}
                    align="center"
                  >
                    {headCell.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    const isEvenRow = ind % 2 === 1;
                    return (
                      <StyledTableRow
                        key={ind}
                        sx={{
                          backgroundColor: isEvenRow
                            ? "#BEFCE8 "
                            : "transparent",
                        }}
                      >
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
                          {row.Quarter}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row["Created On"]}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.Year}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row["Requisition Amount"]}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row["Requisition Date"]}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row["Approved Amount"]}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="tableRowNameWidth"
                          style={{ color: getStatusColor(row.Status) }}
                        >
                          {row.Status}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row["Remarks by DLMC"]}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          <Button
                            className="SP-table-Button"
                            onClick={() => onEditForm(row.Quarter)}
                          >
                            View
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    style={{
                      height: "500px",
                    }}
                    colSpan={headCells.length}
                    align="center"
                  >
                    No data available
                  </StyledTableCell>
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
                <StyledTableRow key={"totals-state"}>
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    className="colorCodeTable"
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    0
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    0
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
    </>
  );
}
