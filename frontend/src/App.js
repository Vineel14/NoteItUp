import React, { useState } from 'react';
import Topmenubar from './components/Topmenubar';
import LeftDrawer from './components/LeftDrawer';
import ContentFileOptions from './components/ContentFileOptions';  // Import the new component
import { Typography, Box } from '@mui/material';

function App() {
  const [selectedSubject, setSelectedSubject] = useState("All Files");

  return (
    <div>
      {/* Fixed Top Menu Bar */}
      <div style={{ position: 'fixed', width: '100%', zIndex: 1200 }}>
        <Topmenubar />
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', height: '100vh' }}>
        
        {/* Fixed Left Drawer */}
        <LeftDrawer setSelectedSubject={setSelectedSubject} />
        
        {/* Scrollable content area */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            overflowY: 'auto',  // Allows the content area to scroll
            height: 'calc(100vh - 75px)',  // Adjust the height based on Topmenubar height
            marginTop: '75px',  // Leave space for Topmenubar
            position: 'relative',  // Relative position for positioning child elements
          }}
        >
          {/* ContentFileOptions fixed at the top right */}
          <Box sx={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1100 }}>
            <ContentFileOptions />
          </Box>

          {/* Display selected subject or All Files */}
          <Typography variant="h4" component="h1">
            {selectedSubject}
          </Typography>

          {/* Add more content here to test scrolling */}
        </Box>
      </div>
    </div>
  );
}

export default App;
