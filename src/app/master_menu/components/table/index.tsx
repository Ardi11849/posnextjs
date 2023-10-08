import { Card, CardContent, Grid, Paper, TableBody, TableContainer, Table, TableHead, TableRow, Typography, styled } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { motion } from "framer-motion";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bdbdbd',
        color: theme.palette.common.black,
        padding: 5
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const TableMenu = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="rounded-lg">
                <Grid>
                    <Grid item>
                        <CardContent className='rounded-lg overflow-y-auto'>
                            <Typography variant="h6" component="div">
                                Master Role
                            </Typography>
                            <div className=''>
                                <TableContainer className='pt-3 overflow-x-scroll rounded-lg relative' component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead className='bg-white '>
                                            <TableRow>
                                                <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400' rowSpan={3}>
                                                    Nama Role
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow >
                                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                                    a
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </motion.div>
    )
}

export default TableMenu