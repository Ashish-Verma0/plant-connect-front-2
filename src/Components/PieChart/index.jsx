import { Stack, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

export default function PieChart({
  data,
  heading,
  width,
  legend,
  height,
  enabled,
  headingText,
}) {
  const names = data.map((item) => item.name);
  const quantities = data.map((item) => item.quantity);

  return (
    <Stack alignItems="center" justifyContent="center">
      {heading === true ? (
        <div>
          <Typography textAlign="center" style={{ color: "grey" }}>
            {headingText} Yield
          </Typography>
          <Typography textAlign="center" style={{ color: "grey" }}>
            V/s
          </Typography>
          <Typography textAlign="center" style={{ color: "grey" }}>
            Overall Yield
          </Typography>
        </div>
      ) : (
        ""
      )}
      <Chart
        options={{
          chart: {
            id: "apexchart-example",
          },
          stroke: {
            width: 0,
          },
          dataLabels: {
            enabled: enabled,
          },
          labels: names,
          legend: {
            show: legend,
            position: "bottom",
            labels: {
              colors: ["grey"],
            },
          },
          colors: ["#feba55", "#a52b0e", "#FFE700", "#826AF9"],
        }}
        series={quantities}
        type="pie"
        style={{ width: width, height: height }}
      />
    </Stack>
  );
}
