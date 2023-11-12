import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import { Box, Button, Stack, Table, TableBody, TableHead, Typography } from "@mui/material";
import { Key, useState } from "react";
import { motion } from 'framer-motion';
import RowMenu from "./rowMenu";
import { isNull } from "@/global/config/config";


interface InterfaceRow {
    id?: string;
    list_detail?: {
        id?: string;
        name?: string;
        image?: string;
        icon?: string;
        link?: string;
        active?: boolean;
        list_function?: {
            id?: string;
            name?: string;
            link?: string;
            active?: boolean;
        };
    }[];
    showFromFunction?: any;
    showFromMenu?: any;
    showTable?: any;
};

function StructureMenu({ id, list_detail, showFromFunction, showFromMenu, showTable }: InterfaceRow) {
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);

    const handleClick = (event: { currentTarget: any; }) => {
        setOpenAction(!openAction);
    };

    interface rowInterface {
        id?: string;
        name?: string;
        image?: string;
        icon?: string;
        link?: string;
        active?: boolean;
        list_function?: {
            id?: string;
            name?: string;
            link?: string;
            active?: boolean;
        };
    };

    return (
        <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                menu
            </Typography>
            <Stack direction="row" spacing={2} className='pb-3'>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <Button className='bg-blue-600 text-white' variant="contained" onClick={() => showFromMenu('add', id)}>
                        Add New
                    </Button>
                </motion.div>
            </Stack>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Nama</StyledTableCell>
                        <StyledTableCell>Link</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Icon</StyledTableCell>
                        <StyledTableCell>Active</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                    //@ts-ignore
                    (isNull(list_detail) == false) 
                    ? list_detail?.map((row: rowInterface, i: Key | null | undefined) => (
                        <RowMenu
                            key={i}
                            // id={row.id}
                            // name={row.name}
                            // link={row.link}
                            // active={row.active}
                            // list_function={row.list_function}
                            // @ts-ignore
                            row={row}
                        />
                    )) :
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} sx={{ textAlign: 'center' }}>Data Not Found</StyledTableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </Box>
    )
}

export default StructureMenu;