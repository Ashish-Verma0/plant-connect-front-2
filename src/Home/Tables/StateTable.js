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
} from "@mui/material";
import "./StateTable.css";
import NotificationLoder from "../NotificationLoder";
const headCells = [
  { id: "id", label: "S.No" },
  { id: "District", label: "District" },
  { id: "NurseryCount", label: "NurseryCount" },
  { id: "PlantCount", label: "PlantCount" },
  // { id: "LRPs", label: "LRPs" },
  // { id: "figCount", label: "FIGs" },
  // { id: "area", label: "Area (Ha)" },
  // { id: "farmerCount", label: "Farmers" },
];
export default function StateTable({ data, loading, handleClickParent }) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const filtered = data.filter((item) =>
        item.StateName?.toLowerCase()?.includes(search?.toLowerCase())
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
      backgroundColor: "#d4ecde",
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
  const dataa = [
    {
      id: 1,
      district: "Lucknow",
      nurseryCount: 12,
      plantCount: 456,
    },
    {
      id: 2,
      district: "Kolkata",
      nurseryCount: 8,
      plantCount: 256,
    },
    {
      id: 3,
      district: "Jaipur",
      nurseryCount: 22,
      plantCount: 356,
    },
    {
      id: 4,
      district: "Bangalore",
      nurseryCount: 32,
      plantCount: 956,
    },
  ];
  return (
    <>
      <div className="top-cut-card">
        <div className="phase-header">
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "23px",
              fontWeight: 700,
              paddingBottom: "12px",
              color: "#808080",
            }}
          >
            Phase 1
          </Typography>
        </div>
      </div>

      <Card
        style={{
          padding: "12px 12px 12px 12px",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#426d52" }}>
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
              ) : data.length > 0 ? (
                dataa.map((row, ind) => {
                  const isEvenRow = ind % 2 === 0;
                  return (
                    <StyledTableRow
                      key={ind}
                      sx={{
                        backgroundColor: isEvenRow ? "transparent" : "red",
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
                        {row.district}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          color: row.nurseryCount === "0" ? "#808080" : "blue",
                          textDecoration:
                            row.nurseryCount === "0" ? "none" : "underline",
                          cursor:
                            row.nurseryCount === "0" ? "default" : "pointer",
                        }}
                        onClick={() =>
                          row.nurseryCount !== "0" && handleClickParent(row)
                        }
                        align="center"
                      >
                        {row.nurseryCount}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="colorCodeTable"
                      >
                        {row.plantCount}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow>
                  <StyledTableCell
                    style={{
                      height: "571px",
                    }}
                    colSpan={headCells.length}
                    align="center"
                  >
                    <NotificationLoder />
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
                  <StyledTableCell align="center" className="colorCodeTable">
                    0
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.districtCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.fpoCount}
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
          mt={1.3}
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
              // style={{ color: "#426d52" }}
            />
          </Grid>
        </Box>
      </Card>
    </>
  );
}
