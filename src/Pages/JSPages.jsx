import React from "react";
import { Grid } from "@mui/material";
import FpoDetailTable from "../Components/JSComponents/FpoDetailTable";

const JSPages = () => {
  const FpoDetailTableData = [
    {
      FIG: "A",
      area: 500,
      Farmer: "1,67,985",
      Estimated_Prod: "19.701",
    },

    {
      FIG: "B",
      area: 500,
      Farmer: "11,275",
      Estimated_Prod: "14,000",
    },
    {
      FIG: "D",
      area: 500,
      Farmer: "76,845",
      Estimated_Prod: "319,099",
    },
    {
      FIG: "E",
      area: 500,
      Farmer: "345,35",
      Estimated_Prod: "165,456",
    },
  ];
  return (
    <Grid
      item
      xs={12}
      container
      display="flex"
      justifyContent="center"
      mt={8}
      mb={9}
    >
      <Grid item lg={11} sm={11} xs={12}>
        <FpoDetailTable data={FpoDetailTableData} />
      </Grid>
    </Grid>
  );
};

export default JSPages;
