import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, ButtonGroup, Button, Menu, Typography, Divider, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { format } from 'date-fns';

const colors = [
  '#000000', '#0000FF', '#FF0000', '#008000', '#FFFF00', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080',
  '#FFFFFF', '#ADD8E6', '#00008B', '#00FFFF', '#FF00FF', '#EE82EE', '#006400', '#90EE90', '#008080', '#40E0D0',
  '#800020', '#800000', '#FFDAB9', '#FF7F50', '#FFD700', '#C0C0C0', '#E6E6FA', '#000080', '#228B22', '#F5F5DC'
];

const Editormenubar = ({ setIsPenActive, setIsEraserActive, setPenThickness, setPenColor, fileNumber }) => {
  const [fileName, setFileName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [penSizeLabel, setPenSizeLabel] = useState('PEN(s)');
  const [selectedThickness, setSelectedThickness] = useState('small');
  const [selectedColor, setSelectedColor] = useState('black');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    setFileName(`${formattedDate} (${fileNumber})`);
  }, [fileNumber]);

  const handleFileNameChange = (event) => {
    if (event.key === 'Enter' || event.type === 'blur') {
      if (fileName.trim() === '') {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'MMMM dd, yyyy');
        setFileName(`${formattedDate} (${fileNumber})`);  // Set default name if empty
      }
      setIsEditing(false);
    } else {
      setFileName(event.target.value);
    }
  };

  const handlePenClick = () => {
    setIsPenActive(true);
    setIsEraserActive(false);
    setSelectedTool('pen');
  };

  const handleEraserClick = () => {
    setIsPenActive(false);
    setIsEraserActive(true);
    setSelectedTool('eraser');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
  };

  const handleColorClick = (color) => {
    setPenColor(color);
    setSelectedColor(color);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar>
        {/* Left side: Display file name with a fixed width for consistency */}
        <Box sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold', width: '250px' }}>
          {isEditing ? (
            <TextField
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onBlur={handleFileNameChange}
              onKeyDown={handleFileNameChange}
              autoFocus
              variant="standard"
              inputProps={{ style: { fontWeight: 'bold', fontSize: '1rem' } }}
              sx={{ color: 'black', width: '35%' }}
            />
          ) : (
            <Typography
              onClick={() => setIsEditing(true)}
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'black',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {fileName || 'Click to edit file name'}  {/* Display placeholder if empty */}
            </Typography>
          )}
        </Box>

        {/* Center the Pen and Eraser Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, marginRight: '650px' }}>
          <ButtonGroup variant="contained" sx={{ display: 'flex', gap: 0, backgroundColor: '#D8D8D8', border: '1px solid #828282', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
            <Button
              onClick={handlePenClick}
              color={selectedTool === 'pen' ? 'primary' : '#D8D8D8'}
              sx={{
                backgroundColor: selectedTool === 'pen' ? '#329932' : '#D8D8D8',
                color: 'black',
              }}
            >
              <CreateIcon /> {penSizeLabel}
            </Button>

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

              <Divider sx={{ margin: '10px 0' }} />
              <Typography variant="caption" sx={{ padding: '5px 10px', fontWeight: 'bold' }}>Color</Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 2, 
                padding: '5px 10px', 
                maxHeight: '150px', 
                overflowY: 'auto'
              }}>
                {colors.map((color) => (
                  <Box
                    key={color}
                    onClick={() => handleColorClick(color)}
                    sx={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: color,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: selectedColor === color ? '2px solid red' : 'none'
                    }}
                  />
                ))}
              </Box>
            </Menu>
          </ButtonGroup>

          <Button
            onClick={handleEraserClick}
            color={selectedTool === 'eraser' ? 'primary' : 'default'}
            sx={{
              backgroundColor: selectedTool === 'eraser' ? '#329932' : '#D8D8D8',
              color: 'black',
              border: '1px solid #828282',
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
