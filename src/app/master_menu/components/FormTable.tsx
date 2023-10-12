import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";

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

const FormTable = ({ dataDetail }: any) => {
    console.log(dataDetail.length);

    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu(!setOpenMenu);
    };
    interface interTable {
        row: { label_group: string; nama_menu: string; icon: string; link_module: string; image_url: string; }
        index: Key | null | undefined
    }
    return (
        <div className='rounded-lg'>
            <TableContainer className='pt-3 overflow-x-scroll rounded-lg relative' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='bg-white '>
                        <TableRow>
                            <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400'>
                                Label Group
                            </StyledTableCell>
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
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataDetail.map(({row, index}: interTable) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.label_group}
                                </StyledTableCell>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.nama_menu}
                                </StyledTableCell>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.icon}
                                </StyledTableCell>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.link_module}
                                </StyledTableCell>
                                <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                    {row.image_url}
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FormTable