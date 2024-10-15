import React from "react";
import { Button, Card, Grid } from "@mui/material";

const SPHeader = ({
  labelA,
  handleClickFigFormOpen,
  handleClickLRPFormOpen,
  handleClickOpenFPOForm,
}) => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
      }}
      mb={-3}
    >
      <Grid item lg={6} sm={6} xs={12}>
        <Card className="Sp-CardHeading">
          {labelA === "Total LRPs"
            ? "LRPs wise detailed report"
            : labelA === "Total FIGs"
            ? "FIGs wise detailed report"
            : "FPOs wise detailed report"}
        </Card>
      </Grid>

      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpenFPOForm}
          style={{ borderRadius: "20px", color: "#FFFFFF", marginLeft: "10px" }}
        >
          Create New FPO
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickLRPFormOpen}
          style={{ borderRadius: "20px", color: "#FFFFFF", marginLeft: "10px" }}
        >
          Create New LRP
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickFigFormOpen}
          style={{
            color: "#FFFFFF",
            marginLeft: "10px",
            borderRadius: "20px",
          }}
        >
          Create New FIG
        </Button>
      </Grid>
    </Grid>
  );
};

export default SPHeader;
