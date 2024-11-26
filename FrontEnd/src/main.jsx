import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./components/AppContext";
import { AuthProvider } from "./components/AuthContext";
import { Provider } from "react-redux";
import { store } from './Redux/store.js';


import "./app.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
