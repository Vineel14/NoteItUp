import React, { useState } from 'react';
import { Box } from '@mui/material';
import Editormenubar from './Editormenubar';  // Import Editormenubar
import BottomBar from './BottomBar';  // Import BottomBar
import HandwritingCanvas from './HandwritingCanvas';  // Import the handwriting canvas

const EditorPage = ({ fileNumber }) => {
  const [isPenActive, setIsPenActive] = useState(false);  // State to track pen tool
  const [isEraserActive, setIsEraserActive] = useState(false);  // State to track eraser tool

  // We'll keep the undo and redo handlers within the HandwritingCanvas
  const [undoHandler, setUndoHandler] = useState(() => () => {});
  const [redoHandler, setRedoHandler] = useState(() => () => {});

  return (
    <div>
      {/* Fixed Editormenubar at the top */}
      <Editormenubar
        setIsPenActive={setIsPenActive}
        setIsEraserActive={setIsEraserActive}
        undo={undoHandler}  // Use the undoHandler reference
        redo={redoHandler}  // Use the redoHandler reference
        fileNumber={fileNumber}
      />

      {/* Scrollable Editor Content */}
      <Box
        sx={{
          backgroundColor: '#EAEAEA',
          marginTop: '40px',
          marginBottom: '10px',
          height: 'auto',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '40px',
          paddingBottom: '15px',
        }}
      >
        {/* White page where the canvas is rendered */}
        <Box
          sx={{
            backgroundColor: 'white',
            width: '794px',  // A4 size width in pixels (for web display)
            height: '1123px',  // A4 size height in pixels
            padding: 3,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
          }}
        >
          {/* Handwriting Canvas */}
          <HandwritingCanvas
            isPenActive={isPenActive}
            isEraserActive={isEraserActive}
            setUndoHandler={setUndoHandler}  // Pass undo handler to canvas
            setRedoHandler={setRedoHandler}  // Pass redo handler to canvas
          />
        </Box>
      </Box>

      {/* Fixed BottomBar at the bottom */}
      <BottomBar />
    </div>
  );
};

export default EditorPage;
