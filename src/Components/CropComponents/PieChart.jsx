import { Stack, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

export default function ApexChart() {
  const data = [
    {
      name: "Large Cardamom",
      quantity: 5,
    },
    {
      name: "Overall",
      quantity: 26,
    },
  ];

  const names = data.map((item) => item.name);
  const quantities = data.map((item) => item.quantity);

  return (
    <React.Fragment>
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Large Cardamom</Typography>
        <Typography>V/s</Typography>
        <Typography>Overall Production</Typography>
      </Stack>
      <Chart
        options={{
          chart: {
            width: 400,
            id: "apexchart-example",
          },
          stroke: {
            width: 0,
          },
          dataLabels: {
            enabled: true,
          },
          labels: names,
          legend: {
            show: true,
            position: "bottom",
          },
          colors: ["#00AB55", "#2D99FF", "#FFE700", "#826AF9"],
        }}
        series={quantities}
        type="pie"
        style={{ width: "400px", height: "400px" }}
      />
    </React.Fragment>
  );
}
