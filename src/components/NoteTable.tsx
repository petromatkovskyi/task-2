import {
  Table,
  TableBody,
  Button,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteRow from './NoteRow';
import StyledTableRow from './StyledTableRow';
import { SummaryTable } from './SummaryTable';
import StyledTableCell from './StyledTableCell';

type Props = {
  notes: Notes;
  editingNote: EditingNote;
  onOpen: () => void;
};

export const NoteTable = ({ notes, editingNote, onOpen }: Props) => {
  const mapNoteRow = (note: Note) => {
    if (!note.archived) {
      return <NoteRow note={note} key={note.id} />;
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300, '& .MuiTableCell-root': { padding: { xs: 1, md: 2 } } }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" scope="row">
                Name
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Created
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Category
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" colSpan={2}>
                Content
              </StyledTableCell>
              <StyledTableCell>Dates</StyledTableCell>
              <StyledTableCell align="right">
                <CreateIcon />
                <DeleteIcon />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map(mapNoteRow)}
            <StyledTableRow>
              <StyledTableCell align="right" colSpan={7}>
                <Button
                  variant="outlined"
                  sx={{ color: 'black', borderColor: 'black' }}
                  onClick={onOpen}
                >
                  Create Note
                </Button>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow sx={{ '& > .MuiTableCell-root': { padding: 0 } }}>
              <StyledTableCell colSpan={7}>
                <SummaryTable notes={notes} />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NoteTable;
