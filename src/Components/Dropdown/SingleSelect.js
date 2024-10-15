import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Autocomplete, Card, TextField } from "@mui/material";

export default function SingleSelect({
  label,
  items,
  handleChange,
  selectedItem,
  size,
}) {
  return (
    <Card
      sx={{
        minWidth: { xs: "90px", sm: "120px", md: "160px", lg: "180px" },
        maxWidth: { xs: "90px", sm: "120px", md: "160px", lg: "180px" },
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      elevation={6}
    >
      <FormControl sx={{ width: "100%" }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          size={size}
          value={selectedItem}
          onChange={handleChange}
          label={label}
          MenuProps={{
            disableScrollLock: true,
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {},
            "& .MuiSelect-icon": {
              borderRadius: "2px",
              width: "18px",
              height: "18px",
              color: "white",
              backgroundColor: "var(--yellow, #FEBA55)",
            },
          }}
        >
          {items.map((item, indx) => (
            <MenuItem key={`${item}-${indx}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  );
}
