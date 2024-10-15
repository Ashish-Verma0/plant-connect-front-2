import React, { useState, useContext, useEffect, useRef } from "react";
import SecureLS from "secure-ls";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from "../../../hooks/useAuth";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import CssBaseline from "@mui/material/CssBaseline";
import { UserContext } from "../../../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import FormControlLabel from "@mui/material/FormControlLabel";
import loginlog from "../../../assets/images/movcdner-logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./loginStyle.css";

const defaultTheme = createTheme();
const ls = new SecureLS({ encodingType: "aes" });

const generateCaptchaText = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const drawCaptcha = (canvasRef, text) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(text, 10, 30);
};

export default function Login() {
  const { getLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [captcha, setCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());

  const canvasRef = useRef(null);

  function generateCaptchaText() {
    const characters =
      "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  }

  function drawCaptcha(text) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, 10, 30);
  }

  function reloadCaptcha() {
    const newCaptchaText = generateCaptchaText();
    setCaptchaText(newCaptchaText);
    drawCaptcha(newCaptchaText);
  }

  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText]);

  const loginFunc = () => {
    let data = {
      user_code: email,
      password: password,
    };
    getLogin(
      data,
      (apiRes) => {
        const data = apiRes.data;
        if (data.status) {
          setAuth({
            ...data.data,
            roles: [data.data.user_role],
          });
          ls.set("authToken", JSON.stringify(data.data));
          enqueueSnackbar(data.data.message || "Server Error", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
            iconVariant: "success",
            autoHideDuration: 2000,
          });

          if (data.data.user_role === "JS") {
            navigate("/da&fw", { replace: true });
            window.history.replaceState("/da&fw");
          } else if (data.data.user_role === "DC") {
            navigate("/dc", { replace: true });
            window.history.replaceState("/dc");
          } else if (data.data.user_role === "SP") {
            navigate("/spPage", { replace: true });
            window.history.replaceState("/spPage");
          } else if (data.data.user_role === "SLA") {
            navigate("/sla", { replace: true });
            window.history.replaceState("/sla");
          } else {
            navigate("/home");
          }
        }
      },
      (apiErr) => {
        if (apiErr.response.status === 400) {
          enqueueSnackbar(apiErr.response.data.message || "Server Error", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
            iconVariant: "success",
            autoHideDuration: 2000,
          });
        } else {
          enqueueSnackbar(apiErr.response.data.message || "Server Error", {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
            iconVariant: "success",
            autoHideDuration: 2000,
          });
        }
      }
    );
  };

  const [formErrors, setFormErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors({ ...formErrors, [name]: "" });
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "captcha") {
      setCaptcha(value);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "User ID is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.captcha) {
      errors.captcha = "Captcha is required";
    } else if (values.captcha !== captchaText) {
      errors.captcha = "Captcha does not match. Please try again.";
      reloadCaptcha();
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate({ email, password, captcha });
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }
    setCaptchaError("");
    if (rememberMe) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
    } else {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("password");
    }
    loginFunc();
  };

  function handleHome() {
    navigate("/home");
  }

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email");
    const savedPassword = sessionStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  // eye button
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="xs"
      >
        <CssBaseline />
        <Card
          sx={{
            p: 4,
            background: "#fafafa",
            borderRadius: "6px",
            boxShadow: "0px 4px 23px rgba(0, 0, 0, 0.09)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack>
              <img src={loginlog} alt="image" width={100} />
            </Stack>
            <Typography variant="h5" className="heading" align="center">
              Login to Your Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="label">User ID</Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="email"
                    className="textfield"
                    placeholder="User ID"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>
                {!!formErrors.email && (
                  <Typography color="error" sx={{ fontSize: "14px", ml: 2 }}>
                    {formErrors.email}
                  </Typography>
                )}
                <Grid item xs={12}>
                  <Typography className="label">Password</Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="textfield"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            style={{
                              outline: "none",
                            }}
                          >
                            {showPassword ? (
                              <Visibility fontSize="small" />
                            ) : (
                              <VisibilityOff fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {!!formErrors.password && (
                  <Typography color="error" sx={{ fontSize: "14px", ml: 2 }}>
                    {formErrors.password}
                  </Typography>
                )}
                <Grid item xs={12} container alignItems="center" spacing={1}>
                  <Grid item xs={12}>
                    <Typography className="label">
                      Enter the text shown in the image
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <canvas
                      className="cardCaptcha"
                      ref={canvasRef}
                      width="130"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <CachedIcon
                      onClick={reloadCaptcha}
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="captcha"
                      className="textfield"
                      placeholder="Captcha Code"
                      value={captcha}
                      onChange={handleChange}
                    />
                  </Grid>

                  {captchaError && (
                    <Typography color="error" sx={{ fontSize: "14px", ml: 1 }}>
                      {captchaError}
                    </Typography>
                  )}
                  {!!formErrors.captcha && (
                    <Typography color="error" sx={{ fontSize: "14px", ml: 2 }}>
                      {formErrors.captcha}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    }
                    label={<span className="small-text">Remember me</span>}
                    sx={{ color: "grey" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      marginTop: "10px",
                      borderRadius: "10px",
                      background: "#1bc68b",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      marginTop: "10px",
                      borderRadius: "10px",
                      background: "#FFC268",
                    }}
                    onClick={handleHome}
                  >
                    Go To Home
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
