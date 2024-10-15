import { Grid } from "@mui/material";
import React from "react";
import FarmerForm from "../Components/Form/FarmerForm";
import FarmerTable from "../Components/JSComponents/FarmerTable";
// import FarmerForm from "../Components/CropComponents/";

const FarmerPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const FarmerTableData = [
    {
      Farmer_Code: "5484",
      Farmer_Name: "Jitendra Kumar",
      area: 0.3,
      DBT_amount: "2,234",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5493",
      Farmer_Name: "Test",
      area: 1,
      DBT_amount: "1,545",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5443",
      Farmer_Name: "Rajesh",
      area: 5,
      DBT_amount: "2,434",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5443",
      Farmer_Name: "aman",
      area: 1,
      DBT_amount: "2,804",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5443",
      Farmer_Name: "testing",
      area: 1,
      DBT_amount: "4,704",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5493",
      Farmer_Name: "Ashish",
      area: 1,
      DBT_amount: "1,045",
      Planting_materials: "NA",
    },
    {
      Farmer_Code: "5493",
      Farmer_Name: "Rahul",
      area: 5,
      DBT_amount: "2,234",
      Planting_materials: "NA",
    },
  ];
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        container
        display="flex"
        justifyContent="center"
        mt={8}
      >
        <FarmerForm open={open} handleClose={handleClose} />
        <Grid item lg={10} sm={7} xs={12}>
          <FarmerTable
            hideSpComponents={true}
            data={FarmerTableData}
            handleClickOpen={handleClickOpen}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FarmerPage;
