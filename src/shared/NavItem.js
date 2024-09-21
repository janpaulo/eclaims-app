import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import ClosedCaptionDisabledRoundedIcon from '@mui/icons-material/ClosedCaptionDisabledRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
// import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
//icons

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const items = [
  {name: "Dashboard", icon: <HomeTwoToneIcon/>, path: '',}, 
  {name: "eSOA", icon: <AddToQueueOutlinedIcon/>, path: 'esoa_table_list',},
  {name: "claims", icon: <VaccinesIcon/>, path: 'claims',},
  {name: "ICD Codes", icon: <ClosedCaptionDisabledRoundedIcon/>, path: 'icd_codes',},
  {name: "RVS Code", icon: <SubtitlesRoundedIcon/>, path: 'rvs_codes',},
  // {name: "encryptor", icon: <EnhancedEncryptionIcon/>, path: 'encryptor',},
  // {name: "test", icon: <VaccinesIcon/>, path: 'test',},
  // {name: "Konsulta", icon: <SaveAsTwoToneIcon/>, path: 'konsulta',element: <Konsulta/>},
  // {name: "Employees", icon: <GroupsTwoToneIcon/>, path: 'employees', element: <Employee/>},
  // {name: "File", icon: <AttachFileTwoToneIcon/>, path: 'files',element:<Files/>},
  // {name: "Leave", icon: <SaveAsTwoToneIcon/>, path: 'leaves',element: <Leaves/>},
];

function  NavItem() {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear();
        // Retrieve the object from storage
        var get_user = localStorage.getItem('item');
        if(get_user == null ){
            window.location.reload()
        }else{
            return false;
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
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           APP NAME
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          LOGO HERE
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {items.map((text, index) => (
                    
        <ListItem key={index} component={Link} to={"/" + text.path} disablePadding >  

                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <Tooltip title={text.name}  placement="right">
                            {text.icon}
                      </Tooltip>
                        </ListItemIcon>
                        
                        <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }}/>
                       </ListItemButton>
                    </ListItem>
                ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <List>
        <ListItem  disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Logout"  placement="right">
                  <LogoutRoundedIcon/>
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