import React from 'react';
import { Box, Typography } from '@mui/material';

const BottomBar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '20px',
        backgroundColor: '#E5E5E5',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        zIndex: 1200
      }}
    >
      <Typography variant="body2" component="div">
        Page 1 of 1
      </Typography>
    </Box>
  );
};

export default BottomBar;
