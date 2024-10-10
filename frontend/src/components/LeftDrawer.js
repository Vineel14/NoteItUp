import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Settings, Help, Add, MoreVert } from '@mui/icons-material';

const drawerWidth = 240;

const LeftDrawer = ({ setSelectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  // Add new subject prompt
  const handleAddSubject = () => {
    const subjectName = prompt('Enter subject name:');
    if (subjectName) {
      setSubjects([...subjects, subjectName]);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '75px' }, // Leave space for the Topmenubar
      }}
    >
      <List>
        {/* Settings and Help section */}
        <ListItem 
          button
          sx={{
            '&:hover': { backgroundColor: '#E9F3FF' }, // Hover background color
          }}
          onClick={() => setSelectedSubject("All Files")} // Reset to "All Files"
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem 
          button
          sx={{
            '&:hover': { backgroundColor: '#E9F3FF' }, // Hover background color
          }}
          onClick={() => setSelectedSubject("All Files")} // Reset to "All Files"
        >
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        {/* Divider */}
        <Divider />

        {/* All Files section */}
        <ListItem
          button
          sx={{
            '&:hover': { backgroundColor: '#E9F3FF' }, // Hover background color
          }}
          onClick={() => setSelectedSubject("All Files")} // Default heading
        >
          <ListItemText primary="All Files" />
        </ListItem>

        {/* Divider */}
        <Divider />

        {/* Subject section with Add button */}
        <ListItem>
          <ListItemText primary="Subjects" />
          <IconButton edge="end" onClick={handleAddSubject}>
            <Add />
          </IconButton>
        </ListItem>

        {/* Dynamic list of subjects */}
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {subjects.map((subject, index) => (
            <ListItem
              key={index}
              button
              onClick={() => setSelectedSubject(subject)}  // Update the heading with the selected subject
              onMouseEnter={() => setHoveredSubject(index)}
              onMouseLeave={() => setHoveredSubject(null)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                '&:hover': { backgroundColor: '#E9F3FF' }, // Hover background color for dynamic subjects
              }}
            >
              <ListItemText primary={subject} />
              {hoveredSubject === index && (
                <IconButton edge="end">
                  <MoreVert />
                </IconButton>
              )}
            </ListItem>
          ))}
        </div>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;