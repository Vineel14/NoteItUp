import React from 'react';
import { IconButton, Button, Box } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

const ContentFileOptions = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
      <IconButton>
        <MoreHoriz />
      </IconButton>
      <Button variant="contained" color="primary">
        + New File
      </Button>
    </Box>
  );
};

export default ContentFileOptions;
