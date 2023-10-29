import { Key, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { StyledTableCell, StyledTableRow } from '@/app/component/styledTable';
import RowGroup from './rowGroup';
import { TableFooter, TablePagination } from '@mui/material';
import { useSession } from 'next-auth/react';
import { isNull } from '@/global/config/config';
import { getMasterMenuRelation } from '../../middleware/apis';

export default function StructureGroup({showFromMenu, showFromFunction, showTable, merchant_id}:  any) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const { data: session, status } = useSession();

    const getData = async () => {
        const datas: any = {
            //@ts-ignore
            token: session.accessToken,
            //@ts-ignore
            merchant_id: merchant_id,
            id: null,
            search: search,
            sort: sort
        }
        
        const result = await getMasterMenuRelation(datas);
        console.log(result);        
        setRows(result.data.data);
    }

    console.log(rows);
    
    useEffect(() => {
        if (isNull(session) == false && isNull(merchant_id) == false) getData();
    }, [merchant_id]);

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
    interface rowInterface { 
        label_group: string; 
        merchant_name: string; 
        active: boolean; 
        list_detail: { 
            id: string;
            name: string;
            image: string;
            icon: string;
            link: string;
            active: boolean;
            list_function: {
                id: string;
                name: string;
                link: string;
                active: boolean;
            };
        }[]; 
    }

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell className='w-1/12' />
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell>Group Menu</StyledTableCell>
                        <StyledTableCell>Active</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? rows.map((row: rowInterface, i: Key | null | undefined | number) => (
                        <RowGroup key={i} row={row} number={i} showFromMenu={showFromMenu} showFromFunction={showFromFunction} showTable={showTable} />
                    )) : 
                    <StyledTableRow>
                        <StyledTableCell colSpan={6} sx={{ textAlign: 'center' }}>Data Not Found</StyledTableCell>
                    </StyledTableRow>}
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