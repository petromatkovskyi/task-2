import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import NoteForm from '../../components/NoteForm';

import { selectEditingNote } from '../../store/editingNoteSlice_slice';
import NoteTable from '../../components/NoteTable';

import { selectNotes } from '../../store/notes_slice';

type Props = {
  notes: Notes;
  editingNote: EditingNote;
};

export const Main = ({ notes, editingNote }: Props) => {
  const [open, setOpen] = useState(!!editingNote);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(!!editingNote);
  }, [editingNote]);

  return (
    <>
      <NoteTable onOpen={onOpen} notes={notes} editingNote={editingNote} />
      <NoteForm onClose={onClose} open={open} note={editingNote} />
    </>
  );
};

const mapStateToProps = (state: State) => ({
  notes: selectNotes(state),
  editingNote: selectEditingNote(state),
});

export default connect(mapStateToProps)(Main);
