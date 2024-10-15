import React, { useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { ArunachalPradesh, ManiPur, StaticStateData } from "./StaticData";
import PlantDistrictTable from "./PlantDistrictTable";
import PlantNurseryTable from "./PlantNurseryTable";
import PlantNameTable from "./PlantNameTable";
import PlantVarietyTable from "./PlantVarietyTable";

export default function PlantTableContainer({
  level,
  setLevel,
  fetchPlants,
  fetchNurserys,
  plantWiseData,
  breadcrumbData,
  nurseryWiseData,
  fetchPlantVariety,
  setBreadcrumbData,
  plantVarietiesData,
  districtWisePlantData,
  PlantDistrictTableLoder,
}) {
  const handleClickParent = (row) => {
    console.log(level, "===level");
    if (level === 0) {
      setLevel(1);
      fetchNurserys(row?.districtName);
      setBreadcrumbData([...breadcrumbData, row.districtName]);
    } else if (level === 1) {
      setLevel(2);
      fetchPlants(row?.nurseryId);
      setBreadcrumbData([...breadcrumbData, row.nurseryName]);
    } else if (level === 2) {
      setLevel(3);
      fetchPlantVariety(row?.plantName);
      setBreadcrumbData([...breadcrumbData, row.plantName]);
    } else if (level === 2) {
      setLevel(3);
      setBreadcrumbData([...breadcrumbData, row.nurseryName]);
    }
  };

  const handleBreadcrumbClick = (index) => {
    setLevel(index);
    setBreadcrumbData(breadcrumbData.slice(0, index + 1));
  };

  const updatedBreadcrumbData = breadcrumbData.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClick(index)}
      style={{ cursor: "pointer" }}
    >
      {data}
    </Link>
  ));
  return (
    <React.Fragment>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{
          fontSize: {
            xs: "14px",
            sm: "16px",
            md: "18px",
          },
        }}
        mt={4}
        aria-label="breadcrumb"
      >
        {updatedBreadcrumbData}
      </Breadcrumbs>

      {level === 0 && (
        <PlantDistrictTable
          data={districtWisePlantData}
          loading={PlantDistrictTableLoder}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 1 && (
        <PlantNurseryTable
          data={nurseryWiseData}
          loading={false}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 2 && (
        <PlantNameTable
          data={plantWiseData}
          loading={false}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 3 && (
        <PlantVarietyTable
          data={plantVarietiesData}
          loading={false}
          handleClickParent={handleClickParent}
        />
      )}
    </React.Fragment>
  );
}
