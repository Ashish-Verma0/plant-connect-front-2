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

const headCells = [
  {
    id: "id",
    label: "District",
  },
  {
    id: "state",
    label: "Area (Ha)",
  },
  {
    id: "district",
    label: "FPO",
  },
  {
    id: "fpo",
    label: "No. Of Farmers",
  },
  {
    id: "fig",
    label: "Production (MT)",
  },
];

export default function FarmerTable({ data }) {
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
    <>
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
              {headCells.map((headCell, ind) => (
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
                <TableRow key={row.name}>
                  {headCells.map((headCell) => (
                    <StyledTableCell
                      onClick={
                        headCell.id === "district"
                          ? (event) => handleRowClick(row, headCell)
                          : null
                      }
                      sx={{
                        backgroundColor: isEvenRow ? "#BEFCE8 " : "transparent",
                      }}
                      key={headCell.id}
                      align="center"
                    >
                      {row[headCell.id]}
                    </StyledTableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
