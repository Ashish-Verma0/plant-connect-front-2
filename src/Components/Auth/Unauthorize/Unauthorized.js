import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UnAuthorise from "../../../assets/images/UnAuthorised.png";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <Grid
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#16b566",
          height: "3rem",
          width: "100%",
        }}
      ></Grid>

      <Grid
        container
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          textAlign: "center",
          padding: 2,
          //   backgroundColor: "#f5f5f5",
        }}
      >
        <Grid item>
          <img
            src={UnAuthorise}
            style={{
              height: "100px",
              // backgroundColor: "red",
            }}
            alt="unauthorize"
          />
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            sx={{ color: "primary.main", fontWeight: "bold", mb: 1 }}
          >
            Unauthorized
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            You do not have access to the requested page.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              color: "white",
            }}
            onClick={goBack}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Unauthorized;
