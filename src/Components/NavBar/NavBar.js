import React, { useState } from "react";
import "./NavBar.css";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { closeSnackbar, useSnackbar } from "notistack";
import MOVCDNERlogo_2 from "../../assets/images/MOVCDNERlogo_2.png";
import headerlogo_1 from "../../assets/images/headerlogo_1.png";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import {
  Grid,
  List,
  Stack,
  Drawer,
  Dialog,
  Button,
  Divider,
  useTheme,
  ListItem,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  useMediaQuery,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import SecureLS from "secure-ls";
import useAuth from "../../hooks/useAuth";

const ls = new SecureLS({ encodingType: "aes" });

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { auth, setAuth, persist } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      // console.error("Could not parse JSON", error);
    }
    return token;
  };
  let userDetails = fetchToken();

  const handleLogout = () => {
    ls.removeAll();
    setAuth(null);
    navigate("/login", { replace: true });
    localStorage.clear();
    localStorage.removeItem("authToken");
    if (userDetails) {
      let username = userDetails?.message.split(",")[0];
      enqueueSnackbar(`${username}, Logout Successfully.`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        autoHideDuration: 2000,
        iconVariant: "success",
        onClose: () => {},
      });
    }
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    handleLogoutDialogClose();
  };

  const isActive = (path) => location.pathname === path;

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems =
    userDetails && userDetails.user_role === "JS"
      ? [
          { text: "Home", path: "/da&fw" },
          { text: "About The Scheme", path: "/about" },
          { text: "Contact Us", path: "/contact" },
          { text: "Notification", path: "/notification" },
        ]
      : userDetails && userDetails.user_role === "DC"
      ? [
          { text: "Home", path: "/dc" },
          { text: "About The Scheme", path: "/about" },
          { text: "Contact Us", path: "/contact" },
        ]
      : userDetails && userDetails.user_role === "SP"
      ? [
          { text: "Home", path: "/spPage" },
          { text: "About The Scheme", path: "/about" },
          { text: "Contact Us", path: "/contact" },
        ]
      : userDetails && userDetails.user_role === "SLA"
      ? [
          { text: "Home", path: "/sla" },
          { text: "About The Scheme", path: "/about" },
          { text: "Contact Us", path: "/contact" },
          { text: "Notification", path: "/notification" },
        ]
      : [
          { text: "Home", path: "/home" },
          { text: "About The Scheme", path: "/about" },
          { text: "Contact Us", path: "/contact" },
        ];

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <Stack className="card-container">
          <Grid container className="header" alignItems="center">
            <Grid item>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "68px",
                }}
                gap={2}
              >
                <Grid item>
                  <Grid item className="ministry-logo1">
                    <Grid item>
                      <img
                        src={headerlogo_1}
                        style={{ height: "3rem" }}
                        alt="emblem"
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        className="ministry-text"
                        fontSize={13}
                        color="text.secondary"
                      >
                        Government of India <br />
                        Ministry of Agriculture and Farmers Welfare
                        <br />
                        Department of Agriculture and Farmers Welfare
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider
                  style={{ backgroundColor: "white", height: "62px" }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Grid item>
                  <Grid container className="ministry-logo2">
                    <Grid item>
                      <img
                        src="./planet.jpg"
                        style={{ height: "3rem" }}
                        alt="movcd"
                      />
                    </Grid>
                    <Grid item>
                      <Typography fontSize={13} color="text.secondary">
                        Plant Connect
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {!isMobile && (
              <Grid item>
                <Grid container gap={2}>
                  <Grid item className="btn-dwnld">
                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IconButton style={{ color: "white" }}>
                        <DownloadRoundedIcon />
                      </IconButton>
                      <Typography style={{ color: "white" }}>
                        Download
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className="btn-login"
                    onClick={() => (userDetails ? null : navigate("/login"))}
                  >
                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IconButton style={{ color: "white" }}>
                        <AccountCircleRoundedIcon />
                      </IconButton>
                      <Typography style={{ color: "white" }}>
                        {userDetails
                          ? userDetails.user_role === "JS"
                            ? "DA & FW"
                            : userDetails.user_role === "DC"
                            ? "DC"
                            : userDetails.user_role === "SP"
                            ? "SP"
                            : userDetails.user_role === "SLA"
                            ? "SLA"
                            : "Login"
                          : "Login"}
                      </Typography>
                    </Grid>
                  </Grid>
                  {userDetails && (
                    <Grid item className="btn-logout">
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={handleLogoutDialogOpen}
                      >
                        <IconButton style={{ color: "white" }}>
                          <LogoutIcon />
                        </IconButton>
                        <Typography style={{ color: "white" }}>
                          Logout
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
            {isMobile && (
              <Grid item>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
          {!isMobile && (
            <Grid container item xs={12} gap={2} className="navbar-container">
              {menuItems.map((item, index) => (
                <Grid item display="flex" flexDirection="row" key={index}>
                  <Button
                    onClick={() => navigate(item.path)}
                    style={{
                      whiteSpace: "nowrap",

                      textTransform: "none",
                      backgroundColor: isActive(item.path)
                        ? "var(--green, #426d52)"
                        : "inherit",
                      color: isActive(item.path)
                        ? "var(--white, #FAFAFA)"
                        : "grey",
                    }}
                    className="navbar-button"
                    variant="contain"
                  >
                    {item.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </HideOnScroll>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="mobile-nav-container"
      >
        <Grid
          sx={{ height: "100%", backgroundColor: "var(--sea-green, #d4ecde)" }}
        >
          <List>
            <ListItem>
              <IconButton
                onClick={() => (userDetails ? null : navigate("/login"))}
              >
                <AccountCircleRoundedIcon />
              </IconButton>
              <ListItemText
                primary={userDetails ? userDetails.user_role : "Login"}
              />
            </ListItem>
            {menuItems.map((item, index) => (
              <ListItem
                button
                style={{
                  backgroundColor: isActive(item.path)
                    ? "var(--green, #43C17A)"
                    : "inherit",
                  color: isActive(item.path)
                    ? "var(--white, #FAFAFA)"
                    : "inherit",
                }}
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {userDetails && (
              <ListItem button onClick={handleLogoutDialogOpen}>
                <LogoutIcon style={{ marginRight: 10 }} />
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Grid>
      </Drawer>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
