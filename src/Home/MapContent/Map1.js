import { Card } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Legend from "./Legend";
import SecureLS from "secure-ls";
import CloseIcon from "@mui/icons-material/Close";

import {
  GoogleMap,
  // Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
// import { AllStateDist } from "../../Components/MapData/AllStateDist";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./Map1.css";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { colorList } from "../../Components/MapData/AllStateDist";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
export default function Map1({
  selectedState,
  selectedDistrict,
  districtList = [],
  LegendList,
}) {
  const { setSelectedDistrict, setLevel, changeBreadcrumWithStates } =
    useContext(UserContext);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const ls = useMemo(() => new SecureLS({ encodingType: "aes" }), []);
  const fetchToken = useCallback(() => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      ls.remove("authToken");
    }
    return token;
  }, [ls]);

  const loginData = fetchToken();
  const userRole = fetchToken()?.user_role;
  //Token data -----
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAP,
  });
  const [mapCenter, setMapCenter] = useState({ lat: 26.2006, lng: 92.9376 });
  const [mapZoom, setMapZoom] = useState(7);
  const [highlightedColor, setHighlightedColor] = useState(null);

  const [boundaries, setBoundaries] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const stateColors = {
    Assam: "#FACACB",
    "Arunachal Pradesh": "#F7DC61",
    Manipur: "#8CBF5A",
    Meghalaya: "#E3BF7D",
    Mizoram: "#D2B5D6",
    Nagaland: "#9FB7DE",
    Sikkim: "#31FF90",
    Tripura: "#FBF39E",
  };

  const onLoad = useCallback(function callback(map) {}, []);
  // const onLoad = useCallback(function callback(map) {
  //   setMapInstance(map);
  // }, []);

  const getColor = (index) => {
    return colorList[index % colorList.length] || "#FFA07A"; // Fallback color if colorList runs out
  };
  // Function to calculate the geographic center from district centers
  const calculateCenter = (districts) => {
    let totalLat = 0;
    let totalLng = 0;
    let count = districts.length;

    districts.forEach((district) => {
      totalLat += district.center.lat;
      totalLng += district.center.lng;
    });

    return { lat: totalLat / count, lng: totalLng / count };
  };

  // Function to calculate the zoom level based on bounding boxes (dummy approach)
  const calculateZoom = (districts) => {
    let minZoom = Number.POSITIVE_INFINITY;

    // Get the lowest zoom value (you can adjust this based on your criteria)
    districts.forEach((district) => {
      if (district.zoom < minZoom) {
        minZoom = district.zoom;
      }
    });

    // Adjust zoom level as needed
    return minZoom - 1.2; // Arbitrary adjustment
  };
  const fetchData = async (query) => {
    const url = new URL(
      `${process.env.REACT_APP_API_URL_LOCAL}/fetchCoOrdinate`
    );
    const params = new URLSearchParams();
    // Append each query key
    Object.keys(query).forEach((key) => {
      if (Array.isArray(query[key])) {
        params.append(key, JSON.stringify(query[key])); // Send array as a JSON string
      } else {
        params.append(key, query[key]); // Handle normal key-value pairs
      }
    });
    url.search = params;
    try {
      setMapLoading(true);

      const response = await axios.get(
        url.toString(),
        loginData && {
          headers: {
            Authorization: `Bearer ${loginData?.token}`,
          },
        }
      );
      // let arrayData = response.data.data;
      const arrayData = response.data.data;
      const polygons = arrayData.reduce((acc, item, ind) => {
        if (item.type === "administrative" && item.class === "boundary") {
          const boundaryCoords = item.coordinates.map((coord) => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng),
          }));

          acc.push({
            name: item.name,
            center: item.center,
            zoom: item.zoom,
            boundaries: boundaryCoords,
            color: getColor(ind), // or use predefined colors
          });
        }
        return acc;
      }, []);
      setBoundaries(polygons);
      if (selectedState === "All") {
        setMapCenter(mapCenter);
        setMapZoom(7);
      } else {
        if (selectedState === "ARUNACHAL PRADESH") {
          setMapCenter({
            lat: 28.0937702,
            lng: 94.5921326,
          });
          setMapZoom(10);
        } else if (selectedState === "ASSAM" && !selectedDistrict) {
          setMapCenter({ lat: 26.4073841, lng: 93.2551303 });
          setMapZoom(7.026478784081037);
        } else if (selectedState === "MANIPUR" && !selectedDistrict) {
          setMapCenter({
            lat: 24.7208818,
            lng: 93.9229386,
          });
          setMapZoom(8.138341954222671);
        } else if (selectedState === "MEGHALAYA" && !selectedDistrict) {
          setMapCenter({ lat: 25.5379432, lng: 91.2999102 });
          setMapZoom(8.844745535445776);
        } else if (selectedState === "MIZORAM" && !selectedDistrict) {
          setMapCenter({ lat: 23.2146169, lng: 92.8687612 });
          setMapZoom(8.730489546756795);
        } else if (selectedState === "NAGALAND" && !selectedDistrict) {
          setMapCenter({ lat: 26.1630556, lng: 94.5884911 });
          setMapZoom(8.088352711405037);
        } else if (selectedState === "SIKKIM" && !selectedDistrict) {
          setMapCenter({ lat: 27.601029, lng: 88.45413638680145 });
          setMapZoom(9.1029012900573);
        } else if (selectedState === "TRIPURA" && !selectedDistrict) {
          setMapCenter({ lat: 23.7750823, lng: 91.7025091 });
          setMapZoom(8.720848284309088);
        } else if (selectedDistrict.name !== "All") {
          setMapCenter(arrayData[0]?.center);
          setMapZoom(arrayData[0]?.zoom);
        } else {
          const newCenter = calculateCenter(arrayData); // Calculate new center
          const newZoom = calculateZoom(arrayData); // Calculate new zoom
          setMapCenter(newCenter);
          setMapZoom(newZoom);
          // Calculate bounds and center for multiple districts

          // setMapCenter(arrayData[0].center);
          // setMapZoom(arrayData[Math.floor(arrayData.length / 2)]?.zoom - 1.2);
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    } finally {
      setMapLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    // fetchData({ stateName: selectedState });
    if (userRole !== "DC") {
      if (selectedState === "All" && districtList.length > 0) {
        let filteredStates = districtList.filter((state) => state !== "All");
        setHighlightedColor(null);
        fetchData({ stateName: filteredStates });
      } else if (
        selectedState !== "All" &&
        !selectedDistrict &&
        districtList.length > 0
      ) {
        setHighlightedColor(null);
        fetchData({
          districtName: LegendList[selectedState]?.districts.map(
            (district) => district.name
          ),
        });
      }
    }
  }, [districtList, selectedState]);

  useEffect(() => {
    if (selectedDistrict?.name === "All" && districtList.length > 0) {
      setHighlightedColor(
        districtList.indexOf(selectedDistrict.name) > 0
          ? getColor(districtList.indexOf(selectedDistrict.name))
          : selectedDistrict.color
      );
      fetchData({
        districtName: districtList,
      });
    } else if (
      selectedDistrict?.name !== "All" &&
      districtList.length > 0 &&
      selectedDistrict?.name
    ) {
      setHighlightedColor(
        districtList.indexOf(selectedDistrict.name) > 0
          ? getColor(districtList.indexOf(selectedDistrict.name))
          : selectedDistrict.color
      );
      fetchData({
        districtName: [selectedDistrict?.name],
      });
    }
  }, [selectedDistrict]);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setMapCenter(district.center);
    setMapZoom(district.zoom);
    changeBreadcrumWithStates({ name: district.name }, "", "", 1);
    setLevel(3);
  };

  return isLoaded ? (
    <React.Fragment>
      <Card elevation={6} sx={{ borderRadius: "12px" }} className="map-card">
        {mapLoading && (
          <div className="loading-overlay">
            <CircularProgress />
          </div>
        )}
        <GoogleMap
          className={`${mapLoading ? "maploading" : ""}`}
          mapContainerStyle={{
            width: "100%",
            minHeight: "615px",
          }}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={onLoad}
          // onIdle={() => {
          //   if (mapInstance && boundaries.length > 0) {
          //     const bounds = new window.google.maps.LatLngBounds();
          //     boundaries.forEach((boundary) => {
          //       boundary.boundaries.forEach((coord) => {
          //         bounds.extend(
          //           new window.google.maps.LatLng(coord.lat, coord.lng)
          //         );
          //       });
          //     });
          //     mapInstance.fitBounds(bounds);
          //     setMapCenter(bounds.getCenter().toJSON());
          //     setMapZoom(mapInstance.getZoom());
          //   }
          // }}
          onUnmount={onUnmount}
        >
          {boundaries &&
            boundaries.map((boundary, index) => (
              <Polygon
                key={`polygon-${index}`}
                paths={boundary.boundaries}
                options={{
                  strokeColor: highlightedColor || boundary.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: highlightedColor || boundary.color,
                  fillOpacity: 0.35,
                }}
                // onClick={() => handleDistrictClick(boundary)} // Add interaction
              />
            ))}

          {selectedState !== "All" &&
            !isActive("/dc") &&
            !isActive("/spPage") &&
            !isActive("/sla") && (
              <Legend
                selectedState={selectedState}
                LegendList={LegendList}
                onDistrictClick={handleDistrictClick}
              />
            )}
        </GoogleMap>
      </Card>
    </React.Fragment>
  ) : (
    <Card elevation={6} sx={{ borderRadius: "12px" }} className="map-card">
      <div className="loading-overlay">
        <CircularProgress />
      </div>
    </Card>
  );
}
