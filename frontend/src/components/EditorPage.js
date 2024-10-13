import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Editormenubar from './Editormenubar';
import BottomBar from './BottomBar';
import HandwritingCanvas from './HandwritingCanvas';
import UndoRedoButtons from './UndoRedoButtons';

const EditorPage = ({ fileNumber }) => {
  const [pages, setPages] = useState([{ id: 1 }]);  // Start with one page
  const [currentPage, setCurrentPage] = useState(1);
  const editorContentRef = useRef(null);

  const [isPenActive, setIsPenActive] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [penThickness, setPenThickness] = useState(1);
  const [penColor, setPenColor] = useState('#000000');

  const [undoHandlers, setUndoHandlers] = useState({});
  const [redoHandlers, setRedoHandlers] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const editor = editorContentRef.current;
      if (editor) {
        const scrollBottom = editor.scrollTop + editor.clientHeight;
        if (scrollBottom >= editor.scrollHeight - 10) {
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

  const handleSetUndoRedo = (pageId, undoHandler, redoHandler) => {
    setUndoHandlers((prev) => ({ ...prev, [pageId]: undoHandler }));
    setRedoHandlers((prev) => ({ ...prev, [pageId]: redoHandler }));
  };

  return (
    <div>
      <Editormenubar
        setIsPenActive={setIsPenActive}
        setIsEraserActive={setIsEraserActive}
        setPenThickness={setPenThickness}
        setPenColor={setPenColor}
        fileNumber={fileNumber}
      />

      <UndoRedoButtons
        undo={undoHandlers[currentPage] || (() => {})}
        redo={redoHandlers[currentPage] || (() => {})}
      />

      <Box
        ref={editorContentRef}
        sx={{
          backgroundColor: '#EAEAEA',
          marginTop: '40px',
          marginBottom: '10px',
          height: 'calc(100vh - 150px)',
          overflowY: 'scroll',
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
              setUndoHandler={(undo) => handleSetUndoRedo(page.id, undo, redoHandlers[page.id])}
              setRedoHandler={(redo) => handleSetUndoRedo(page.id, undoHandlers[page.id], redo)}
            />
          </Box>
        ))}
      </Box>

      <BottomBar currentPage={currentPage} totalPages={pages.length} />
    </div>
  );
};

export default EditorPage;
