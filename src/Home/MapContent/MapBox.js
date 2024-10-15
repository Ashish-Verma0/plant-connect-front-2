import React from "react";
import "./MapBox.css";
import Map1 from "./Map1";
import MapCards from "./MapCards";
import { Card, Grid } from "@mui/material";
import PieChart from "../../Components/PieChart";
import MapTableCard from "../../Components/MapTableCard";
import exportBtn from "../../assets/images/exportBtn.png";
export default function MapBox({
  mapArray,
  userRole,
  mainMapCard,
  selectedState,
  selectedDistrict,
  districtList,
  LegendList,
}) {
  const totalFarmerState = [
    {
      name: `${selectedState} Mapped Farmer`,
      quantity: Number(mainMapCard?.stateMappedFarmerCount),
    },
    {
      name: "Other State Mapped Farmer",
      quantity: Number(
        mainMapCard?.allMappedFarmerCount - mainMapCard?.stateMappedFarmerCount
      ),
    },
  ];
  const totalFPODistrict = [
    {
      name: `${selectedState} FPOs`,
      quantity: Number(mainMapCard?.stateOrDistrictFpoCount),
    },
    {
      name: "Other State FPOs",
      quantity: Number(
        mainMapCard?.totalFpos - mainMapCard?.stateOrDistrictFpoCount
      ),
    },
  ];
  const handleLinkClick = () => {};
  return (
    <div className="map-container">
      <Grid container spacing={4} className="map-con">
        <Grid item lg={9} md={9} sm={12} xs={12} className="map-grid-item">
          <Map1
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            districtList={districtList}
            LegendList={LegendList}
          />
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className="map-cards-grid-item"
        >
          <Grid item lg={12} sm={12} xs={12} className="map-grid-item">
            <MapCards mainMapCard={mainMapCard} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
