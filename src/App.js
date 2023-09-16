import "./App.css";

//assets. this is put into sidebar
import logo from "./assets/Logo.png";

//depedencies
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// components
import SidebarList from "./components/SidebarList/SidebarList";
import Topbar from "./components/Topbar/Topbar"

// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import CropCounter from "./pages/CropCounter/CropCounter"
import Video from "./pages/Video/Video"
import Diseases from "./pages/Diseases/Diseases";
import CowDoctor from "./pages/CowDoctor/CowDoctor";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SidebarList />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/crops" element={<CropCounter />}></Route>
              <Route path = "/camera" element={<Video />}></Route>
              <Route path = "/diseases" element={<Diseases />}></Route>
              <Route path = "/knowyourcow" element={<CowDoctor />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
