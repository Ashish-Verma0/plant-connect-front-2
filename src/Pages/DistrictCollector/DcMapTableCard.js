import React, { useRef } from "react";
import { Grid, Link } from "@mui/material";
// import "./MapCardTable.css";

const DcMapTableCard = ({ dcmapArray }) => {
  const scrollToRef = useRef(null);

  const scrollToSection = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Grid container spacing={1} className="mapSP">
        <Grid item lg={12} sm={12} xs={12}>
          <div className="table-container">
            <table>
              <tbody>
                {dcmapArray.map((item, index) => (
                  <tr key={index}>
                    <th>
                      {item.isLink ? (
                        <Link
                          onClick={() => {
                            scrollToSection();
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

export default DcMapTableCard;
