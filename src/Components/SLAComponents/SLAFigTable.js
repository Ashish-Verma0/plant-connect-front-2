import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import {
  Box,
  Grid,
  Card,
  Button,
  Skeleton,
  Typography,
  Pagination,
} from "@mui/material";

export default function SLAFigTable({
  data,
  loading,
  headCells,
  onEditForm,
  handleClickParent,
  spTrue,
}) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(
        data?.filter((project) =>
          Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(search?.toLowerCase())
          )
        )
      );
    }
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
        totals.farmerCount += parseNumber(row.farmerCount);
        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }
        return totals;
      },
      {
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

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year},${hours}:${minutes}`;
  }
  return (
    <>
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
                          style={{ width: "20%" }}
                          className="colorCodeTable"
                        >
                          {row.Name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{ width: "20%" }}
                          className="colorCodeTable"
                        >
                          {row.lrpName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.BlockName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.FigLeader}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            color: row.farmerCount === "0" ? "#808080" : "blue",
                            textDecoration:
                              row.farmerCount === "0" ? "none" : "underline",
                            cursor:
                              row.farmerCount === "0" ? "default" : "pointer",
                          }}
                          onClick={() =>
                            row.farmerCount !== "0" && handleClickParent(row)
                          }
                        >
                          {row.farmerCount}
                        </StyledTableCell>

                        {spTrue ? (
                          <>
                            <StyledTableCell
                              align="center"
                              className="colorCodeTable"
                            >
                              {convertedTimestamp}
                            </StyledTableCell>

                            <StyledTableCell
                              align="center"
                              className="colorCodeTable"
                            >
                              {row.FpoStatus === "Processing" ||
                              row.FpoStatus === "Un Mapped" ||
                              row.FpoStatus === "Rejected" ? (
                                <React.Fragment>
                                  <Button
                                    className="SP-table-Button"
                                    style={{ textColor: "blue" }}
                                    onClick={() => onEditForm(row.id)}
                                  >
                                    View
                                  </Button>
                                </React.Fragment>
                              ) : row.FpoStatus === "Approved" ||
                                row.FpoStatus === "Pending" ? (
                                <Button
                                  className="SP-table-Button"
                                  style={{ textColor: "blue" }}
                                  onClick={() => onEditForm(row.id)}
                                >
                                  View
                                </Button>
                              ) : null}
                            </StyledTableCell>
                          </>
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
              {/* {!loading &&
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
                )} */}
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
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
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
    </>
  );
}
