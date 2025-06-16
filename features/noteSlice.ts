// reducers.js
import { Note } from '@/providers/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState : {notes: Note[]} = {
  notes: []
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote : (state, action) => {
      state.notes.push(action.payload);
    },
    initNotes : (state, action) => {
      state.notes = action.payload;
    },
    updateNote : (state, action) => {
      const index = state.notes.findIndex((note: Note) => note.id === action.payload.id);
      state.notes[index] = action.payload;
    },
    deleteNote : (state, action) => {
      state.notes = state.notes.filter((note: Note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { initNotes, addNote, updateNote, deleteNote } = noteSlice.actions
export const selectNote = (state:any) => state.note;


export default noteSlice.reducer