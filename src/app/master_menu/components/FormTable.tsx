import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bdbdbd',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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

const FormTable = (data: object) => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu(!setOpenMenu);
    };
    return (
        <div className=''>
            <TableContainer className='pt-3 overflow-x-scroll rounded-lg relative' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='bg-white '>
                        <TableRow>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Nama Menu
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Icon
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Link Module
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Image Url
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Function
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={openMenu ? 'long-menu' : undefined}
                                    aria-expanded={openMenu ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                Test
                            </StyledTableCell>
                            <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={openMenu ? 'long-menu' : undefined}
                                    aria-expanded={openMenu ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FormTable