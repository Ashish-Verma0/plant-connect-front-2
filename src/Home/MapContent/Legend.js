import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./Legend.css";

const Legend = ({ selectedState, LegendList, onDistrictClick }) => {
  const [expanded, setExpanded] = useState(true);
  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };
  return (
    <div className="legend-container">
      {selectedState &&
        selectedState !== "All" &&
        LegendList[selectedState] && (
          <Accordion
            className="legend-accordion"
            expanded={expanded}
            onChange={handleAccordionChange}
          >
            <AccordionSummary
              expandIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-controls="panel1a-content"
              className="legend-accordion-summary"
            >
              <Typography className="legend-accordion-title">
                Districts
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="legend-accordion-details">
              <div className="districts-list">
                <ul>
                  {LegendList[selectedState].districts.map((district) => (
                    <li
                      key={district.name}
                      onClick={() => onDistrictClick(district)}
                      className="district-item"
                    >
                      <span
                        className="district-color"
                        style={{ backgroundColor: district.color }}
                      ></span>
                      {district.name}
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        )}
    </div>
  );
};

export default Legend;
