import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("");
  const [copiedPath, setCopiedPath] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_CLAIMS}file-browser/list`);
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const handleCopy = async (filePath) => {
    try {
      await navigator.clipboard.writeText(filePath);
      setCopiedPath(filePath);

      // Optional: reset after a few seconds
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>Encrypted Files</Typography>

      <TextField
        label="Search by filename"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Filename</TableCell>
              <TableCell>Path</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.path}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy File Path">
                    <IconButton onClick={() => handleCopy(file.path)}>
                      <ContentCopyIcon
                        color={copiedPath === file.path ? "success" : "action"}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredFiles.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No files found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileTable;
