import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button, Card } from "@mui/material";

export default function MultiSelect({
  label,
  items = [],
  handleChange,
  selectedItems = [],
  handleSubmit,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitAndClose = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Card
      sx={{
        display: "flex",
        overflow: "hidden",
        borderRadius: "12px",
        alignItems: "center",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        minWidth: { xs: "120px", md: "140px", lg: "340px" },
        maxWidth: { xs: "120px", md: "140px", lg: "340px" },
      }}
      elevation={6}
    >
      <FormControl sx={{ width: "100%" }}>
        <Select
          multiple
          id="demo-multiple-checkbox"
          labelId="demo-multiple-checkbox-label"
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) =>
            selected.length > 0 ? selected.join(", ") : `${label}`
          }
          defaultChecked=""
          displayEmpty
          MenuProps={{
            disableScrollLock: true,
          }}
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
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={selectedItems.indexOf(name) > -1}
                sx={{ mb: -2, mt: -2, ml: -2 }}
              />
              <ListItemText
                primary={name}
                //  sx={{ color: "grey.700" }}
              />
            </MenuItem>
          ))}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "25px",
            }}
          >
            <Button
              onClick={handleSubmitAndClose}
              size="small"
              style={{ width: "90px" }}
              variant="outlined"
            >
              Submit
            </Button>
          </div> */}
        </Select>
      </FormControl>
    </Card>
  );
}
