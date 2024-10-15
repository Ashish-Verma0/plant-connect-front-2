import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const rows = [
  { slNo: 1, district: "Anjaw", FPOs: 3, FIGs: 85, area: 4578, farmers: 913 },
  {
    slNo: 2,
    district: "Changlang",
    FPOs: 3,
    FIGs: 64,
    area: 6764,
    farmers: 1135,
  },
  { slNo: 3, district: "Dibang", FPOs: 1, FIGs: 19, area: 5567, farmers: 1343 },
  {
    slNo: 4,
    district: "East Kameng",
    FPOs: 3,
    FIGs: 44,
    area: 6789,
    farmers: 839,
  },
  {
    slNo: 5,
    district: "East Siang",
    FPOs: 3,
    FIGs: 48,
    area: 9876,
    farmers: 456,
  },
  { slNo: 6, district: "Kamle", FPOs: 1, FIGs: 18, area: 8976, farmers: 298 },
  {
    slNo: 7,
    district: "Kra Daadi",
    FPOs: 1,
    FIGs: 12,
    area: 9876,
    farmers: 385,
  },
  {
    slNo: 8,
    district: "Kurung Kumey",
    FPOs: 1,
    FIGs: 14,
    area: 3567,
    farmers: 398,
  },
];

// Calculate totals
const totals = {
  FPOs: 16,
  FIGs: 304,
  area: 55993,
  farmers: 5767,
};

const StyledBox = styled(Box)({
  maxWidth: 650,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "560px",
    height: "40px",
    backgroundColor: "white",
    borderBottomLeftRadius: "100px",
  },
});

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#e0f7f3",
  color: "#00695c",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "8px",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "#e0f7f3",
  },
});

const TableTest = () => {
  // ... (rows and totals calculation remain the same)

  return (
    <StyledBox sx={{ bgcolor: "white", p: 2, borderRadius: "12px" }}>
      <TableContainer component={Paper}>
        <Typography
          variant="h6"
          sx={{ bgcolor: "#4caf50", color: "white", py: 2, pl: 2 }}
        >
          Phase 4
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl.No.</StyledTableCell>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell align="right">FPOs</StyledTableCell>
              <StyledTableCell align="right">FIGs</StyledTableCell>
              <StyledTableCell align="right">Area (Ha)</StyledTableCell>
              <StyledTableCell align="right">Farmers</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.slNo}>
                <TableCell>{row.slNo}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell align="right">{row.FPOs}</TableCell>
                <TableCell align="right">{row.FIGs}</TableCell>
                <TableCell align="right">{row.area}</TableCell>
                <TableCell align="right">{row.farmers}</TableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <TableCell colSpan={2} align="right" sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "blue" }}
              >
                {totals.FPOs}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "blue" }}
              >
                {totals.FIGs}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {totals.area}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {totals.farmers}
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
};

export default TableTest;
