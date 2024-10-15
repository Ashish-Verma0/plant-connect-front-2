import React, { useRef } from "react";
import { Grid, Link } from "@mui/material";
import "./MapCardTable.css";

const MapTableCard = ({ mapArray, height, handleLinkClick }) => {
  const scrollToRef = useRef(null);

  const scrollToSection = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Grid container spacing={1} className="mapSP">
        <Grid item lg={12} sm={12} xs={12}>
          <div className="table-container" style={{ minHeight: height }}>
            <table>
              <tbody>
                {mapArray.map((item, index) => (
                  <tr key={index}>
                    <th>
                      {item.isLink ? (
                        <Link
                          onClick={() => {
                            scrollToSection();

                            handleLinkClick(item.label);
                          }}
                          style={{ cursor: "pointer", color: "#007bff" }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                    </th>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
      <div ref={scrollToRef} className="scroll-section"></div>
    </div>
  );
};

export default MapTableCard;
