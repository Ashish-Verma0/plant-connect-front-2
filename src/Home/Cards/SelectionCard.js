import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TableContainer from "../Tables/TableContainer";
import { Typography, Grid, CardActionArea, Skeleton } from "@mui/material";
import "./SelectionCard.css";
import Phase3tableContainer from "../Tables/Phase3tableContainer";
export default function SelectionCard({
  params,
  setParams,
  distData,
  setDistData,
  fpoData,
  setFpoData,
  figData,
  setFigData,
  farmerData,
  setFarmerData,
  farmerDetails,
  setFarmerDetails,
  allTableCheck,
  tableData,
  setTableData,
  handleCardData,
  selectedState,
  mapDownCard,
  selectedPhases,
}) {
  return (
    <>
      <Grid container spacing={1} columnSpacing={10}>
        <Grid item xs={12} style={{ marginTop: "-1.6rem" }}>
          <TableContainer
            params={params}
            setParams={setParams}
            distData={distData}
            setDistData={setDistData}
            fpoData={fpoData}
            setFpoData={setFpoData}
            figData={figData}
            setFigData={setFigData}
            farmerData={farmerData}
            setFarmerData={setFarmerData}
            farmerDetails={farmerDetails}
            setFarmerDetails={setFarmerDetails}
            allTableCheck={allTableCheck}
            tableData={tableData}
            setTableData={setTableData}
            handleCardData={handleCardData}
            selectedState={selectedState}
          />
        </Grid>
      </Grid>
    </>
  );
}
