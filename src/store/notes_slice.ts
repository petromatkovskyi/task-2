import { PayloadAction, createSlice, CaseReducer } from '@reduxjs/toolkit';
import _ from 'lodash';

import { DATE_FORMATTER } from '../utils/DATA_FORMATTER';

const initialState: Notes = [
  {
    name: 'Shopping',
    category: 'Task',
    content: 'Buy a milk',
    created: DATE_FORMATTER.format(new Date('2022-5-3')),
    id: _.uniqueId('note'),
    archived: false,
    dates: '',
  },
  {
    name: 'Shower',
    category: 'Task',
    content: 'Take a shower',
    created: DATE_FORMATTER.format(new Date('2023-5-7')),
    id: _.uniqueId('note'),
    archived: false,
    dates: '',
  },
  {
    name: 'Appointment',
    category: 'Random Thought',
    content: 'Some another content on content 3',
    created: DATE_FORMATTER.format(new Date('2021-5-16')),
    id: _.uniqueId('note'),
    archived: true,
    dates: '',
  },
  {
    name: 'Appointment',
    category: 'Task',
    content: 'I have to go to the dentist on 5-3-2024',
    created: DATE_FORMATTER.format(new Date('2021-5-25')),
    id: _.uniqueId('note'),
    archived: false,
    dates: '5-3-2024',
  },
  {
    name: 'Appointment',
    category: 'Random Thought',
    content: 'Some another content on content 4',
    created: DATE_FORMATTER.format(new Date('2021-5-25')),
    id: _.uniqueId('note'),
    archived: false,
    dates: '',
  },
  {
    name: 'New type of car',
    category: 'Idea',
    content: 'Create car with coal engine',
    created: DATE_FORMATTER.format(new Date('2021-5-25')),
    id: _.uniqueId('note'),
    archived: true,
    dates: '',
  },
  {
    name: 'Another life',
    category: 'Random Thought',
    content: 'Is there anything beyond the Earth?',
    created: DATE_FORMATTER.format(new Date('2023-5-25')),
    id: _.uniqueId('note'),
    archived: true,
    dates: '',
  },
];

const addNote: CaseReducer<Notes, PayloadAction<Note>> = (state, action) => {
  return [...state, action.payload];
};

const notesSlice = createSlice({
  name: 'notesSlice',
  initialState,
  reducers: {
    addNote,
    removeNote: (state, action) => state.filter((note) => note.id !== action.payload),
    archiveNote: (state, { payload }) =>
      state.map((note) =>
        note.id !== payload ? note : { ...note, archived: !note.archived }
      ),
    editNote: (state, { payload }) => {
      const newState = state.map((note) => (note.id !== payload.id ? note : payload));
      return newState;
    },
  },
});

export const selectNotes = (state: State) => state.notes;

export const noteAction = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export default notesSlice;
