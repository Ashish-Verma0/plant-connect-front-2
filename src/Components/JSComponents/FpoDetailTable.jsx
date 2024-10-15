import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./jsstyle.css";
const headCells = [
  {
    id: "id",
    label: "S.No",
  },
  {
    id: "FIG",
    label: "FIG",
  },
  {
    id: "Area",
    label: "Area (Ha)",
  },

  {
    id: "Farmers",
    label: "Farmers",
  },
  {
    id: "Estimated_Prod",
    label: "Estimated Prod.(MT)",
  },
];

export default function FpoDetailTable({ data }) {
  const StyledTableCell = styled(TableCell)({
    borderBottom: 0,
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  });

  const navigate = useNavigate();

  const handleRowClick = async (row, event) => {
    try {
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Card className="HeadingCard">FPOs wise detailed report</Card>
      <TableContainer
        component={Paper}
        style={{
          borderRadius: 12,
          width: "100%",
          height: "auto",
          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Table aria-label="simple table" size={"medium"}>
          <TableHead style={{ backgroundColor: "#43C17A" }}>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const isEvenRow = index % 2 === 1;
              return (
                <TableRow
                  key={row.name}
                  sx={{
                    backgroundColor: isEvenRow ? "#BEFCE8 " : "transparent",
                  }}
                >
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{
                      color: row.FIG === "0" ? "inherit" : "blue",
                      textDecoration: row.FIG === "0" ? "none" : "underline",
                      cursor: row.FIG === "0" ? "default" : "pointer",
                    }}
                  >
                    {row.FIG}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.area}</StyledTableCell>
                  <StyledTableCell align="center">{row.Farmer}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Estimated_Prod}
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
