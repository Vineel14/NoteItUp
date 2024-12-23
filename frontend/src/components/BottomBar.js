import React from 'react';
import { Box, Typography } from '@mui/material';

const BottomBar = ({ currentPage, totalPages }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '20px',
        backgroundColor: '#EAEAEA',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        zIndex: 1200,
        borderTop: '1px solid #BFBFBF',  // Darker top border
      }}
    >
      <Typography variant="body2" component="div">
        Page {currentPage} of {totalPages}
      </Typography>
    </Box>
  );
};

export default BottomBar;