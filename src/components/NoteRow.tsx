import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';

import CategoryIcon from './CategoryIcon';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';

import { noteAction } from '../store/notes_slice';
import { editingNoteAction } from '../store/editingNoteSlice_slice';

type Props = {
  note: Note;
} & DispatchProps;

function NoteRow({ note, remove, archive, setNote }: Props) {
  const handlerEdit = () => {
    setNote(note);
  };
  const handlerArchive = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    archive(note.id);
  const handlerRemove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    remove(note.id);

  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <CategoryIcon category={note.category} />
        &nbsp;
        {note.name}
      </StyledTableCell>
      <StyledTableCell>{note.created}</StyledTableCell>
      <StyledTableCell>{note.category}</StyledTableCell>
      <StyledTableCell scope="row" colSpan={2}>
        {note.content}
      </StyledTableCell>
      <StyledTableCell>{note.dates}</StyledTableCell>
      <StyledTableCell align="right">
        {note.archived ? (
          <UnarchiveIcon sx={{ cursor: 'pointer' }} onClick={handlerArchive} />
        ) : (
          <ArchiveIcon sx={{ cursor: 'pointer' }} onClick={handlerArchive} />
        )}
        <CreateIcon sx={{ cursor: 'pointer' }} onClick={handlerEdit} />
        <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handlerRemove} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

interface DispatchProps {
  remove: (id: string) => void;
  archive: (id: string) => void;
  setNote: (note: Note) => void;
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    remove: (id) => dispatch(noteAction.removeNote(id)),
    archive: (id) => dispatch(noteAction.archiveNote(id)),
    setNote: (note) => dispatch(editingNoteAction.setNote(note)),
  };
}

export default connect(null, mapDispatchToProps)(NoteRow);
