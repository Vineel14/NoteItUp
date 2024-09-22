import React from 'react';
import Topmenubar from './components/Topmenubar';
import LeftDrawer from './components/LeftDrawer';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Topmenubar />
      <LeftDrawer />
      {/* You can add other components/content here */}
    </div>
  );
}

export default App;
