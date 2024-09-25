import React from 'react';
import { Typography, Box } from '@mui/material';
import Editormenubar from './Editormenubar';  // Import Editormenubar
import BottomBar from './BottomBar';  // Import BottomBar

const EditorPage = ({ fileNumber }) => {
  return (
    <div>
      {/* Fixed Editormenubar at the top */}
      <Editormenubar fileNumber={fileNumber} />

      {/* Scrollable Editor Content */}
      <Box
        sx={{
          backgroundColor: '#EAEAEA',  // Editor content background color
          marginTop: '40px',  // Ensure content is below the fixed Editormenubar (same height as the menubar)
          marginBottom: '10px',  // Gap for BottomBar height
          height: 'auto',  // Full height minus Editormenubar and BottomBar
          overflowY: 'auto',  // Scrollable content
          display: 'flex',
          justifyContent: 'center',  // Center the page horizontally
          alignItems: 'flex-start',  // Align the page at the top
          paddingTop: '50px',  // 15px gap between Editormenubar and page
          paddingBottom: '25px',  // 15px gap between BottomBar and page
        }}
      >
        {/* The actual white page */}
        <Box
          sx={{
            backgroundColor: 'white',
            width: '794px',  // A4 size width in pixels (for web display)
            height: '1123px',  // A4 size height in pixels
            padding: 3,  // Internal padding for page content
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',  // Subtle shadow to mimic a paper effect
            marginBottom: '15px',  // Space between bottom of page and BottomBar
          }}
        >
          <Typography variant="h4" component="h1">
            New File Created
          </Typography>
        </Box>
      </Box>

      {/* Fixed BottomBar at the bottom */}
      <BottomBar />
    </div>
  );
};

export default EditorPage;
