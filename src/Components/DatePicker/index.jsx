import React, { useState } from "react";
import { Box, Card, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DatePickers = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
  });

  const handleDateChange = (key, date) => {
    setDateRange((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  return (
    <div>
      <Box display="flex" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Card
            sx={{
              height: "40px",
              minWidth: {
                xs: "70px",
                sm: "120px",
                md: "160px",
                lg: "150px",
              },
              maxWidth: {
                xs: "70px",
                sm: "120px",
                md: "160px",
                lg: "160px",
              },
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "0 10px",
            }}
            elevation={6}
          >
            <DatePicker
              label="Start Date"
              value={dateRange.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              format="dd/MM/yyyy"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-icon": {
                  borderRadius: "2px",
                  width: "20px",
                  height: "20px",
                  color: "white",
                  padding: "-7px",
                  margin: "3px 7px",
                  backgroundColor: "var(--yellow, #FEBA55)",
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Card>

          <Card
            sx={{
              height: "40px",
              minWidth: {
                xs: "70px",
                sm: "120px",
                md: "160px",
                lg: "150px",
              },
              maxWidth: {
                xs: "70px",
                sm: "120px",
                md: "160px",
                lg: "160px",
              },
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "0 10px",
            }}
            elevation={6}
          >
            <DatePicker
              label="End Date"
              value={dateRange.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              format="dd/MM/yyyy"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-icon": {
                  borderRadius: "2px",
                  width: "20px",
                  height: "20px",
                  color: "white",
                  padding: "-7px",
                  margin: "3px 7px",
                  backgroundColor: "var(--yellow, #FEBA55)",
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Card>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default DatePickers;
