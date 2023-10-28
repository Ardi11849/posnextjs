import { Key, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { StyledTableCell, StyledTableRow } from '@/app/component/styledTable';
import RowGroup from './rowGroup';
import { TableFooter, TablePagination } from '@mui/material';

export default function CollapsibleTable({ rows }: any) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell className='w-1/12' />
                        <StyledTableCell>Group Menu</StyledTableCell>
                        <StyledTableCell>Merchant Name</StyledTableCell>
                        <StyledTableCell>Active</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? rows.map((row: { name: string; merchant_name: string; active: boolean; menu: { date: string; customerId: string; amount: string; }[]; }, i: Key | null | undefined) => (
                        <RowGroup key={i} row={row} />
                    )) : ''}
                </TableBody>
                <TableFooter>
                    <StyledTableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions}
                        />
                    </StyledTableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}