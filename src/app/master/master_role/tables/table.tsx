import { IOSSwitch } from "@/app/component/styledForm";
import { StyledTableCell, StyledTablePaginataion, StyledTableRow } from "@/app/component/styledTable";
import { Menus } from "@/global/menus";
import { Button, Paper, Stack, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const TableMasterRole = () => {
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

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
                    <TableHead className='bg-white '>
                        <TableRow>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400' rowSpan={3}>
                                Nama Role
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            {Menus.map((row, index) => (
                                <StyledTableCell key={index} className='font-bold font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400' colSpan={row.list.length}>
                                    {row.labelGroup}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            {Menus.map((row, index) => (
                                row.list.map((row2, index2) => (
                                    <StyledTableCell key={index2} className='font-bold text-center font-mono whitespace-nowrap border-solid border-2 border-gray-400'>{row2.nama}</StyledTableCell>
                                ))
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                {Menus.map((row, index) => (
                                    row.list.map((row2, index2) => (
                                        <StyledTableCell key={index2}>
                                            <IOSSwitch sx={{ m: 1 }} />
                                        </StyledTableCell>
                                    ))
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <StyledTableRow>
                            <StyledTablePaginataion
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={rows.length}
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