import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Holdings from "./components/Holdings";
import "./index.css";
import Home from "./components/Home";

import { GeneralContextProvider } from "./components/GeneralContext";
// import ProtectedRoute from "./ProtectedRoute"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <GeneralContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
            
              <Home />
            
          }
        />
        <Route path="/holdings" element={
          
              <Holdings />
            
          }
        />
      </Routes>
    </BrowserRouter>
    </GeneralContextProvider>
  
);