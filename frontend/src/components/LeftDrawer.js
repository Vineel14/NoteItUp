import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setSelectedSubject } from '../store/userSlice';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Settings, Help, Add, MoreVert } from '@mui/icons-material';
import axios from '../axiosConfig'; // Use the configured Axios instance


const drawerWidth = 240;

const LeftDrawer = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId); // Access userId from Redux
  const [subjects, setSubjects] = useState([]);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`/file/subjects`, { headers: { userId } });
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    if (userId) fetchSubjects(); // Fetch only if userId is available
  }, [userId]);

  const handleAddSubject = async () => {
    const subjectName = prompt('Enter subject name:');
    if (subjectName) {
      try {
        const response = await axios.post(
          '/file/addSubject',
          { subject: subjectName },
          { headers: { userId } }
        );
        setSubjects([...subjects, response.data.subject]);
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '75px' },
      }}
    >
      <List>
        {/* Settings and Help section */}
        <ListItem button onClick={() => dispatch(setSelectedSubject("All Files"))}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button onClick={() => dispatch(setSelectedSubject("All Files"))}>
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        <Divider />

        {/* All Files section */}
        <ListItem button onClick={() => dispatch(setSelectedSubject("All Files"))}>
          <ListItemText primary="All Files" />
        </ListItem>

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
              onClick={() => dispatch(setSelectedSubject(subject))}
              onMouseEnter={() => setHoveredSubject(index)}
              onMouseLeave={() => setHoveredSubject(null)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                '&:hover': { backgroundColor: '#E9F3FF' },
              }}
            >
              <ListItemText primary={subject} />
              {hoveredSubject === index && (
                <IconButton edge="end"><MoreVert /></IconButton>
              )}
            </ListItem>
          ))}
        </div>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
