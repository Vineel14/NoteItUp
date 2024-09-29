import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';  // Pen icon
import DeleteIcon from '@mui/icons-material/Delete';  // Eraser icon
import { format } from 'date-fns';  // Helps format the date for the file name

const Editormenubar = ({ setIsPenActive, setIsEraserActive, fileNumber }) => {
  const [fileName, setFileName] = useState('');
  const [isPenSelected, setIsPenSelected] = useState(false);
  const [isEraserSelected, setIsEraserSelected] = useState(false);

  // Set the default file name as "Month Date, Year (N)"
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  // Toggle pen tool on button click
  const handlePenClick = () => {
    setIsPenSelected(true);
    setIsEraserSelected(false);
    setIsPenActive(true);       // Activate pen
    setIsEraserActive(false);   // Deactivate eraser
  };

  // Toggle eraser tool on button click
  const handleEraserClick = () => {
    setIsPenSelected(false);
    setIsEraserSelected(true);
    setIsPenActive(false);      // Deactivate pen
    setIsEraserActive(true);    // Activate eraser
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar>
        {/* Left side: Display file name */}
        <Box sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
          {fileName}
        </Box>

        {/* Center the Pen and Eraser buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Pen button */}
          <IconButton color={isPenSelected ? 'primary' : 'default'} onClick={handlePenClick}>
            <CreateIcon />
          </IconButton>

          {/* Eraser button */}
          <IconButton color={isEraserSelected ? 'primary' : 'default'} onClick={handleEraserClick}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Editormenubar;
