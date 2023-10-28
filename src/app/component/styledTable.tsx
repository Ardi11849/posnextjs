import { TableCell, TableRow, styled, tableCellClasses, TablePagination } from "@mui/material";


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bdbdbd',
        color: theme.palette.common.black,
        padding: 5,
        borderColor: 'black'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5,
        borderColor: 'black'
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    },
}));


export const StyledTablePaginataion = styled(TablePagination)(({ theme }) => ({
    [`&.${tableCellClasses.footer}`]: {
        backgroundColor: '#bdbdbd',
        color: theme.palette.common.black,
        padding: 0,
        minHeight: 0,
        text: 'center',
        borderColor: 'black',
        fontFamily: 'monospace',
    },
}))