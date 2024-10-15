import React, { useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Phase3tableState from "./Phase3tableState";
import Phase3District from "./Phase3District";
import { ArunachalPradesh, ManiPur, StaticStateData } from "./StaticData";

export default function Phase3tableContainer() {
  const [level, setLevel] = useState(0);
  const [breadcrumbData, setBreadcrumbData] = useState(["State"]);
  const [dataStatic, setDataStatic] = useState("");
  const handleClickParent = (row) => {
    setDataStatic(row?.StateName);
    if (level === 0) {
      setLevel(1);
      setBreadcrumbData([...breadcrumbData, row.StateName]);
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
    <>
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
        <Phase3tableState
          data={StaticStateData}
          loading={false}
          handleClickParent={handleClickParent}
        />
      )}
      {level === 1 && (
        <Phase3District
          data={dataStatic == "Arunachal Pradesh" ? ArunachalPradesh : ManiPur}
          loading={false}
          handleClickParent={handleClickParent}
        />
      )}
    </>
  );
}
