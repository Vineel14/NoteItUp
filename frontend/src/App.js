import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topmenubar from './components/Topmenubar';
import LeftDrawer from './components/LeftDrawer';
import ContentFileOptions from './components/ContentFileOptions';
import EditorPage from './components/EditorPage';
import { Typography, Box } from '@mui/material';

function App() {
  const [selectedSubject, setSelectedSubject] = useState("All Files");
  const [fileCount, setFileCount] = useState(0);  // Track the number of files created

  const handleNewFile = () => {
    setFileCount(fileCount + 1);
    window.open(`/editor?fileNumber=${fileCount + 1}`, "_blank");
  };

  return (
    <Router>
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
                  <LeftDrawer setSelectedSubject={setSelectedSubject} />
                  <Box sx={{ flexGrow: 1, padding: 3, overflowY: 'auto', height: 'calc(100vh - 75px)', marginTop: '75px', position: 'relative' }}>
                    <Box sx={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1100 }}>
                      <ContentFileOptions onNewFile={handleNewFile} />
                    </Box>
                    <Typography variant="h4" component="h1">{selectedSubject}</Typography>
                  </Box>
                </div>
              </div>
            }
          />

          {/* Isolated Editor Page */}
          <Route
            path="/editor"
            element={<EditorPage fileNumber={new URLSearchParams(window.location.search).get('fileNumber')} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
