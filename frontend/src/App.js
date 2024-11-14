// App.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { Routes, Route } from 'react-router-dom';
import Topmenubar from './components/Topmenubar';
import LeftDrawer from './components/LeftDrawer';
import ContentFileOptions from './components/ContentFileOptions';
import EditorPage from './components/EditorPage';
import { Typography, Box } from '@mui/material';
import { format } from 'date-fns';

function App() {
  const selectedSubject = useSelector((state) => state.user.selectedSubject); // Access selectedSubject from Redux
  const [fileCount, setFileCount] = useState(1);  // Track the number of files created

  const handleNewFile = () => {
    setFileCount((prevCount) => {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'MMMM dd, yyyy');
      const newFileName = `${formattedDate} (${fileCount})`;
      
      // Open the editor with the newly generated file name
      const newTabUrl = `${window.location.origin}/editor?fileName=${encodeURIComponent(newFileName)}`;
      window.open(newTabUrl, "_blank"); // Open in a new tab
  
      // Increment the count for the next file
      return prevCount + 1;
    });
  };
  
  return (
    <div>
      <Routes>
        {/* Main Homepage Layout */}
        <Route
          path="/"
          element={
            <div>
              <div style={{ position: 'fixed', width: '100%', zIndex: 1200 }}>
                <Topmenubar />
              </div>
              <div style={{ display: 'flex', height: '100vh' }}>
                <LeftDrawer />
                <Box sx={{ flexGrow: 1, padding: 3, overflowY: 'auto', height: 'calc(100vh - 75px)', marginTop: '75px', position: 'relative' }}>
                  <Box sx={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1100 }}>
                    <ContentFileOptions onNewFile={handleNewFile} />
                  </Box>
                  {/* Display selected subject as heading */}
                  <Typography variant="h4" component="h1">{selectedSubject}</Typography>
                </Box>
              </div>
            </div>
          }
        />

        {/* Isolated Editor Page */}
        <Route
          path="/editor"
          element={<EditorPage fileName={new URLSearchParams(window.location.search).get('fileName')} />}
        />
      </Routes>
    </div>
  );
}

export default App;
