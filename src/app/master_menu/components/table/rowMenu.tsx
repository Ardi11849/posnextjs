import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, CardMedia, Collapse, IconButton, Stack, Table, TableBody, TableHead, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface InterfaceRow {
    menu: {
        date: string;
        customerId: string;
        amount: string;
    }[];
};

function RowMenu({ menu }: InterfaceRow) {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                menu
            </Typography>
            <Stack direction="row" spacing={2} className='pb-3'>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <Button className='bg-blue-600 text-white' variant="contained">
                        Add New
                    </Button>
                </motion.div>
            </Stack>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Nama</StyledTableCell>
                        <StyledTableCell>Link</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Icon</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow key='1'>
                        <StyledTableCell component="th" scope="row">Master Menu</StyledTableCell>
                        <StyledTableCell>/master_menu</StyledTableCell>
                        <StyledTableCell>
                            <CardMedia
                                component="img"
                                sx={{ height: '50px', width: '50px' }}
                                image="https://png.pngtree.com/png-clipart/20200701/original/pngtree-hand-drawn-cartoon-list-plant-illustration-png-image_5357532.jpg"
                                alt="Live from space album cover" />
                        </StyledTableCell>
                        <StyledTableCell>
                            <FontAwesomeIcon
                                //@ts-ignore
                                icon="list"
                                size="xl"
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key='2'>
                        <StyledTableCell component="th" scope="row">Master Menu</StyledTableCell>
                        <StyledTableCell>/master_menu</StyledTableCell>
                        <StyledTableCell>
                            <CardMedia
                                component="img"
                                sx={{ height: '50px', width: '50px' }}
                                image="https://png.pngtree.com/png-clipart/20200701/original/pngtree-hand-drawn-cartoon-list-plant-illustration-png-image_5357532.jpg"
                                alt="Live from space album cover" />
                        </StyledTableCell>
                        <StyledTableCell>
                            <FontAwesomeIcon
                                //@ts-ignore
                                icon="list"
                                size="xl"
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

export default RowMenu;