import { Grid } from "@mui/material";
import React from "react";
import CropTable from "../Components/CropComponents/CropTables/CropTable";
import PieChartCrop from "../Components/CropComponents/PieChart";
import CropDistrictTable from "../Components/CropComponents/CropTables/CropDistrictTable";
import FarmerForm from "../Components/Form/FarmerForm";

export default function CropTableCont({ StateTableData, DistrictTableData }) {
  return (
    <>
      <Grid container xs={12} display="flex" justifyContent="center" mt={8}>
        <Grid item lg={8} sm={7} xs={12}>
          <CropTable data={StateTableData} />
        </Grid>
        <Grid item lg={3} sm={5} xs={12}>
          <PieChartCrop />
        </Grid>
        <Grid item lg={8} sm={7} xs={12}>
          <CropDistrictTable data={DistrictTableData} />
        </Grid>
        <Grid item lg={3} sm={5} xs={12}>
          <FarmerForm />
        </Grid>
      </Grid>
    </>
  );
}
