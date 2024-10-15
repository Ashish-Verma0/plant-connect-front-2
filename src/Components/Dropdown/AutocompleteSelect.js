import * as React from "react";
import { Card, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutocompleteSelect({
  label,
  items,
  height,
  handleChange,
  selectedItem,
  textColor = "#808080",
  size,
}) {
  const handleAutocompleteChange = (event, newValue) => {
    handleChange(newValue);
  };

  return (
    <Card
      sx={{
        minWidth: { xs: "90px", sm: "120px", md: "160px", lg: "200px" },
        maxWidth: { xs: "90px", sm: "120px", md: "160px", lg: "180px" },
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: height ? "39px" : "",
      }}
      elevation={6}
    >
      <Autocomplete
        id="combo-box-demo"
        options={items}
        size={size}
        value={selectedItem}
        onChange={handleAutocompleteChange}
        renderInput={(params) => <TextField {...params} placeholder={label} />}
        clearIcon={null}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiAutocomplete-inputRoot": {
            display: "flex",

            alignItems: "center",
          },
          "& .MuiAutocomplete-input": {
            flexGrow: 1,
          },
          "& .MuiAutocomplete-popupIndicator": {
            borderRadius: "2px",
            width: "18px",
            height: "18px",
            color: "white",
            margin: "4px 7px",
            backgroundColor: "var(--yellow, #FEBA55)",
          },
        }}
      />
    </Card>
  );
}
