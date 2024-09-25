import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { format } from 'date-fns';  // date-fns helps with formatting dates

const Editormenubar = ({ fileNumber }) => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Get the current date and format it
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    // Set the file name as "Month Date, Year (N)"
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>  {/* Changed position to 'fixed' */}
      <Toolbar>
        {/* Left side: Display file name */}
        <Typography variant="h6" noWrap component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
          {fileName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Editormenubar;
