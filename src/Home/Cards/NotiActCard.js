import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

let notCard = [
  {
    title: "Notification by DA&FW",
    data: [
      {
        notifi: "MOVCDNER MIS implementation and data entry in the NER states",
        desc: "By: DA & FW  On: 20-05-2024",
      },
      {
        notifi: "MOVCDNER MIS implementation and data entry in the NER states",
        desc: "By: DA & FW  On: 20-05-2024",
      },
      {
        notifi: "MOVCDNER MIS implementation and data entry in the NER states",
        desc: "By: DA & FW  On: 20-05-2024",
      },
    ],
  },
];

const activitiesCard = [
  {
    title: "Activities by State Lead Agencies",
    data: [
      {
        notifi:
          "Setting up of input delivery distribution and agri machinery custom hiring centre (By: ASSAM)",
        desc: "On:20-05-2024",
      },
      {
        notifi:
          "Setting up of input delivery distribution and agri machinery custom hiring centre (By: ASSAM)",
        desc: "On:20-05-2024",
      },
    ],
  },
];

export default function NotiActCard() {
  return (
    <>
      <Grid item>
        <Grid container spacing={2} direction="column">
          {notCard.map((ele, ind) => (
            <Grid item xs={12} key={`title-${ind}`}>
              <Card
                sx={{
                  borderRadius: "12px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={6}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    padding: "10px 18px",
                    color: "white",
                    alignItems: "center",
                    backgroundColor: "#88AEFA",
                  }}
                >
                  <Typography variant="h6" component="div">
                    {ele.title}
                  </Typography>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    padding: "0px 0px 0px 0px",
                    flexGrow: 1,
                    maxHeight: "50%",
                  }}
                >
                  {ele.data.map((item, i) => (
                    <CardContent
                      key={`content-${i}`}
                      sx={{
                        paddingBottom: "2px",
                        paddingTop: "8px", // Adjust to reduce spacing between items
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <Grid item xs={12} sm={8}>
                          <Typography
                            sx={{
                              fontWeight: 450,
                              fontSize: {
                                xs: "14px",
                                sm: "16px",
                                md: "17px",
                              },
                            }}
                            // variant="body2"
                          >
                            {item.notifi}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{
                              fontWeight: 450,
                              fontSize: {
                                xs: "14px",
                                sm: "16px",
                                md: "17px",
                              },
                            }}
                            // variant="body2"
                          >
                            {item.desc}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  ))}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          {activitiesCard.map((ele, ind) => (
            <Grid item xs={12} key={`title-${ind}`}>
              <Card
                sx={{
                  borderRadius: "12px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={6}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    padding: "10px 18px",
                    color: "white",
                    alignItems: "center",
                    backgroundColor: "#88AEFA",
                  }}
                >
                  <Typography variant="h6" component="div">
                    {ele.title}
                  </Typography>
                </div>
                <div
                  style={{ minHeight: "50%" }}
                  // style={{
                  //   overflowY: ele.data.length > 2 ? "auto" : "visible",
                  //   padding: "0px 0px 0px 0px",
                  //   flexGrow: 1,
                  //   maxHeight: ele.data.length > 2 ? "180px" : "none",
                  // }}
                >
                  {ele.data.map((item, i) => (
                    <CardContent
                      key={`content-${i}`}
                      sx={{
                        paddingBottom: "2px",
                        paddingTop: "8px", // Adjust to reduce spacing between items
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <Grid item xs={12} sm={8}>
                          <Typography
                            sx={{
                              fontWeight: 450,
                              fontSize: {
                                xs: "14px",
                                sm: "16px",
                                md: "17px",
                              },
                            }}
                            // variant="body2"
                          >
                            {item.notifi}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{
                              fontWeight: 450,
                              fontSize: {
                                xs: "14px",
                                sm: "16px",
                                md: "17px",
                              },
                            }}
                            // variant="body2"
                          >
                            {item.desc}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  ))}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
