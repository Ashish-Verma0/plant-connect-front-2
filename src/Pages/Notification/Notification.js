import React, { useEffect, useRef, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import SecureLS from "secure-ls";
import CloseIcon from "@mui/icons-material/Close";
import NotificationTable from "./NotificationTable";
import DeleteModal from "../../Components/DeleteModal";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import NotificationCreateModal from "./NotificationCreateModal";
import "./notification.css";
const headCells = [
  { id: "id", label: "S.No" },
  { id: "notification", label: "Notification" },
  { id: "category", label: "Category" },
  { id: "createDate", label: "Created Dates" },
  { id: "action", label: "Action" },
];

const StyledBreadcrumb = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    textDecoration: "underline",
  },
  "& .MuiSvgIcon-root": {
    marginLeft: theme.spacing(0.5),
  },
}));

export default function Notification({ loading }) {
  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      // console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };
  const userRole = fetchToken()?.user_role;
  const token = fetchToken()?.token;
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [jsNotification, setJsNotification] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const categories = {
    JS: ["Guidelines", "MOM", "Instructions", "Progress Reports", "Any Other"],
    SLA: [
      "Any Other",
      "Physical",
      "Financial",
      "Market Activities",
      "Infrastructure",
    ],
  };
  const menuItems = categories[userRole] || []; // Get the relevant categories based on the role

  const [selectedValue, setSelectedValue] = useState(menuItems[0]);

  const [openDelete, setOpenDelete] = React.useState({
    status: false,
    data: {},
  });
  const [newEntry, setNewEntry] = useState({
    notification: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
    handleClose();
  };

  const handleDeleteClick = (id) => {
    setOpenDelete({
      status: true,
      data: { id },
    });
  };
  const handleCloseDelete = () => {
    setOpenDelete({
      status: false,
      data: "",
    });
  };

  //file upload
  const inputRef = useRef();

  const handleFileChange = (event) => {
    setFileUpload(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setFileUpload(null);
  };
  //file upload

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setNewEntry({
      notification: row.Notification,
    });
    setSelectedValue(row.Category);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
    setFileUpload(null);
  };

  const handleCreateNewClick = () => {
    setSelectedRow(null);
    setNewEntry({ notification: "", createDate: "" });
    setModalOpen(true);
  };

  //GetTableData
  useEffect(() => {
    fetchNotification();
  }, []);
  const fetchNotification = async () => {
    let url;
    if (userRole === "SLA") {
      url = `${process.env.REACT_APP_API_URL_LOCAL}/getNotificationBySLA`;
    } else if (userRole === "JS") {
      url = `${process.env.REACT_APP_API_URL_LOCAL}/getNotification`;
    }
    try {
      const response = await axios.get(url);
      if (userRole === "SLA") {
        setJsNotification(response.data.data);
      } else {
        let fetchDetails = response.data.data;

        let array = fetchDetails.flatMap((item) =>
          item.notifications.map((notification) => ({
            ...notification,
            Category: item.Category,
          }))
        );

        setJsNotification(array);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "server error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  //handleSubmit
  const handlePostData = async () => {
    try {
      const formData = new FormData();

      formData.append("notification", newEntry?.notification);
      formData.append("Category", selectedValue);

      if (fileUpload) {
        formData.append("file", fileUpload);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/createNotification`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchNotification();
        setModalOpen(false);
        enqueueSnackbar(response.data.message || "Please Select File", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        autoHideDuration: 2000,
      });
    }
  };

  //Edit
  const handleEditSubmit = async () => {
    try {
      const data = {
        notification: newEntry?.notification,
        notificationId: selectedRow.id,
        Category: selectedValue,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_LOCAL}/updateNotification`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(response.data.message || "Server Error", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
        fetchNotification();
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  //Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/deleteNotification`,
        {
          data: { notificationId: id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        handleCloseDelete();
        fetchNotification();
        enqueueSnackbar(response.data.message || "Server Error", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  const dropdownArray = [{ name: "dropdown" }, { name: "select" }];
  return (
    <div>
      <DeleteModal
        open={openDelete.status}
        title={"Confirm Delete"}
        handleOkay={handleDelete}
        data={openDelete?.data?.id}
        handleClose={handleCloseDelete}
      />
      <Grid
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#16b566",
          height: "3rem",
        }}
      ></Grid>
      <div style={{ padding: "20px 33px 20px 33px" }}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewClick}
            style={{ borderRadius: "20px", color: "white" }}
          >
            Create New
          </Button>
        </Grid>
        <NotificationTable
          loading={loading}
          headCells={headCells}
          tableData={jsNotification}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
          handleEditSubmit={handleEditSubmit}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
      <Grid item>
        <NotificationCreateModal
          menuItems={menuItems}
          anchorEl={anchorEl}
          newEntry={newEntry}
          inputRef={inputRef}
          modalOpen={modalOpen}
          fileUpload={fileUpload}
          selectedRow={selectedRow}
          handleClose={handleClose}
          setNewEntry={setNewEntry}
          handleClick={handleClick}
          dropdownArray={dropdownArray}
          selectedValue={selectedValue}
          handlePostData={handlePostData}
          handleRemoveFile={handleRemoveFile}
          handleFileChange={handleFileChange}
          StyledBreadcrumb={StyledBreadcrumb}
          handleModalClose={handleModalClose}
          handleEditSubmit={handleEditSubmit}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Grid>
    </div>
  );
}
