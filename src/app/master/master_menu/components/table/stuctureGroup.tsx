import { useEffect, useState } from 'react';
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
import { IconSearch } from '@tabler/icons-react';
import { Button, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export default function StructureGroup({ refresh, handleClickOpen, showFormMenu, showFormFunction, showTable, merchantId }: any) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [searchTabel, setSearchTabel] = useState('');
    const [sort, setSort] = useState('ASC');
    const [message, setMessage] = useState('');
    const { data: session, status } = useSession();

    const getData = async () => {
        const datas: any = {
            merchant_id: merchantId,
            id: null,
            search: searchTabel,
            sort: sort
        }

        const result = await getMasterMenuRelation(datas);
        console.log(result);
        
        if (result.status >= 200 && result.status < 300) {
            setRows(result.data.data);
        } else {
            setRows([]);
            setMessage(result.data.message);
        }
    }

    useEffect(() => {
        if (isNull(session) == false && isNull(merchantId) == false) getData();
    }, [merchantId, searchTabel, refresh]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
        id: string;
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
        <>
            <Grid className='pt-5 pb-3' container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <Stack direction="row" spacing={2} className='pb-3'>
                        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                            <Button className='bg-blue-600 text-white' variant="contained" onClick={() => handleClickOpen('create')}>
                                Add New
                            </Button>
                        </motion.div>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div className="relative">
                        <input
                            onChange={(e) => setSearchTabel(e.target.value)}
                            value={searchTabel}
                            type="text"
                            placeholder="Search"
                            className="py-2 pl-10 pr-4 text-black border rounded-full w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <IconSearch className="text-gray-500 absolute left-3 top-1/4" />
                    </div>
                </Grid>
            </Grid>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell className='w-1/12' />
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Group Menu</StyledTableCell>
                            <StyledTableCell>Status Aktif</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.map((row: rowInterface, i: number) => (
                            <RowGroup key={i} row={row} number={(i + 1)} showFormMenu={showFormMenu} showFormFunction={showFormFunction} showTable={showTable} handleClickOpen={handleClickOpen} />
                        )) :
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} sx={{ textAlign: 'center' }}>{message}</StyledTableCell>
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
        </>
    );
}