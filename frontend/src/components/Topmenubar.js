import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Avatar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',  // Slightly rounded corners
  backgroundColor: 'white',  // White background for search bar
  border: '1px solid #B0BEC5', // Slightly dark border
  marginLeft: theme.spacing(2),
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',  // Black search icon
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black', // Input and placeholder text in black
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
  '&::placeholder': {
    color: 'black', // Placeholder color in black
    opacity: 1,
  },
}));

const Topmenubar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#D4E7FF' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Left side: Web app name */}
          <Typography 
            variant="h5" 
            noWrap 
            component="div" 
            sx={{ color: 'blue', marginRight: 2, fontWeight: 'bold' }}  // Bold "NoteItUp"
          >
            NoteItUp
          </Typography>

          {/* Left side: Search bar (next to NoteItUp) */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>

        {/* Right side: Avatar with 'User' */}
        <IconButton edge="end" color="inherit">
          <Avatar sx={{ width: 56, height: 56 }}>User</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topmenubar;
