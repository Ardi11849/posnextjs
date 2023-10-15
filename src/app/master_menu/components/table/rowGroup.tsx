import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, IconButton, Table, TableBody, TableHead, Typography } from "@mui/material";
import { useState } from "react";


interface InterfaceRow {
    row : {
        name: string; 
        merchant_name: string; 
        active: boolean; 
        menu: { 
            date: string; 
            customerId: string; 
            amount: string; 
        }[]; 
    }
};

function RowGroup({ row }: InterfaceRow) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledTableRow>
                <StyledTableCell className='w-1/12'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                    {row.name}
                </StyledTableCell>
                <StyledTableCell>
                    {row.merchant_name}
                </StyledTableCell>
                <StyledTableCell>
                    {(row.active) ? 'Active' : 'Not Active'}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                menu
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Customer</StyledTableCell>
                                        <StyledTableCell align="right">Amount</StyledTableCell>
                                        <StyledTableCell align="right">Total price ($)</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {row.menu.map((menuRow) => (
                                        <StyledTableRow key={menuRow.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {menuRow.date}
                                            </StyledTableCell>
                                            <StyledTableCell>{menuRow.customerId}</StyledTableCell>
                                            <StyledTableCell align="right">{menuRow.amount}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {menuRow.amount}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}

export default RowGroup;