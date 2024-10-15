import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";
import {
  Box,
  Grid,
  Card,
  Skeleton,
  Typography,
  Pagination,
  IconButton,
} from "@mui/material";
import NotificationLoder from "../../Home/NotificationLoder";
const headCells = [
  { id: "id", label: "S.No" },
  { id: "StateName", label: "State" },
  { id: "districtCount", label: "District" },
  { id: "fpoCount", label: "FPOs" },
  { id: "LRPs", label: "LRPs" },
  { id: "figCount", label: "FIGs" },
  { id: "area", label: "Area (Ha)" },
  { id: "farmerCount", label: "Farmers" },
];
export default function NotificationTable({
  loading,
  tableData,
  headCells,
  handleEditClick,
  handleDeleteClick,
}) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (tableData?.length) {
      const filtered = tableData.filter((item) =>
        item.Notification?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredData(filtered);
      setPageIndex(0);
    }
  }, [search, tableData]);

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

  return (
    <>
      <Card
        style={{
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "12px",
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
                          {row.Notification}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNameWidth"
                        >
                          {row.Category}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {convertedTimestamp}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ width: "10%" }}
                          className="colorCodeTable"
                        >
                          <IconButton onClick={() => handleEditClick(row)}>
                            <img src={edit} height="20px" alt="edit-icon" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(row.id)}>
                            <img
                              src={deleteIcon}
                              height="20px"
                              alt="delete-icon"
                            />
                          </IconButton>
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
            />
          </Grid>
        </Box>
      </Card>
    </>
  );
}
