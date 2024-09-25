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
          marginTop: '75px',  // Ensure content is below the fixed Editormenubar
          marginBottom: '20px',  // Adjust for the BottomBar height
          height: 'calc(100vh - 95px)',  // Full height minus Editormenubar and BottomBar
          overflowY: 'auto',  // Make the editor content scrollable
          padding: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ marginTop: 2, marginLeft: 2 }}>
          New File Created
        </Typography>
        {/* Additional editor content will go here */}
      </Box>

      {/* Fixed BottomBar at the bottom */}
      <BottomBar />
    </div>
  );
};

export default EditorPage;
