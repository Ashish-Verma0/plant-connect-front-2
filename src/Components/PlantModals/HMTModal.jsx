import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField, Grid, IconButton, Select, MenuItem } from "@mui/material";
import PlantModalTable from "../../Home/PlantTables/PlantModalTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HMTModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVarietyChange = (event) => {
    setSelectedVariety(event.target.value);
  };

  const field = [
    {
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Farmer Form
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            position: "relative",
          }}
          id="customized-dialog-title"
        >
          <span>Form</span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={0.1}>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Farmer Name"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Mobile Number"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Farmer Lat."
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Farmer Long"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Farmer Pin code"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Aadhaar Number"
                size="small"
                type="password"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <TextField
                fullWidth
                placeholder="Farmer Address"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Select
                fullWidth
                value={selectedVariety}
                onChange={handleVarietyChange}
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Variety"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={6}>
              <Select
                fullWidth
                value={selectedVariety}
                onChange={handleVarietyChange}
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Variety"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Select
                fullWidth
                value={selectedVariety}
                onChange={handleVarietyChange}
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Variety"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default HMTModal;
