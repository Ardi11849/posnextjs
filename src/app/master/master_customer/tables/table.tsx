import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable"
import { Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Button } from "@mui/material"
import { motion } from 'framer-motion';

const TableMasterCustomer = () => {
    return (
        <>
            <Stack direction="row" spacing={2} className='pb-3'>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <Button className='bg-blue-600 text-white' variant="contained">
                        Add New
                    </Button>
                </motion.div>
            </Stack>
            <TableContainer className='overflow-x-scroll rounded-lg relative' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='bg-white '>
                        <TableRow>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Nama Role
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableMasterCustomer;