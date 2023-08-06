import { tableCellClasses, TableCell, styled, TableCellProps } from '@mui/material';

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'useStyled',
})<TableCellProps & { useStyled?: boolean }>(({ useStyled, theme }) =>
  !useStyled
    ? {
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }
    : {}
);

export default StyledTableCell;
