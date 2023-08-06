import { createSlice } from '@reduxjs/toolkit';
type EditingNote = Note | null;
const initialState: EditingNote = null;

type setNoteType = (state: EditingNote, action: { payload: Note }) => void;

const setNote: setNoteType = (state, action) => {
  return action.payload;
};

const editingNoteSlice = createSlice({
  name: 'editingNoteSlice',
  initialState,
  reducers: {
    setNote,
    removeNote: (state) => null,
  },
});
export const selectEditingNote = (state: State): EditingNote => {
  console.log(state.editingNote);
  return state.editingNote;
};

export const editingNoteAction = editingNoteSlice.actions;
export const editingNoteReducer = editingNoteSlice.reducer;

export default editingNoteSlice;
