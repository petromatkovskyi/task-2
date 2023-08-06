import { useState } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Table,
  tableCellClasses,
  TableCell,
  Collapse,
  TableBody,
  Typography,
} from '@mui/material/';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import CategoryIcon from './CategoryIcon';
import NoteRow from './NoteRow';
import StyledTableRow from './StyledTableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type Props = {
  category: string;
  archived: number;
  active: number;
  notes: Notes;
};

export const SummaryNoteRow = ({ category, archived, active, notes }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <StyledTableRow sx={{ borderBottom: 1 }}>
        <StyledTableCell scope="row" colSpan={4}>
          <CategoryIcon category={category} />
          &nbsp;
          <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>
            {category}
          </Typography>
        </StyledTableCell>
        <StyledTableCell scope="row">{active}</StyledTableCell>
        <StyledTableCell scope="row">{archived}</StyledTableCell>
        <StyledTableCell scope="row" align="right">
          {open ? (
            <ExpandLess onClick={handleClick} sx={{ cursor: 'pointer' }} />
          ) : (
            <ExpandMore onClick={handleClick} sx={{ cursor: 'pointer' }} />
          )}
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow sx={{ '& > .MuiTableCell-root': { padding: 0 } }}>
        <StyledTableCell scope="row" colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table
              sx={{
                '& :last-child td, &:last-child th': { borderTop: 1, borderBottom: 1 },
              }}
            >
              <TableBody>
                {notes.map(
                  (note) =>
                    note.category === category &&
                    note.archived && <NoteRow note={note} key={note.id} />
                )}
              </TableBody>
            </Table>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryNoteRow);
