import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import "./MapCards.css";

export default function MapCards({ mainMapCard }) {
  const mapCard = [
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of HMT's",
      value:
        mainMapCard.totalDistrict || mainMapCard?.CollectiveData?.length || 0,
    },
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of Plant's",
      value: mainMapCard.totalFpos || 0,
    },
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of Nurserie's",
      value: mainMapCard.totalFigs || 0,
    },
  ];

  return (
    <Grid container spacing={2} columnSpacing={4} className="main-map-cards">
      {mapCard.map((card, index) => (
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
          key={index}
          className="map-card-style"
        >
          <Card
            sx={{
              height: "194px",
              borderRadius: "12px",
              backgroundColor: card.bg,
            }}
            elevation={3}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "55%",
                  p: {
                    lg: 4,
                  },
                }}
              >
                <Typography component="div" className="custom-typography">
                  {card.tag}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: card.highlight,
                  height: "45%",
                }}
              >
                <Typography component="div" className="custom-number">
                  {card.value}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
