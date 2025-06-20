// Main.js
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import axios from "axios";
import EsoaForm from "./EsoaForm";

function Main({ authUser }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <EsoaForm authUser={authUser}/>
      </Container>
    </>
  );
}

export default Main;
