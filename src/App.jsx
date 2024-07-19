import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useRoutes } from "react-router-dom";
import { routes } from "./router";

function App() {
  const router = useRoutes (routes)
  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main">
        <Header />

        {router}
      </div>
    </div>
  );
}

export default App;
