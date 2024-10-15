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
  Pagination,
  Typography,
} from "@mui/material";

const headCells = [
  { id: "id", label: "S.No" },
  { id: "nursery", label: "Nursery" },
  { id: "mobile", label: "Mobile No." },
  // { id: "varietyPlants", label: "Variety of Plants" },
  { id: "TypeOfPlant", label: "Type Of Plant" },
  { id: "plantsCount", label: "Plants Count" },
  { id: "area", label: "Area" },
];

export default function PlantNurseryTable({
  data,
  handleClickParent,
  loading,
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item?.nurseryName?.toLowerCase()?.includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setPageIndex(0);
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const handleEntriesPerPageChange = (event, value) => {
    setPageSize(event.target.value);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
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
      backgroundColor: "#d4ecde",
    },
  });

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        totals.TotalPlantName += Number(row.TotalPlantName);
        totals.totalPlant += Number(row.totalPlant);

        return totals;
      },
      {
        TotalPlantName: 0,
        totalPlant: 0,
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
              Nursery
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Search"
              placeholder="Search District"
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
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    const isEvenRow = ind % 2 === 1;
                    return (
                      <StyledTableRow key={ind}>
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
                          {row.nurseryName}
                        </StyledTableCell>

                        <StyledTableCell
                          className="colorCodeTable"
                          align="center"
                        >
                          {row.nurseryMobile}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            color:
                              row.TotalPlantName === "0" ? "#808080" : "blue",
                            textDecoration:
                              row.TotalPlantName === "0" ? "none" : "underline",
                            cursor:
                              row.TotalPlantName === "0"
                                ? "default"
                                : "pointer",
                          }}
                          onClick={() =>
                            row.TotalPlantName !== "0" && handleClickParent(row)
                          }
                          align="center"
                        >
                          {row.TotalPlantName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.totalPlant}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.nurseryArea}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    colSpan={headCells.length}
                    align="center"
                    className="colorCodeTable"
                    style={{ height: "500px" }}
                  >
                    No data available
                  </StyledTableCell>
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
                <StyledTableRow key={"totals-dist"}>
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

                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.TotalPlantName}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.totalPlant}
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
