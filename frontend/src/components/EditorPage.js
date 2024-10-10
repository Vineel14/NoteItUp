import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Editormenubar from './Editormenubar';  // Import Editormenubar
import BottomBar from './BottomBar';  // Import BottomBar
import HandwritingCanvas from './HandwritingCanvas';  // Import the handwriting canvas

const EditorPage = ({ fileNumber }) => {
  const [pages, setPages] = useState([1]);  // Initially, there's only one page
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const editorContentRef = useRef(null);

  const [isPenActive, setIsPenActive] = useState(false);  // State to track pen tool

  // Add scroll listener to detect when bottom is reached
  useEffect(() => {
    const handleScroll = () => {
      const editor = editorContentRef.current;
      if (editor) {
        const scrollBottom = editor.scrollTop + editor.clientHeight;
        // Check if user has scrolled to within 10px of the bottom of the content
        if (scrollBottom >= editor.scrollHeight - 10) {
          // Add a new page when bottom is reached
          setPages((prevPages) => [...prevPages, prevPages.length + 1]);
        }

        // Detect which page is in view based on scroll position
        const pageHeight = 1123;  // A4 height in pixels
        const currentPageNumber = Math.floor(editor.scrollTop / pageHeight) + 1;
        setCurrentPage(currentPageNumber);  // Update the current page
      }
    };

    // Attach the scroll event listener
    const editor = editorContentRef.current;
    if (editor) {
      editor.addEventListener('scroll', handleScroll);
    }

    // Cleanup listener on component unmount
    return () => {
      if (editor) {
        editor.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pages]);  // Re-run when pages change

  return (
    <div>
      {/* Fixed Editormenubar at the top */}
      <Editormenubar setIsPenActive={setIsPenActive} fileNumber={fileNumber} />

      {/* Scrollable Editor Content */}
      <Box
        ref={editorContentRef}
        sx={{
          backgroundColor: '#EAEAEA',
          marginTop: '40px',
          marginBottom: '10px',
          height: 'auto',
          maxHeight: 'calc(100vh - 150px)',  // Adjust based on layout
          overflowY: 'auto',  // Ensure the content is scrollable
          paddingTop: '40px',
          paddingBottom: '50px',
          display: 'flex',
          flexDirection: 'column',  // Ensure pages are stacked vertically
          alignItems: 'center',  // Center the pages horizontally
        }}
      >
        {/* Render pages dynamically */}
        {pages.map((pageNum) => (
          <Box
            key={pageNum}
            sx={{
              backgroundColor: 'white',
              width: '794px',  // A4 size width in pixels (for web display)
              height: '1123px',  // A4 size height in pixels
              padding: 0,  // Remove any padding that might shrink the content
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',  // Add some space between pages
              position: 'relative',
              display: 'block',  // Ensure the Box behaves like a block element
            }}
          >
            {/* Handwriting Canvas */}
            <HandwritingCanvas isPenActive={isPenActive} />
          </Box>
        ))}
      </Box>

      {/* Fixed BottomBar at the bottom */}
      <BottomBar currentPage={currentPage} totalPages={pages.length} />
    </div>
  );
};

export default EditorPage;
