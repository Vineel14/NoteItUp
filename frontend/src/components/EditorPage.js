import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Editormenubar from './Editormenubar';
import BottomBar from './BottomBar';
import HandwritingCanvas from './HandwritingCanvas';
import UndoRedoButtons from './UndoRedoButtons';

const EditorPage = () => {
  const location = useLocation();
  const fileName = new URLSearchParams(location.search).get('fileName'); // Get fileName from query params
  console.log("EditorPage rendered with fileName:", fileName); // Log fileName for debugging

  const [pages, setPages] = useState([{ id: 1 }]);
  const [currentPage, setCurrentPage] = useState(1);
  const editorContentRef = useRef(null);
  const navigate = useNavigate();

  const [isPenActive, setIsPenActive] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [penThickness, setPenThickness] = useState(1);
  const [penColor, setPenColor] = useState('#000000');

  const [globalActionStack, setGlobalActionStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const addActionToGlobalStack = useCallback((action) => {
    setGlobalActionStack((prev) => [...prev, action]);
    setRedoStack([]); // Clear redo stack whenever a new action is added
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const editor = editorContentRef.current;
      if (editor) {
        const scrollBottom = editor.scrollTop + editor.clientHeight;
        if (scrollBottom >= editor.scrollHeight - 20) {
          setPages((prevPages) => [...prevPages, { id: prevPages.length + 1 }]);
        }

        const pageHeight = 1123;
        const currentPageNumber = Math.floor(editor.scrollTop / pageHeight) + 1;
        setCurrentPage(currentPageNumber);
      }
    };

    const editor = editorContentRef.current;
    if (editor) {
      editor.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (editor) {
        editor.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pages]);

  const handleUndo = () => {
    if (globalActionStack.length === 0) return;
    const lastAction = globalActionStack[globalActionStack.length - 1];
    lastAction.undo();
    setGlobalActionStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastAction]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const lastUndoneAction = redoStack[redoStack.length - 1];
    lastUndoneAction.redo();
    setRedoStack((prev) => prev.slice(0, -1));
    setGlobalActionStack((prev) => [...prev, lastUndoneAction]);
  };

  return (
    <div>
      {/* Fixed Back Button */}
      <IconButton
        onClick={() => navigate('/home')}
        sx={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          zIndex: 1300,
          color: '#333333',
          fontSize: '1.8rem',
          '&:hover': {
            color: '#000000',
          }
        }}
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>

      <Editormenubar
        setIsPenActive={setIsPenActive}
        setIsEraserActive={setIsEraserActive}
        setPenThickness={setPenThickness}
        setPenColor={setPenColor}
        fileName={fileName}
      />

      <UndoRedoButtons undo={handleUndo} redo={handleRedo} />

      <Box
        ref={editorContentRef}
        sx={{
          backgroundColor: '#EAEAEA',
          marginTop: '50px',
          marginBottom: '10px',
          height: 'calc(120vh - 150px)',
          overflowY: 'auto',
          paddingTop: '40px',
          paddingBottom: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {pages.map((page) => (
          <Box
            key={page.id}
            sx={{
              backgroundColor: 'white',
              width: {
                xs: '90%',
                md: '794px',
              },
              minHeight: '1123px',
              padding: 0,
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              position: 'relative',
            }}
          >
            <HandwritingCanvas
              isPenActive={isPenActive}
              isEraserActive={isEraserActive}
              penThickness={penThickness}
              penColor={penColor}
              addActionToGlobalStack={addActionToGlobalStack}
            />
          </Box>
        ))}
      </Box>

      <BottomBar currentPage={currentPage} totalPages={pages.length} />
    </div>
  );
};

export default EditorPage;
