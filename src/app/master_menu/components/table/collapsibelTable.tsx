import { Key } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { StyledTableCell, StyledTableRow } from '@/app/component/styledTable';
import RowGroup from './rowGroup';

export default function CollapsibleTable({rows}: any) {

    return (
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell className='w-1/12' />
                            <StyledTableCell>Group Menu</StyledTableCell>
                            <StyledTableCell>Merchant Name</StyledTableCell>
                            <StyledTableCell>Active</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.map((row: { name: string; merchant_name: string; active: boolean; menu: { date: string; customerId: string; amount: string; }[]; }, i: Key | null | undefined) => (
                            <RowGroup key={i} row={row} />
                        )) : ''}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}