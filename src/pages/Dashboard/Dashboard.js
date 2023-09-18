import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Dashboard.scss"

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import logopilot from '../../assets/logopilot.jpg'
import logocopilotvideo from '../../assets/logocopilotvideo.mp4'


function Dashboard() {
    return (
      <div>
        <video className = "logocopilot--video" src={logocopilotvideo} autoPlay muted loop></video>

        <div className="card-container">
          <Link to="/crops" className="card">
            <BarChartOutlinedIcon fontSize="large" />
            <div className="card-title">Crop Counter</div>
          </Link>
          <Link to="/diseases" className="card">
            <CoronavirusIcon fontSize="large" />
            <div className="card-title">Disease Diagnostics</div>
          </Link>
          <Link to="/knowyourcow" className="card">
            <AgricultureIcon fontSize="large" />
            <div className="card-title">Cow Doctor</div>
          </Link>
          <Link to="/camera" className="card">
            <VideoCameraFrontIcon fontSize="large" />
            <div className="card-title">Co-Pilot Eye</div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Dashboard;