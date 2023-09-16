import SidebarItem from "../SidebarItem/SidebarItem";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import logo from "../../assets/Logo.png"
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { useNavigate } from 'react-router-dom';

const SidebarList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState();
  const [selected, setSelected] = useState();

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{
        ".ps-sidebar-container": {
          backgroundColor: `${colors.primary[400]} !important`,
        },
        ".ps-menu-button": {
          padding: "5px 25px 5px 20px",
        },
        ".ps-menu-button:hover, .ps-menu-label:hover, .css-h6q3q3-MuiTypography-root:hover":
          {
            color: "#868dfb !important",
          },
        ".ps-menu-button:active": {
          color: "#6870fa !important",
        },
        ".ps-sidebar-root": {
          border: "none",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0.6rem 0 1.4rem 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Farm Analytics
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="1.8rem"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                width="6rem"
                height="6rem"
                style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: 'cover', 
                  }}
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  paddingTop="1rem"
                  sx={{ m: "0.6rem 0 0 0" }}
                >
                  Harvest Hackers
                </Typography>
                <Typography
                  variant="h5"
                  paddingTop="0.8rem"
                  padding="1rem"
                  color={colors.greenAccent[500]}
                >
                  Hack for Good - Seed to Solution Hackathon
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SidebarItem
              title="Crop Counter"
              to="/crops"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Disease Diagnostics"
              to="/diseases"
              icon={<CoronavirusIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Co-Pilot Eye"
              to="/camera"
              icon={<VideoCameraFrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Cow Doctor"
              to="/knowyourcow"
              icon={<AgricultureIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Box marginBottom={!isCollapsed ? "5.8rem" : "17rem"}></Box>
            <SidebarItem
              title="Log Out"
              to="/logout"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarList;
