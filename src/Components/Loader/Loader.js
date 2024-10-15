import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ size = 90, thickness = 5, color = "success", ...props }) => {
  return (
    <Box
      //   display="flex"
      //   width="100%"
      //   justifyContent="center"
      //   alignItems="center"
      //   height="100%"
      //   marginTop="-6rem"
      {...props}
    >
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
};

export default Loader;
