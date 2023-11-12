import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Key, useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bdbdbd',
        color: theme.palette.common.black,
        padding: 5,
        text: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5,
        text: 'center'
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

const FormTable = ({ dataDetail, deleteData }: any) => {
    return (
        <div className='rounded-lg'>
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
                                Image
                            </StyledTableCell>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataDetail.length === 0 ? (
                                <StyledTableRow>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        Tidak Ada Data
                                    </StyledTableCell>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        Tidak Ada Data
                                    </StyledTableCell>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        Tidak Ada Data
                                    </StyledTableCell>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        Tidak Ada Data
                                    </StyledTableCell>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        Tidak Ada Data
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) :
                                dataDetail.map((Data: any, index: any) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                            {Data.nama_menu}
                                        </StyledTableCell>
                                        <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                            <img
                                                src={URL.createObjectURL(Data.selectedIcon)}
                                                alt="Thumb"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                            {Data.link_module}
                                        </StyledTableCell>
                                        <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                            <img
                                                src={URL.createObjectURL(Data.selectedImage)}
                                                alt="Thumb"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-haspopup="true"
                                                onClick={deleteData}
                                            >
                                                <IconTrash />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FormTable