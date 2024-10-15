import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, Grid, TextField, Typography } from "@mui/material";
import "./style.css";
export default function FarmerForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg" // Set the maximum width (xs, sm, md, lg, xl)
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { borderRadius: "18px" } }}
      >
        <DialogTitle id="alert-dialog-title">{"Farmer Name"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container columnSpacing={4} id="form">
              <Grid item xs={5}>
                <label>Aadhar Details</label>
                <div className="card">4546825445</div>
              </Grid>
              <Grid item xs={5}>
                <label>Father's Name</label>
                <div className="card">4546825445</div>
              </Grid>
              <Grid item xs={12} mt={2}>
                <label style={{ fontSize: "18px" }}>Personal Details</label>
              </Grid>
              <Grid item xs={2}>
                <label>Birth Day</label>
                <div className="card">16</div>
              </Grid>
              <Grid item xs={2}>
                <label>Birth Month</label>
                <div className="card">April</div>
              </Grid>
              <Grid item xs={2}>
                <label>Birth Year</label>
                <div className="card">1998</div>
              </Grid>
              <Grid item xs={2}>
                <label>Gender</label>
                <div className="card">Male</div>
              </Grid>
              <Grid item xs={3} ml={10}>
                <label>Major Crop Pattern</label>
                <br />
                <br />
                <label style={{ color: "grey" }}>Vegetable</label>
              </Grid>
              <Grid item xs={2}>
                <label>Category</label>
                <div className="card">SC</div>
              </Grid>
              <Grid item xs={2}>
                <label>Education</label>
                <div className="card">Primary</div>
              </Grid>
              <Grid item xs={2}>
                <label>Life Insurance</label>
                <div className="card">Yes</div>
              </Grid>
              <Grid item xs={2} ml={10}></Grid>
              <Grid item xs={3}>
                <label>Water Supply System</label>
                <br />
                <br />
                <label style={{ color: "grey" }}>Sprinler</label>
              </Grid>
              <Grid item xs={12} mt={2}>
                <label style={{ fontSize: "18px" }}>
                  Agriculture Land Details
                </label>
              </Grid>
              <Grid item xs={2}>
                <label>Land Type</label>
                <div className="card">Acers</div>
              </Grid>
              <Grid item xs={2}>
                <label>Land Area</label>
                <div className="card">2,000</div>
              </Grid>
              <Grid item xs={2}>
                <label>Under Horticulture</label>
                <div className="card">678</div>
              </Grid>
              <Grid item xs={2}>
                <label>Under F&V</label>
                <div className="card">2456</div>
              </Grid>
              <Grid item xs={3} ml={10}>
                <label>Farming Type</label>
                <br />
                <br />
                <label style={{ color: "grey" }}>Organic</label>
              </Grid>
              <Grid item xs={8} mt={2} flexDirection="row">
                <Card
                  style={{
                    minHeight: "200px",
                  }}
                  elevation={4}
                >
                  <Grid container spacing={1} p={2}>
                    <Grid item xs={6}>
                      <Typography>DBT Amount</Typography>
                      <label>₹1,234</label>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Transaction Date</Typography>
                      <label>20-05-2024</label>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>DBT Utilization</Typography>
                      <label>Organic Fertilizer</label>
                      <label>Soil Management</label>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Unique Farmer Reference No.</Typography>
                      <label>3579</label>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Planting Material</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={2.9}>
                          <label>Seed</label>
                          <div className="card"></div>
                        </Grid>
                        <Grid item xs={2.9}>
                          <label>Quantity</label>
                          <div className="card"></div>
                        </Grid>
                        <Grid item xs={2.9}>
                          <label>Per Unit Price</label>
                          <div className="card"></div>
                        </Grid>
                        <Grid item xs={2.9}>
                          <label>Amount</label>
                          <div className="card"></div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={3} mt={2} ml={6}>
                <img
                  src="/static/map.jpeg"
                  alt="map"
                  height="247px"
                  width="250px"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
