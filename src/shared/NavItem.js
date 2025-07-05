import React, { useRef, useState } from "react";
import { Select, MenuItem, Tooltip, Box,Menu,
} from "@mui/material";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddToQueueOutlinedIcon from "@mui/icons-material/AddToQueueOutlined";
import ClosedCaptionDisabledRoundedIcon from "@mui/icons-material/ClosedCaptionDisabledRounded";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import ApiIcon from "@mui/icons-material/Api"; // You can change the icon

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const items = [
  { name: "Dashboard", icon: <HomeTwoToneIcon />, path: "" },
  { name: "eSOA", icon: <AddToQueueOutlinedIcon />, path: "esoa_table_list" },
  { name: "claims", icon: <VaccinesIcon />, path: "claims" },
  // { name: "Claim Signature Form", icon: <MedicalInformationOutlinedIcon />, path: "claim-signature-form" },
  // { name: "Claim Form 3", icon: <ListAltOutlinedIcon />, path: "cf3" },
  { name: "Claim Form 4", icon: <SummarizeOutlinedIcon />, path: "cf4" },
  { name: "Claim Form 5", icon: <SummarizeOutlinedIcon />, path: "cf5" },
  {
    name: "Hospitals",
    icon: <ClosedCaptionDisabledRoundedIcon />,
    path: "hospitals",
  },
  {
    name: "User Management",
    icon: <ClosedCaptionDisabledRoundedIcon />,
    children: [
      { name: "Users", path: "hospital-users-accounts" },
      { name: "Roles", path: "roles" },
    ],
  },
  // {name: "RVS Code", icon: <SubtitlesRoundedIcon/>, path: 'rvs_codes',},
  // {name: "encryptor", icon: <EnhancedEncryptionIcon/>, path: 'encryptor',},
  // {name: "test", icon: <VaccinesIcon/>, path: 'test',},
  // {name: "Konsulta", icon: <SaveAsTwoToneIcon/>, path: 'konsulta',element: <Konsulta/>},
  // {name: "Employees", icon: <GroupsTwoToneIcon/>, path: 'employees', element: <Employee/>},
  // {name: "File", icon: <AttachFileTwoToneIcon/>, path: 'files',element:<Files/>},
  // {name: "Leave", icon: <SaveAsTwoToneIcon/>, path: 'leaves',element: <Leaves/>},
];

function NavItem({authUser}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubMenus, setOpenSubMenus] = React.useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [serverMethod, setServerMethod] = useState("GetDBServerDateTime");

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (method) => {
    setServerMethod(method);
    handleCloseMenu();
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_NEW_PHIC_URL}/${method}`,
        {
          headers: {
            accreno: process.env.REACT_APP_HOSPITALACRRENO,
            softwarecertid: process.env.REACT_APP_USERNAME,
          },
        }
      );

      const results = res.data || [];
      alert(`Response from ${method}: ${JSON.stringify(results)}`);
    } catch (err) {
      console.error("API Error:", err);
      alert(`Failed to call ${method}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuToggle = (name) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear();
    const get_user = localStorage.getItem("item");
    if (get_user == null) {
      window.location.reload();
    }
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_NANE}
          </Typography>

          <Tooltip title="Get Philhealth server method is ative">
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <ApiIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleSelect("GetDBServerDateTime")}>
              Get DBServer Date Time
            </MenuItem>
            <MenuItem onClick={() => handleSelect("GetServerDateTime")}>
              Get Server Date Time
            </MenuItem>
            <MenuItem onClick={() => handleSelect("GetServerVersion")}>
            Get Server Version
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          LOGO HERE
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {!item.children ? (
                <ListItem component={Link} to={`/${item.path}`} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title={item.name} placement="right">
                        {item.icon}
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItemButton
                    onClick={() => handleSubMenuToggle(item.name)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title={item.name} placement="right">
                        {item.icon}
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {open &&
                      (openSubMenus[item.name] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                  <Collapse
                    in={openSubMenus[item.name]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((sub, subIndex) => (
                        <ListItem
                          key={subIndex}
                          component={Link}
                          to={`/${sub.path}`}
                          disablePadding
                        >
                          <ListItemButton sx={{ pl: open ? 4 : 2 }}>
                            <ListItemText
                              style={{ marginLeft: "30px" }}
                              primary={sub.name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={(event) => handleSubmit(event)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Logout" placement="right">
                  <LogoutRoundedIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default NavItem;
