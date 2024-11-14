// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  selectedSubject: 'All Files', // Default subject
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setSelectedSubject(state, action) {
      state.selectedSubject = action.payload;
    },
  },
});

export const { setUserId, setSelectedSubject } = userSlice.actions;
export default userSlice.reducer;
