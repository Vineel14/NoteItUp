import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, ButtonGroup, Button, Menu, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';  // Pen icon
import DeleteIcon from '@mui/icons-material/Delete';  // Eraser icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { format } from 'date-fns';  // Helps format the date for the file name

const Editormenubar = ({ setIsPenActive, setIsEraserActive, setPenThickness, fileNumber }) => {
  const [fileName, setFileName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);  // For managing pen and eraser states
  const [penSizeLabel, setPenSizeLabel] = useState('PEN(s)');  // For managing pen label
  const [selectedThickness, setSelectedThickness] = useState('small'); // For selected thickness

  // Set the default file name as "Month Date, Year (N)"
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  // Handle pen selection
  const handlePenClick = () => {
    setIsPenActive(true);
    setIsEraserActive(false);
    setSelectedTool('pen');
  };

  // Handle eraser selection
  const handleEraserClick = () => {
    setIsPenActive(false);
    setIsEraserActive(true);
    setSelectedTool('eraser');
  };

  // Handle dropdown for pen options
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle thickness selection
  const handleThicknessClick = (size) => {
    if (size === 'small') {
      setPenThickness(1);
      setPenSizeLabel('PEN(s)');
    } else if (size === 'medium') {
      setPenThickness(3);
      setPenSizeLabel('PEN(m)');
    } else if (size === 'large') {
      setPenThickness(5);
      setPenSizeLabel('PEN(l)');
    }
    setSelectedThickness(size);
    handleMenuClose();  // Close the menu after selecting a thickness
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar>
        {/* Left side: Display file name */}
        <Box sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
          {fileName}
        </Box>

        {/* Center the Pen and Eraser Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, marginRight: '600px' }}>
          {/* Pen Button with Dropdown */}
          <ButtonGroup variant="contained" sx={{ display: 'flex', gap: 0, backgroundColor: '#D8D8D8', border: '1px solid #828282', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
            {/* Pen Button */}
            <Button
              onClick={handlePenClick}
              color={selectedTool === 'pen' ? 'primary' : '#D8D8D8'}  // Distinguish the selected tool
              sx={{
                backgroundColor: selectedTool === 'pen' ? '#329932' : '#D8D8D8',
                color: 'black',
              }}
            >
              <CreateIcon /> {penSizeLabel}
            </Button>

            {/* Dropdown Button for Pen Options */}
            <IconButton
              size="small"
              onClick={handleMenuClick}
              sx={{
                backgroundColor: '#D8D8D8',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#C2C2C2',  
                },
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>

            {/* Dropdown Menu for Pen Options */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ padding: '10px' }}
            >
              <Typography variant="caption" sx={{ padding: '5px 10px', fontWeight: 'bold' }}>Thickness</Typography>
              <Box sx={{ display: 'flex', gap: 2, padding: '5px 10px' }}>
                <Typography
                  onClick={() => handleThicknessClick('small')}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selectedThickness === 'small' ? 'bold' : 'normal',
                    color: selectedThickness === 'small' ? 'red' : 'black',
                    fontSize: selectedThickness === 'small' ? '1.2rem' : '1rem'
                  }}
                >
                  S
                </Typography>
                <Typography
                  onClick={() => handleThicknessClick('medium')}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selectedThickness === 'medium' ? 'bold' : 'normal',
                    color: selectedThickness === 'medium' ? 'red' : 'black',
                    fontSize: selectedThickness === 'medium' ? '1.2rem' : '1rem'
                  }}
                >
                  M
                </Typography>
                <Typography
                  onClick={() => handleThicknessClick('large')}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selectedThickness === 'large' ? 'bold' : 'normal',
                    color: selectedThickness === 'large' ? 'red' : 'black',
                    fontSize: selectedThickness === 'large' ? '1.2rem' : '1rem'
                  }}
                >
                  L
                </Typography>
              </Box>
            </Menu>
          </ButtonGroup>

          {/* Eraser Button */}
          <Button
            onClick={handleEraserClick}
            color={selectedTool === 'eraser' ? 'primary' : 'default'}
            sx={{
              backgroundColor: selectedTool === 'eraser' ? '#329932' : '#D8D8D8',
              color: 'black',
              border: '1px solid #828282',  // Add slight black border
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Editormenubar;
