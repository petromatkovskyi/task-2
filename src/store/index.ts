import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes_slice';
import { editingNoteReducer } from './editingNoteSlice_slice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    editingNote: editingNoteReducer,
  },
});

export default store;
