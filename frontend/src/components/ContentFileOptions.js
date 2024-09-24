import React from 'react';
import { IconButton, Button, Box } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

const ContentFileOptions = ({ onNewFile }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
      <IconButton>
        <MoreHoriz />
      </IconButton>
      <Button variant="contained" color="primary" onClick={onNewFile}>
        + New File
      </Button>
    </Box>
  );
};

export default ContentFileOptions;
