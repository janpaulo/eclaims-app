import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

export default function SharedAppBar({ titleName, esoaLink, isModal, handleClick,item }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titleName}
          </Typography>

          {isModal ? (
            <div>
              <IconButton color="inherit" aria-label="menu"
                onClick={() => handleClick(item,true, titleName)}
                >
                <AddCircleOutlineOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
          ) : (
            <Link
              to={esoaLink}
              component={RouterLink}
              variant="button"
              color="secondary"
            >
              <AddCircleOutlineOutlinedIcon fontSize="large" />
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                {" "}
              </IconButton>
            </Link>
          )}

          {/* <Button color="inherit">Add</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
