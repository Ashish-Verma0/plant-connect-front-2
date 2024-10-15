import { Breadcrumbs, Grid } from "@mui/material";
import React from "react";
import CropTable from "./CropTable";
import CropDistrictTable from "./CropDistrictTable";
import PieChart from "../PieChart";
import FPOTable from "./CropFPOTable";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function CropTableContainer({
  cropLevel,
  CropTableData,
  selectedCrop,
  DistrictTableData,
  pieChartData,
  handleClickCrop,
  UpdatedbreadData,
}) {
  const totalCropProduction = Number(pieChartData.totalCropProduction) || 0;
  const selectedCropProduction =
    Number(pieChartData.selectedCropProduction) || 0;

  const remainingCropProduction = totalCropProduction - selectedCropProduction;

  const pieChartData1 = [
    {
      name: `${selectedCrop} Yield`,
      quantity: selectedCropProduction,
    },
    {
      name: "Overall Yield",
      quantity: remainingCropProduction,
    },
  ];
  //   <Grid item lg={3} sm={5} xs={12}>
  //   <PieChart
  //     data={pieChartData1}
  //     width={400}
  //     headingText={selectedCrop}
  //     height={400}
  //     legend={true}
  //     enabled={true}
  //     heading={true}
  //   />
  // </Grid>
  return (
    <React.Fragment>
      <Grid container item xs={12} mt={4}>
        <Grid item lg={8} sm={7} xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {UpdatedbreadData}
          </Breadcrumbs>
        </Grid>
        {cropLevel == 0 && (
          <Grid item lg={12} sm={12} xs={12}>
            <CropTable data={CropTableData} handleClickCrop={handleClickCrop} />
          </Grid>
        )}
        {cropLevel == 1 && (
          <Grid item lg={12} sm={12} xs={12}>
            <CropDistrictTable
              data={DistrictTableData}
              handleClickCrop={handleClickCrop}
            />
          </Grid>
        )}
        {cropLevel == 2 && (
          <Grid item lg={12} sm={12} xs={12}>
            <FPOTable
              data={DistrictTableData}
              handleClickCrop={handleClickCrop}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
