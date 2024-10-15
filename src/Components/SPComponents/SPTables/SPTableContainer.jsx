import { Breadcrumbs, Grid } from "@mui/material";
import React from "react";
import SPFpoTable from "./SPFpoTable";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DcFigTable from "../../../Pages/DistrictCollector/DcFigTable";
import FarmerForm from "../../Form/FarmerForm";
import FarmerTable from "../../JSComponents/FarmerTable";

export default function SPTableContainer({
  data,
  lrpTrue,
  fpoLevel,
  headCells,
  onEditForm,
  figTableData,
  farmerData,
  onEditFIGForm,
  UpdatedbreadData,
  handleClickParent,
  headCellsFigTable,
  handleClickFarmerOpen,
  spTrue,
}) {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item lg={12} sm={12} xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {UpdatedbreadData}
          </Breadcrumbs>
        </Grid>
        {fpoLevel === 0 && (
          <Grid item lg={12} sm={12} xs={12} mt={4}>
            <SPFpoTable
              data={data}
              lrpTrue={lrpTrue}
              headCells={headCells}
              onEditForm={onEditForm}
              handleClickParent={handleClickParent}
            />
          </Grid>
        )}
        {fpoLevel === 1 && (
          <Grid item lg={12} sm={12} xs={12}>
            <DcFigTable
              data={figTableData}
              onEditForm={onEditFIGForm}
              headCells={headCellsFigTable}
              handleClickParent={handleClickParent}
              spTrue={spTrue}
            />
          </Grid>
        )}
        {fpoLevel === 2 && (
          <Grid item lg={12} sm={12} xs={12}>
            <FarmerTable
              hideSpComponents={false}
              data={farmerData}
              handleClickFarmerOpen={handleClickFarmerOpen}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
