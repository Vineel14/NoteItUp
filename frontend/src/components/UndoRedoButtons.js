import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';  // Undo icon
import RedoIcon from '@mui/icons-material/Redo';  // Redo icon

const UndoRedoButtons = ({ undo, redo }) => {
  return (
    <ToggleButtonGroup
      exclusive
      sx={{
        position: 'fixed',
        right: '10px',  // Top right corner
        top: '80px',
        zIndex: 1100,  // Keep above other content
        backgroundColor: '#eff2ff',
        borderRadius: '8px',  // Rounded corners
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Undo button */}
      <ToggleButton value="undo" onClick={undo}>
        <UndoIcon />
      </ToggleButton>

      {/* Redo button */}
      <ToggleButton value="redo" onClick={redo}>
        <RedoIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default UndoRedoButtons;
