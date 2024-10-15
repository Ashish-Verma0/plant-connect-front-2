import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CachedIcon from "@mui/icons-material/Cached";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./loginStyle.css";
import { FormControlLabel, Stack, Typography } from "@mui/material";
const defaultTheme = createTheme();

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  //captcha
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  function generateCaptchaText() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  }

  function reloadCaptcha() {
    setCaptchaText(generateCaptchaText());
    setUserInput("");
    setIsCorrect(false);
  }

  function handleCaptchaInput(event) {
    setUserInput(event.target.value);
    setIsCorrect(false);
  }

  function handleSubmitCaptcha() {
    if (userInput?.toLowerCase() === captchaText?.toLowerCase()) {
      setIsCorrect(true);
      // onFormSubmit(formData);
    } else {
      setIsCorrect(false);
      reloadCaptcha();
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            height: "50%",
            width: "90%",
            pt: 4,
            pb: 5,
            pl: 8,
            pr: 8,
            mt: 23,
            background: "#fafafa",
            borderRadius: "6px",
            boxShadow: "0px 4px 23px rgba(0, 0, 0, 0.09)",
          }}
          className="loginCard"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack>
              <img src="./static/logo.png" alt="image" width={100} />
            </Stack>
            <label className="heading">Login to Your Account</label>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid item xs={12} container>
                <Grid item lg={12} sm={12} xs={12} mt={1}>
                  <label className="label">Email ID</label>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="email"
                    className="textfield"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={12} mt={1}>
                  <label className="label">Password</label>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="password"
                    type="password"
                    className="textfield"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid container justifyContent="space-around">
                  <Grid item lg={12} sm={6} xs={6} mt={1}>
                    <label className="label">
                      Enter the text shown in above image
                    </label>
                  </Grid>
                  <Grid item lg={5.3} sm={12} xs={12}>
                    <label className="cardCaptcha">{captchaText}</label>
                  </Grid>
                  <Grid item lg={1} sm={12} xs={12} className="cardCaptcha">
                    <CachedIcon
                      onClick={reloadCaptcha}
                      sx={{ cursor: "pointer" }}
                    />
                  </Grid>
                  <Grid item lg={5.3} sm={12} xs={12}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="captcha"
                      className="textfield"
                      placeholder="Captcha Code"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item lg={6} sm={6} xs={12} mt={1}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={<span className="small-text">Remember me</span>}
                    sx={{ color: "grey" }}
                  />
                </Grid>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item lg={5.6} sm={5} xs={12}>
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
                  <Grid item lg={5.6} sm={5} xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        marginTop: "10px",
                        borderRadius: "10px",
                        background: "#FFC268",
                      }}
                    >
                      Go TO Home
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
