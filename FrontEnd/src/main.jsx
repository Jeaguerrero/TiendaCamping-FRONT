import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./components/AppContext";
import { AuthProvider } from "./components/AuthContext";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <AuthProvider>
        <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
