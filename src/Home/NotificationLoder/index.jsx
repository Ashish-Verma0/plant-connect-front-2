import React, { useState, useEffect } from "react";
import "./notificationLoder.css";

const NotificationLoder = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center no-data h-100 mb-0">
      {loading ? (
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      ) : (
        <div
          style={{
            color: "grey",
            width: "100%",
            height: "65px",
            fontWeight: 600,
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          No data
        </div>
      )}
    </div>
  );
};

export default NotificationLoder;
