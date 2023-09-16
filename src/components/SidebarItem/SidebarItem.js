import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { MenuItem } from "react-pro-sidebar";
import { Link, useNavigate} from "react-router-dom";
import "./SidebarItem.scss";


const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link className="sidebar-item__link" to={to}>
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

export default SidebarItem;
