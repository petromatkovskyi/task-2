import { Table, TableBody, TableHead } from '@mui/material';

import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import SummaryNoteRow from './SummaryNoteRow';

import prepareSummaryData from '../utils/prepareSummaryData';

type Props = {
  notes: Notes;
};

export const SummaryTable = ({ notes }: Props) => {
  const mapSummaryRows = () => {
    const summaryData: SummaryData = prepareSummaryData(notes);
    const summaryRows = [];
    for (let category in summaryData) {
      summaryRows.push(
        <SummaryNoteRow
          category={category}
          archived={summaryData[category].archived}
          active={summaryData[category].active}
          notes={notes}
          key={category}
        />
      );
    }
    return summaryRows;
  };

  return (
    <Table sx={{ minWidth: 300 }}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell colSpan={4}>Note Category</StyledTableCell>
          <StyledTableCell>Active</StyledTableCell>
          <StyledTableCell>Archive</StyledTableCell>
          <StyledTableCell align="right">Check Archived</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>{mapSummaryRows()}</TableBody>
    </Table>
  );
};
