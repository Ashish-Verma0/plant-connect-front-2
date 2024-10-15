import React from "react";
import {
  Card,
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tooltip,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
const NotificationCreateModal = ({
  menuItems,
  inputRef,
  modalOpen,
  handleModalClose,
  selectedValue,
  selectedRow,
  anchorEl,
  handleClose,
  newEntry,
  fileUpload,
  handleMenuItemClick,
  setNewEntry,
  StyledBreadcrumb,
  handleClick,
  handleEditSubmit,
  handlePostData,
  handleFileChange,
  handleRemoveFile,
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={modalOpen} onClose={handleModalClose}>
      <DialogContent>
        <DialogContentText>
          {selectedRow
            ? "Edit the details of the notification."
            : "Enter the details for the new notification."}
          <div>
            <StyledBreadcrumb onClick={handleClick}>
              {selectedValue}
              <ExpandMoreIcon />
            </StyledBreadcrumb>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem key={item} onClick={() => handleMenuItemClick(item)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </DialogContentText>
        <TextField
          margin="dense"
          multiline
          rows={5}
          label="Notification"
          placeholder="Write your notification here...."
          fullWidth
          value={newEntry.notification}
          sx={{ width: "100%" }}
          onChange={(e) =>
            setNewEntry({ ...newEntry, notification: e.target.value })
          }
        />
        <DialogContentText mt={0.7} mb={1}>
          Upload File
        </DialogContentText>
        <div className="kb-file-upload">
          <div className="file-upload-box">
            {!fileUpload ? (
              <React.Fragment>
                <input
                  type="file"
                  ref={inputRef}
                  id="fileupload"
                  accept=".pdf"
                  className="file-upload-input"
                  onChange={handleFileChange}
                />
                <span className="file-link">
                  <AddIcon />
                </span>
              </React.Fragment>
            ) : (
              <div
                className="file-upload-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{fileUpload.name}</span>
                <Tooltip title="Cancel File" arrow>
                  <span
                    onClick={handleRemoveFile}
                    style={{
                      cursor: "pointer",
                      margin: "6px 0px 0px 8px",
                    }}
                  >
                    <CancelIcon />
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingBottom: "20px",
        }}
      >
        <Card
          style={{
            width: "150px",
            color: "#FAFAFA",
            display: "flex",
            justifyContent: "center",
            borderRadius: "12px",
          }}
          elevation={2}
        >
          <Button onClick={handleModalClose} style={{ color: "#A52B0E" }}>
            Cancel
          </Button>
        </Card>
        <Card
          style={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "12px",
          }}
          elevation={2}
        >
          <Button
            onClick={selectedRow ? handleEditSubmit : handlePostData}
            style={{ color: "#226AFA" }}
          >
            {selectedRow ? "Save" : "Submit"}
          </Button>
        </Card>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationCreateModal;
