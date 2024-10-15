import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import { Button, Grid, Typography } from "@mui/material";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Grid container class="mainbox">
      <Grid item class="err">
        4
      </Grid>
      <Typography>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
      </Typography>
      <Button onClick={goBack}>Go Back</Button>
      {/* Let's go <a href="#">home</a> and try from there. */}
    </Grid>
  );
}
