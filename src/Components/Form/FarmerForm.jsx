import * as React from "react";
import Dialog from "@mui/material/Dialog";
import CropMap from "../CropComponents/CropMap";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./farmerstyle.css";

export default function FarmerForm({ open, handleClose, data = {} }) {
  return (
    <React.Fragment>
      {data && (
        <Dialog
          open={open}
          fullWidth
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: "12px",
              position: "absolute",
              zIndex: "9999",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px",
            }}
            id="customized-dialog-title"
          >
            {data.FarmerName || "Farmer Name"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2}>
                {/* Aadhaar and Father's Name */}
                <Grid item lg={4} sm={6} xs={12}>
                  <Typography className="form-label">
                    Aadhaar Card Number
                  </Typography>
                  <div className="form-value">{data.AdharNo}</div>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Typography className="form-label">Father's Name</Typography>
                  <div className="form-value">{data.FatherName}</div>
                </Grid>

                {/* Personal Details */}
                <Grid item xs={12}>
                  <Typography className="form-heading">
                    Personal Details
                  </Typography>
                </Grid>

                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Contact</Typography>
                  <div className="form-value">{data.MobileNo}</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Gender</Typography>
                  <div className="form-value">
                    {data.Gender === "M"
                      ? "Male"
                      : data.Gender === "F"
                      ? "Female"
                      : "Other"}
                  </div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Category</Typography>
                  <div className="form-value">{data.CasteCatName}</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Village</Typography>
                  <div className="form-value">{data.VillageName}</div>
                </Grid>

                {/* Agriculture Land Details */}
                <Grid item xs={12}>
                  <Typography className="form-heading">
                    Agriculture Land Details
                  </Typography>
                </Grid>

                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Land Type</Typography>
                  <div className="form-value">Acres</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Land Area</Typography>
                  <div className="form-value">{data.TotalArea}</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">
                    Under Horticulture
                  </Typography>
                  <div className="form-value">{data.Horticulture || "0"}</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Under F&V</Typography>
                  <div className="form-value">{data.FruitVeg || "0"}</div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Farming Type</Typography>
                  <div className="form-value">
                    {data.FarmingType || "Organic"}
                  </div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <Typography className="form-label">Phase</Typography>
                  <div className="form-value">{data.Phase || "Phase IV"}</div>
                </Grid>

                {/* Scheme Name */}
                <Grid item lg={2} sm={4} xs={12}>
                  <Typography className="form-label">Scheme Name</Typography>
                  <div className="form-value">{data.SchemeName}</div>
                </Grid>
                <Grid item lg={10} sm={6} xs={12}></Grid>

                {/* DBT Information inside Planting Material */}
                <Grid item lg={8} sm={8} xs={12} mt={2}>
                  <Card
                    className="dbt-card"
                    sx={{
                      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.09)",
                    }}
                  >
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={6}>
                        <Typography className="form-label">
                          DBT Amount
                        </Typography>
                        <Typography className="form-label">₹0</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className="form-label">
                          Transaction Date
                        </Typography>
                        <Typography className="form-label">
                          20-05-2024
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className="form-label">
                          DBT Utilization
                        </Typography>
                        <Typography className="form-label">
                          Organic Fertilizer
                        </Typography>
                        <Typography className="form-label">
                          Soil Management
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className="form-label">
                          Unique Farmer Reference No.
                        </Typography>
                        <Typography className="form-label">
                          {data.FarmerCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="form-heading">
                          Planting Material Details
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} xs={6}>
                        <Typography className="form-label">Seeds</Typography>
                        <div className="form-value">{data.Seeds || "N/A"}</div>
                      </Grid>
                      <Grid item lg={3} sm={3} xs={6}>
                        <Typography className="form-label">Quantity</Typography>
                        <div className="form-value">{data.Quantity || "0"}</div>
                      </Grid>
                      <Grid item lg={3} sm={3} xs={6}>
                        <Typography className="form-label">
                          Per Unit Price
                        </Typography>
                        <div className="form-value">
                          {data.UnitPrice || "0"}
                        </div>
                      </Grid>
                      <Grid item lg={3} sm={3} xs={6}>
                        <Typography className="form-label">Amount</Typography>
                        <div className="form-value">{data.Amount || "0"}</div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                {/* Crop Map */}
                <Grid item lg={4} sm={4} xs={12} mt={2}>
                  {data?.PolygonShape && (
                    <CropMap
                      polygon={data.PolygonShape.map((coord) => ({
                        lat: coord.lat,
                        lng: coord.lng,
                      }))}
                      lat={data.PolygonShape[0]?.lat}
                      lng={data.PolygonShape[0]?.lng}
                    />
                  )}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}
