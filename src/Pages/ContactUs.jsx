import React from "react";
import "./style.css";
import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import KeyStrategiesFrame from "../../src/assets/images/KeyStrategiesFrame.png";
import ContactUsCom from "../Components/ContactUS/ContactUsCom";
const ContactUs = () => {
  const contactsTable = [
    {
      slNo: "01",
      state: "Assam",
      sla: "Assam State Organic Mission Agency",
      concernedPerson: "Smt. Laxmi Dutta",
      designation:
        "Assistant Director, Department of Horticulture and Food Processing",
      email: "movcdassam@gmail.com",
    },
    {
      slNo: "02",
      state: "Meghalaya",
      sla: "Department of Horticulture & Soil Conservation",
      concernedPerson: "Smt. D. Barisha Mukhim",
      designation: "Agriculture Marketing officer",
      email: "meghmissionorganic@gmail.com",
    },
    {
      slNo: "03",
      state: "Arunachal Pradesh",
      sla: "Arunachal Pradesh Agriculture Marketing Board",
      concernedPerson: "Shri Okit Palling",
      designation: "CEO, APAMB",
      email: "okitpalling@gmail.com",
    },
    {
      slNo: "04",
      state: "Manipur",
      sla: "Manipur Organic Mission Agency",
      concernedPerson: "Shri Donald Soubham",
      designation: "Project Director, MOMA",
      email: "movcdap@gmail.com",
    },
    {
      slNo: "05",
      state: "Mizoram",
      sla: "Mission Organic Mizoram (MOM)",
      concernedPerson: "Smt H. Zodinpuii",
      designation: "State Coordinator",
      email: "manipurorganic@gmail.com",
    },
    {
      slNo: "06",
      state: "Nagaland",
      sla: "Department of Agriculture",
      concernedPerson: "Dr. James K. Chawang",
      designation: "Deputy Director, Department of Agriculture, Nagaland",
      email: "movcdmiz@gmail.com",
    },
    {
      slNo: "07",
      state: "Tripura",
      sla: "Tripura State Organic Farming Development Agency",
      concernedPerson: "Shri Rajib Debbarma",
      designation: "Nodal Officer",
      email: "nglorgmiss@gmail.com",
    },
    {
      slNo: "08",
      state: "Sikkim",
      sla: "Sikkim Organic Farming Development Agency",
      concernedPerson: "Smt. Rachna Gurung",
      designation: "Additional Director, Department of Agriculture",
      email: "tsofda@gmail.com",
    },
  ];
  const headCells = [
    { id: "id", label: "S.No" },
    { id: "State", label: "State" },
    { id: "SLA", label: "SLA" },
    { id: "Concerned person", label: "Concerned person" },
    { id: "Designation", label: "Designation" },
    { id: "Email id", label: "Email id" },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#16b566",
          height: "3rem",
        }}
      >
        <Grid item>
          <Typography
            variant="h6"
            style={{
              color: "#fff",
              textAlign: "center",
              paddingLeft: "40px",
              fontSize: "22px",
            }}
          >
            Contact Us
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          backgroundColor: "#CCFFCC",
          padding: "25px",
          m: 4,
          borderRadius: "5px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="body1" color="textSecondary">
              Smt. Hari Kiran Gurla, Under Secretary (Organics)
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              textAlign: "center",
            }}
          >
            <Link
              href="mailto:Kiran.gurla@nic.in"
              underline="hover"
              style={{ color: "blue" }}
            >
              Kiran.gurla@nic.in
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Grid item m={4}>
        <ContactUsCom
          data={contactsTable}
          loading={false}
          headCells={headCells}
        />
      </Grid>
    </React.Fragment>
  );
};
export default ContactUs;
