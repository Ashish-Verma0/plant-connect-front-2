import React from "react";
import { Typography, Grid } from "@mui/material";
import AboutUSComponents from "../Components/AboutUS/AboutUSComponents";

const AboutUs = () => {
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#16b566",
          height: "3rem",
        }}
      >
        <Grid item>
          <Typography
            variant="h6"
            style={{
              color: "#fff",
              textAlign: "center",
              paddingLeft: "40px",
              fontSize: "22px",
            }}
          >
            About The Scheme
          </Typography>
        </Grid>
      </Grid>
      <AboutUSComponents />
    </React.Fragment>
  );
};

export default AboutUs;
