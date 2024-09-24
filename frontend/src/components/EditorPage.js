import React from 'react';
import { Typography, Box } from '@mui/material';
import Editormenubar from './Editormenubar';  // Import the new Editormenubar component

const EditorPage = ({ fileNumber }) => {
  return (
    <div>
      {/* Editormenubar at the top */}
      <Editormenubar fileNumber={fileNumber} />

      {/* Main editor content */}
      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" component="h1" sx={{ marginTop: 2, marginLeft: 2 }}>
          New File Created
        </Typography>
      </Box>
    </div>
  );
};

export default EditorPage;
