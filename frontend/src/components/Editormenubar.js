import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';  // Pen icon
import DeleteIcon from '@mui/icons-material/Delete';  // Eraser icon
import { format } from 'date-fns';  // Helps format the date for the file name

const Editormenubar = ({ setIsPenActive, setIsEraserActive, fileNumber }) => {
  const [fileName, setFileName] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);

  // Set the default file name as "Month Date, Year (N)"
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  // Handle toggle button changes (Pen or Eraser)
  const handleToolChange = (event, newTool) => {
    if (newTool === 'pen') {
      setIsPenActive(true);
      setIsEraserActive(false);
    } else if (newTool === 'eraser') {
      setIsPenActive(false);
      setIsEraserActive(true);
    }
    setSelectedTool(newTool);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar>
        {/* Left side: Display file name */}
        <Box sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
          {fileName}
        </Box>

        {/* Center the ToggleButtonGroup for Pen and Eraser */}
        <ToggleButtonGroup
          value={selectedTool}
          exclusive
          onChange={handleToolChange}
          sx={{ display: 'flex', gap: 0 }}
        >
          {/* Pen button */}
          <ToggleButton value="pen">
            <CreateIcon />
          </ToggleButton>

          {/* Eraser button */}
          <ToggleButton value="eraser">
            <DeleteIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Editormenubar;
