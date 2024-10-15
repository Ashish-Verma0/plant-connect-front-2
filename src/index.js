import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthProvider";
import { SnackbarProvider } from "notistack";
import UseNetworkStatus from "./context/UseNetworkStatus";

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootWithNetworkStatus = () => {
  const { isOnline } = UseNetworkStatus();

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <SnackbarProvider maxSnack={3}>
            <App isOnline={isOnline} />
          </SnackbarProvider>
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

root.render(<RootWithNetworkStatus />);
