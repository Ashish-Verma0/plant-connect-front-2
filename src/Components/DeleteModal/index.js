import React from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
const DeleteModal = ({
  open,
  data,
  title,
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleOkay = () => alert("Please add handle success function"),
  handleClose = () => alert("Please add handle cancel function"),
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ backgroundColor: "rgba(255,0,0,0,0.2)" }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this notification?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {buttonCancelTitle}
        </Button>
        <Button onClick={() => handleOkay(data)} variant="outlined">
          {buttonSuccessTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
