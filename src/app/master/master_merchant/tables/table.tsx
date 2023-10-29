import { StyledTableCell, StyledTablePaginataion, StyledTableRow } from "@/app/component/styledTable"
import { isNull } from "@/global/config/config";
import { Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Button, TableFooter, TablePagination } from "@mui/material"
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getMerchant } from "../middleware/apis";
import { parseISO, format } from 'date-fns';

const TableMasterMerchant = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const { data: session, status } = useSession();

    const getData = async () => {
        const datas = await getMerchant({
            //@ts-ignore
            token: session?.accessToken,
            sort: sort,
            page: (page+1),
            perPage: rowsPerPage,
            search: search,
            id: null
        });
        setData(datas.data.data);
    };

    useEffect(() => {
        //@ts-ignore
        if (isNull(session?.accessToken) == false) {
            getData();
        }
    }, [page, rowsPerPage, search, session]);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <>
            <Stack direction="row" spacing={2} className='pb-3'>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <Button className='bg-blue-600 text-white' variant="contained">
                        Add New
                    </Button>
                </motion.div>
            </Stack>
            <TableContainer className='overflow-x-scroll relative' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                No
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Nama Merchant
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Phone Number
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Address
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Logo
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Description
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Created At
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center'>
                                Active
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 && data.map((row: {
                            id: number;
                            name: string;
                            phone: string;
                            address: string;
                            logo: string;
                            description: string;
                            created_at: string;
                            active: boolean;
                        }, index: number) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {row.phone}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {row.address}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    <img src={row.logo} alt="" width={50} />
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {row.description}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {format(new Date(row.created_at), 'd LLL yyyy')}
                                </StyledTableCell>
                                <StyledTableCell className='font-mono whitespace-nowrap text-center'>
                                    {row.active ? 'Active' : 'Not Active'}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <StyledTableRow>
                            <StyledTablePaginataion
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'font-mono': 'rows per page',
                                    },
                                    native: true,
                                }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableMasterMerchant;