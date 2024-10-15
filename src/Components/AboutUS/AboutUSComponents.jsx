import React from "react";
import aboutUS from "../../assets/images/aboutUS.png";
import aboutSPImage from "../../assets/images/aboutSPImage.png";
import KeyStrategiesFrame from "../../assets/images/KeyStrategiesFrame.png";
import "./aboutUs.css";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ShivrajSinghChouhan from "../../assets/images/ShivrajSinghChouhan.png";
import DEVESHCHATURVEDIIASUP from "../../assets/images/DEVESHCHATURVEDIIASUP.png";
import yogitarana from "../../assets/images/yogitarana.png";
import { Stack } from "@mui/system";
const AboutUSComponents = () => {
  const getDescription = (strategy) => {
    switch (strategy) {
      case "Mobilization":
        return "Mobilizing farmers with technical, financial, and infrastructural support for organic production and certification.";
      case "Establishment":
        return "Setting up facilities for collection, aggregation, and processing to boost productivity and market access.";
      case "Facilitation":
        return "Developing organic parks and zones with modern infrastructure to support the full value chain.";
      default:
        return "";
    }
  };

  const data = [
    {
      img: ShivrajSinghChouhan,
      text: "Shri Shivraj Singh Chouhan Hon'ble Minister, Agriculture & Farmers Welfare",
    },
    {
      img: DEVESHCHATURVEDIIASUP,
      text: "Shri Devesh Chaturvedi Hon'ble Secretary, DA&FW",
    },
    {
      img: yogitarana,
      text: "Dr. Yogita Rana, Hon'ble Joint Secretary (INM)",
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth={false} sx={{ mt: 4, mb: 6, width: "98%" }}>
        {/* Content Section with Side Image */}
        <Grid container spacing={14}>
          <Grid item xs={12} md={12}>
            <Box mt={2} mb={2}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="about-heading"
                    style={{ fontSize: "20px" }}
                    mb={2}
                  >
                    Mission Organic Value Chain Development for North Eastern
                    Region (MOVCDNER)
                  </Typography>

                  <Stack
                    paragraph
                    className="about-text"
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      mb: 4,
                    }}
                  >
                    The Mission Organic Value Chain Development for North
                    Eastern Region (MOVCDNER) is a pivotal initiative launched
                    by the Ministry of Agriculture and Farmer Welfare to harness
                    the immense potential of organic farming in the North
                    Eastern states of India. Implemented across Arunachal
                    Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland,
                    Sikkim, and Tripura, the mission is designed to develop
                    certified organic production in a value chain mode, ensuring
                    a seamless connection between organic growers and consumers.
                  </Stack>

                  <Typography
                    variant="h5"
                    gutterBottom
                    className="about-heading"
                    mb={2}
                  >
                    Our Vision
                  </Typography>
                  <Stack
                    paragraph
                    className="about-text"
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      mb: 4,
                    }}
                  >
                    MOVCDNER is committed to transforming conventional farming
                    practices into high-value, self-sustaining organic
                    enterprises. By promoting organic farming, we aim to
                    position the North Eastern Region as a major supplier of
                    organic commodities in both national and international
                    markets.
                  </Stack>

                  <Typography
                    variant="h5"
                    gutterBottom
                    className="about-heading"
                    mb={2}
                  >
                    Mission Goals
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      padding: 0.7,
                      bgcolor: "background.paper",
                      mb: 4,
                    }}
                  >
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        listStyleType: "disc",
                      }}
                    >
                      {[
                        "Establishing institutional systems at both central and state levels to promote organic farming.",
                        "Empowering 30,000 to 50,000 farmers by forming 100 Farmer Producer Companies (FPCs).",
                        "Transitioning subsistence farming to a commercial organic farming model with full end-to-end value chain support.",
                        "Positioning the North Eastern Region as a key supplier of organic products to national and global markets.",
                      ].map((goal) => (
                        <li
                          key={goal}
                          style={{
                            marginBottom: "8px",
                            paddingLeft: "5px",
                          }}
                          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          className="about-text"
                        >
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      maxWidth: "100%",
                      overflow: "visible",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={aboutUS}
                      alt="Organic Value Chain"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginLeft: "0px",
                      }}
                      className="responsive-image"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Key Strategies */}
            <Box mb={4}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                className="about-heading"
                mb={2}
              >
                Key Strategies
              </Typography>
              <Typography
                paragraph
                align="center"
                className="about-text"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  paddingX: { xs: 2, md: 0 },
                }}
              >
                To achieve these goals, MOVCDNER employs a strategic approach
                that includes:
              </Typography>

              <Grid container spacing={2} justifyContent="center" mt={1}>
                {["Mobilization", "Establishment", "Facilitation"].map(
                  (strategy, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      display="flex"
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: "16px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: { xs: "250px", sm: "300px", md: "350px" },
                          width: { xs: "100%", sm: "300px", md: "400px" },
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <img
                          src={KeyStrategiesFrame}
                          alt={strategy}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            textAlign: "center",
                            borderRadius: "8px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            className="about-heading"
                            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                          >
                            {strategy}
                          </Typography>
                          <Typography
                            paragraph
                            className="about-text"
                            sx={{
                              fontSize: {
                                xs: "0.6rem",
                                sm: "0.8rem",
                                md: "0.9rem",
                              },
                              maxWidth: "90%",
                              margin: "0 auto",
                            }}
                          >
                            {getDescription(strategy)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>

            {/* AIM To*/}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <div>
                <Box mb={4}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="about-heading"
                    mb={2}
                  >
                    AIM To
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      padding: 0.7,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        listStyleType: "disc",
                      }}
                    >
                      {[
                        "The mission operates in a structured, mission-mode approach. At the national level, the National Advisory Committee (NAC), Executive Committee (EC), and Mission Monitoring Committee (MMC) oversee its implementation. Each state has a designated State Level Executive Committee (SLEC), guided by a State Lead Agency that is responsible for execution under the supervision of the Department of Agriculture/Horticulture.",
                        "Together, we are fostering sustainable agriculture practices, empowering farmers, and building a future where organic farming thrives in the North Eastern Region.",
                      ].map((goal) => (
                        <li
                          key={goal}
                          style={{
                            marginBottom: "8px",
                            paddingLeft: "5px",
                          }}
                          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          className="about-text"
                        >
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Box>

                {/* Implementation Structure */}
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="about-heading"
                    mb={2}
                  >
                    Implementation Structure
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      padding: 0.7,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        listStyleType: "disc",
                      }}
                    >
                      {[
                        "Building Organic Value Chains: Our mission focuses on developing crop-specific organic value chains that address the entire spectrum, from organic crop production and wild crop harvesting to organic livestock management and marketing of certified organic products.",
                        "Empowering Farmers: We aim to organize farmers into Farmer Interest Groups (FIGs) and federate them into Farmer Producer Organizations (FPOs), allowing them to take ownership of their organic enterprises and participate in sustainable commercial farming.",
                        "Creating Market Access: Through partnerships between farmers and organic businesses, we are opening up avenues for organic products to reach domestic and export markets, fostering long-term trade relations.",
                      ].map((goal) => (
                        <li
                          key={goal}
                          style={{
                            marginBottom: "8px",
                            paddingLeft: "5px",
                          }}
                          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          className="about-text"
                        >
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Box>
              </div>
              <Box>
                <img
                  src={aboutSPImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* Bottom Section with Images */}
        <Box mt={6}>
          <Grid container spacing={4} justifyContent="center">
            {data.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                display="flex"
                justifyContent="center"
              >
                <Card
                  sx={{
                    backgroundColor: "#16b566",
                    height: "400px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    },
                    borderRadius: "12px",
                    width: { xs: "400px", sm: "330px", md: "380px" },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "16px",
                    }}
                  >
                    <Box
                      height={220}
                      width="100%"
                      sx={{
                        backgroundColor: "#ffffff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        height: "100%",

                        boxShadow: "inset 0 1px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.text}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          borderRadius: "8px",
                          padding: "5px",
                        }}
                      />
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {item.text.split(" Hon'ble")[0]}{" "}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="white"
                        sx={{ marginBottom: 0 }}
                        mt={1}
                      >
                        Hon'ble {item.text.split(" Hon'ble")[1]}{" "}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AboutUSComponents;
