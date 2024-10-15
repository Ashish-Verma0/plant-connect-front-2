import React, { useState, useEffect, useCallback } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card, Grid } from "@mui/material";
const CropMap = ({ polygon, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAP,
  });
  const [mapCenter, setMapCenter] = useState({ lat: 26.2006, lng: 92.9376 });
  // const [mapZoom, setMapZoom] = useState(19);
  // useEffect(() => {
  //   setMapCenter({ lat: lat, lng: lng });
  // }, [lat, lng]);
  function calculateCenterAndZoom(boundary) {
    // Calculate the center of the boundary points
    let totalLat = 0;
    let totalLng = 0;
    boundary?.forEach((point) => {
      totalLat += point.lat;
      totalLng += point.lng;
    });

    const centerLat = totalLat / boundary?.length;
    const centerLng = totalLng / boundary?.length;

    // Calculate bounds
    const lats = boundary?.map((p) => p.lat);
    const lngs = boundary?.map((p) => p.lng);
    const maxLat = Math.max(...lats);
    const minLat = Math.min(...lats);
    const maxLng = Math.max(...lngs);
    const minLng = Math.min(...lngs);

    // Use the distance between max and min lat/lng to determine zoom
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;

    // This is an approximate formula to calculate zoom level based on lat/lng differences
    const zoom = Math.min(
      15, // Arbitrary maximum zoom
      Math.floor(100 - Math.max(latDiff, lngDiff) * 100) // Adjust this factor based on map scale and requirements
    );

    return {
      center: { lat: centerLat, lng: centerLng },
      zoom,
    };
  }
  useEffect(() => {
    const result = calculateCenterAndZoom(polygon);
    setMapCenter(result.center);

    // setMapZoom(result.zoom);
  }, [polygon]);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  // const onLoad = useCallback(function callback(map) {}, []);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      polygon.forEach((point) => {
        bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
      });
      map.fitBounds(bounds); // Automatically adjust zoom and center
      setMap(map);
    },
    [polygon]
  );
  return isLoaded ? (
    <>
      <Card elevation={6} className="map-card">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "325px" }}
          center={mapCenter}
          options={{ disableDefaultUI: true, mapTypeId: "satellite" }}
          // zoom={mapZoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {polygon && (
            <Polygon
              key={`polygon-`}
              paths={polygon}
              options={{
                strokeColor: "red",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "red",
                fillOpacity: 0.35,
              }}
            />
          )}
        </GoogleMap>
      </Card>
    </>
  ) : (
    <Card elevation={6} className="map-card">
      Loading...
    </Card>
  );
};

export default CropMap;
