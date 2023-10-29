import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import { Box, Button, Stack, Table, TableBody, TableHead, Typography } from "@mui/material";
import { Key, useState } from "react";
import { motion } from 'framer-motion';
import RowFunction from "./rowFunction";


interface InterfaceRow {
    list_function: {
        id: string;
        name: string;
        link: string;
        active: boolean;
    }[];
};

function StructureFunction({ list_function }: InterfaceRow) {
    const [open, setOpen] = useState(false);

    interface rowInterface {
        id: string;
        name: string;
        link: string;
        active: boolean;
    };
    return (
        <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                function
            </Typography>
            <Stack direction="row" spacing={2} className='pb-3'>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <Button className='bg-blue-600 text-white' variant="contained">
                        Add New
                    </Button>
                </motion.div>
            </Stack>
            <Table className="min-w-full" size="small" aria-label="purchases">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Nama</StyledTableCell>
                        <StyledTableCell>Link</StyledTableCell>
                        <StyledTableCell>Active</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {list_function.length > 0 ? list_function.map((row: rowInterface, i: Key | null | undefined) => (
                        <RowFunction key={i} row={row} />
                    )) : ''}
                </TableBody>
            </Table>
        </Box>
    )
}

export default StructureFunction;