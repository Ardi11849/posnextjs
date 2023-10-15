import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";


export const StyledTableCell = styled(TableCell)(({ theme }) => ({

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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));