import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';  // Pen icon
import { format } from 'date-fns';  // Helps format the date for the file name

const Editormenubar = ({ setIsPenActive, fileNumber }) => {
  const [fileName, setFileName] = useState('');
  const [isPenSelected, setIsPenSelected] = useState(false);

  // Set the default file name as "Month Date, Year (N)"
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  // Toggle pen tool on button click
  const handlePenClick = () => {
    const newPenStatus = !isPenSelected;
    setIsPenSelected(newPenStatus);
    setIsPenActive(newPenStatus);  // Set the pen active status in the editor page
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar>
        {/* Left side: Display file name */}
        <Typography variant="h6" noWrap component="div" sx={{ color: 'black', fontWeight: 'bold', flexGrow: 1 }}>
          {fileName}
        </Typography>

        {/* Center the pen button */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <IconButton color={isPenSelected ? 'primary' : 'default'} onClick={handlePenClick}>
            <CreateIcon />
          </IconButton>
        </Box>

        {/* Right side: Empty space to balance the layout */}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Editormenubar;
