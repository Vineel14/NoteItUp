import React, { useState } from 'react';
import { Box } from '@mui/material';
import Editormenubar from './Editormenubar';  // Import Editormenubar
import BottomBar from './BottomBar';  // Import BottomBar
import HandwritingCanvas from './HandwritingCanvas';  // Import the handwriting canvas
import UndoRedoButtons from './UndoRedoButtons';  // Import UndoRedoButtons

const EditorPage = ({ fileNumber }) => {
  const [isPenActive, setIsPenActive] = useState(false);  // State to track pen tool
  const [isEraserActive, setIsEraserActive] = useState(false);  // State to track eraser tool
  const [penThickness, setPenThickness] = useState(1);  // Default pen thickness
  const [penColor, setPenColor] = useState('#000000');  // Default pen color (black)
  const [undoHandler, setUndoHandler] = useState(() => () => {});
  const [redoHandler, setRedoHandler] = useState(() => () => {});

  return (
    <div>
      {/* Fixed Editormenubar at the top */}
      <Editormenubar
        setIsPenActive={setIsPenActive}
        setIsEraserActive={setIsEraserActive}
        setPenThickness={setPenThickness}  // Pass pen thickness setter
        setPenColor={setPenColor}  // Pass pen color setter
        fileNumber={fileNumber}
      />

      {/* Undo/Redo buttons fixed at the top right corner of the editor content */}
      <UndoRedoButtons undo={undoHandler} redo={redoHandler} />

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
            width: {
              xs: '90%',  // On small screens (like iPad), the paper takes 90% of the editor area
              md: '794px',  // A4 size width in pixels for desktop
            },
            height: {
              xs: 'auto',  // Adjust height for mobile
              md: '1123px',  // A4 size height for desktop
            },
            maxWidth: '100%',
            maxHeight: '100%',
            padding: 3,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            aspectRatio: '794 / 1123',  // Maintain A4 aspect ratio on all screens
          }}
        >
          {/* Handwriting Canvas */}
          <HandwritingCanvas
            isPenActive={isPenActive}
            isEraserActive={isEraserActive}
            penThickness={penThickness}  // Pass the pen thickness to the canvas
            penColor={penColor}  // Pass the pen color to the canvas
            setUndoHandler={setUndoHandler}
            setRedoHandler={setRedoHandler}
          />
        </Box>
      </Box>

      {/* Fixed BottomBar at the bottom */}
      <BottomBar />
    </div>
  );
};

export default EditorPage;