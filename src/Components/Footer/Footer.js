import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import movcd from "../../assets/images/movcdner-logo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="Footercontainer">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
          }}
          spacing={4}
        >
          <Grid item lg={4} xs={12} sm={4} className="displayFlex"></Grid>
          <Grid item lg={8} xs={12} sm={4}>
            <div className="row">
              <div className="footer-col">
                <h4>company</h4>
                <ul>
                  <li>
                    <a href="#">about us</a>
                  </li>
                  <li>
                    <a href="#">our services</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">affiliate program</a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}
