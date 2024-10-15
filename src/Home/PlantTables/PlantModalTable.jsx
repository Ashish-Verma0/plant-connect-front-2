import React, { useEffect, useState, useRef } from "react";
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
  TextField,
} from "@mui/material";
import NotificationLoder from "../../Home/NotificationLoder";

export default function PlantModalTable({ loading, tableData, headCells }) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [requirements, setRequirements] = useState({});
  const [res, setRes] = useState([]);
  const inputRefs = useRef({});

  useEffect(() => {
    if (tableData?.length) {
      const filtered = tableData.filter((item) =>
        item.name?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredData(filtered);
      setPageIndex(0);
    }
  }, [search, tableData]);

  const handleRequirementChange = (event, nurseryId) => {
    const { value } = event.target;
    setRequirements((prevRequirements) => ({
      ...prevRequirements,
      [nurseryId]: value,
    }));
  };

  const handleAddRequirement = (nursery) => {
    const nurseryId = nursery.id;
    const nurseryRequirement = requirements[nurseryId] || "";

    if (nurseryRequirement) {
      setRes((prevRes) => [...prevRes, { ...nursery, nurseryRequirement }]);
      // Reset the requirement input field
      setRequirements((prevRequirements) => ({
        ...prevRequirements,
        [nurseryId]: "", // Reset the input field after adding
      }));
    } else {
      console.log("No requirement entered for this nursery.");
      alert("Please enter a requirement before adding.");
    }
  };

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

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

  const StyledTableContainer = styled(TableContainer)(() => ({
    borderRadius: 12,
    width: "100%",
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto",
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#d4ecde",
    },
  }));

  console.log("Res array:", res);

  return (
    <React.Fragment>
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
                Array.from({ length: 10 }).map((_, index) => (
                  <StyledTableRow key={index}>
                    {headCells.map((headCell) => (
                      <StyledTableCell key={headCell.id} align="center">
                        <Skeleton variant="text" />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    const hasRequirement = res.some(
                      (item) => item.id === row.id
                    );
                    return (
                      <StyledTableRow key={ind}>
                        <StyledTableCell align="center">
                          {pageIndex * pageSize + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.availability}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.address}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.contact}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.distance}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            variant="outlined"
                            name="requirements"
                            size="small"
                            label="Requirement"
                            value={requirements[row.id] || ""}
                            onChange={(event) =>
                              handleRequirementChange(event, row.id)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {!hasRequirement ? (
                            <Button
                              onClick={() => handleAddRequirement(row)}
                              className="SP-table-Button"
                            >
                              ADD
                            </Button>
                          ) : (
                            <Typography
                              className="SP-table-Button"
                              style={{ color: "green" }}
                            >
                              Added
                            </Typography>
                          )}
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
              Showing {pageIndex * pageSize + 1} -{" "}
              {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
              {filteredData.length} entries
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
