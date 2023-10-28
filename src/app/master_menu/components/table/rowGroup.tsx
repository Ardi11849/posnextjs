import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, Divider, Grid, IconButton, Menu, MenuItem, Table, TableBody, TableHead, Typography } from "@mui/material";
import { useState } from "react";
import RowMenu from "./rowMenu";
import MoreVert from "@mui/icons-material/MoreVert";
import { IconArrowAutofitUp, IconArrowBarBoth, IconArrowBarDown, IconArrowBigDownFilled, IconArrowBigRight, IconArrowBigUpFilled, IconPencil, IconTrash } from "@tabler/icons-react";
import { IconArrowBarUp } from "@tabler/icons-react";


interface InterfaceRow {
    row: {
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
    const [openAction, setOpenAction] = useState(false);

    const handleClick = (event: { currentTarget: any; }) => {
        setOpenAction(!openAction);
    };

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
                <StyledTableCell width="10%">
                    <div className="relative inline-block text-left">
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={openAction ? 'long-menu' : undefined}
                                aria-expanded={openAction ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                {openAction ? <IconArrowBigUpFilled /> : <IconArrowBigDownFilled />}
                            </IconButton>
                        </div>
                    </div>
                </StyledTableCell>
            </StyledTableRow >
            {openAction && (
                <div
                    className={`absolute float-right z-10 focus:outline-none right-8 w-56 mt-2 origin-top-right "${openAction ? "rounded-md bg-white ring-opacity-5 shadow-lg ring-1 ring-black transition ease-in duration-75 transform opacity-100 scale-100" : "transition ease-out duration-100 transform opacity-0 scale-95"}"`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm align-middle" role="menuitem" tabIndex={-1} id="menu-item-0"><IconPencil className="float-left mr-2" /> Update</a>
                        <Divider />
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1"><IconTrash className="float-left mr-2" /> Delete</a>
                    </div>
                </div>
            )}
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <RowMenu menu={row.menu} />
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}

export default RowGroup;