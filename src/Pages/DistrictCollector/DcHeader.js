import { Button, Card, Grid } from "@mui/material";
import React from "react";
import exportBtn from "../../assets/images/exportBtn.png";

export default function DcHeader({ handleLinkClick, figfpoDetail }) {
  return (
    <Grid
      container
      //   pl={4}
      //   pr={4}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      mb={-3}
    >
      <Grid item lg={6} sm={6} xs={12}>
        <Card
          // className="mapCardHeading"
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "fle",
            padding: "15px",
            width: "249px",
            background: figfpoDetail === "SPWiseDetail" ? "#88aefa" : "white",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
            borderRadius: "12px",
            color: figfpoDetail === "SPWiseDetail" ? "#ffffff" : "black",
            // fontStyle: "normal",
            fontSize: "1.2rem",
            fontWeight: "620",
          }}
          onClick={(e) => handleLinkClick("SPWiseDetail", e)}

          // elevation={6}
        >
          SP Wise detailed Report
        </Card>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleLinkClick("Fpo Detail", e)}
              style={{ borderRadius: "20px", color: "#FFFFFF" }}
              disabled={
                figfpoDetail === "Fpo Detail" || figfpoDetail === "Total FPOs"
                  ? true
                  : false
              }
            >
              Fpo Detail
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleLinkClick("Fig Detail", e)}
              // onClick={handleCreateNewClick}
              style={{ borderRadius: "20px", color: "#FFFFFF" }}
              disabled={
                figfpoDetail === "Fig Detail" || figfpoDetail === "Total FIGs"
                  ? true
                  : false
              }
            >
              Fig Detail
            </Button>
          </Grid>
          <Grid item>
            <img src={exportBtn} alt="exportBtn" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
