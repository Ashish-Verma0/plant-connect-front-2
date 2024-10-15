import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const headCells = [
  {
    id: "id",
    label: "S.No",
  },
  {
    id: "state",
    label: "State",
  },
  {
    id: "district",
    label: "District",
  },
  {
    id: "fpo",
    label: "FPOs",
  },
  {
    id: "fig",
    label: "FIGs",
  },
  {
    id: "area",
    label: "Area (Ha)",
  },
  {
    id: "farmer",
    label: "Farmer",
  },
];

export default function TotalFarmerTable({ data }) {
  const StyledTableCell = styled(TableCell)({
    borderBottom: 0,
    borderRight: "1px solid rgba(224, 224, 224, 1)", // Adds vertical divider
  });

  return (
    <>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#43C17A" }}>
            <TableRow>
              {headCells.map((headCell, ind) => (
                <StyledTableCell
                  key={headCell.id}
                  style={{ color: "white" }}
                  align="center"
                >
                  {headCell.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, ind) => (
              <TableRow key={row.name}>
                {headCells.map((headCell) => (
                  <StyledTableCell key={headCell.id} align="center">
                    {row[headCell.id]}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
