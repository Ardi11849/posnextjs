import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { CardMedia, Collapse, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import StrucureFunction from "./structureFunction";
import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconPencil, IconTrash } from "@tabler/icons-react";
import { isNull } from "@/global/config/config";

interface InterfaceRow {
    row: {
        id: string;
        name: string;
        image: string;
        icon: string;
        link: string;
        active: boolean;
        list_function: {
            id: string;
            name: string;
            link: string;
            active: boolean;
        }[];
    };
};

function RowGroup({ row }: InterfaceRow) {
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);

    const handleClick = (event: { currentTarget: any; }) => {
        setOpenAction(!openAction);
    };

    const handleClickUpdate = (event: { currentTarget: any; }) => {
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
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.link}</StyledTableCell>
                <StyledTableCell>
                    {isNull(row.image) == false ?
                        <CardMedia
                            component="img"
                            sx={{ height: '50px', width: '50px' }}
                            image={row.image}
                            alt="Live from space album cover" />
                        : 'Image Has Not Set'
                    }
                </StyledTableCell>
                <StyledTableCell>
                    {isNull(row.icon) == false ?
                        <CardMedia
                            component="img"
                            sx={{ height: '50px', width: '50px' }}
                            image={row.image}
                            alt="Live from space album cover" />
                        : 'Icon Has Not Set'
                    }
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
                    {openAction && (
                        <div
                            className={`absolute float-right z-10 focus:outline-none right-8 w-56 mt-2 origin-top-right "${openAction ? "rounded-md bg-white ring-opacity-5 shadow-lg ring-1 ring-black transition ease-in duration-75 transform opacity-100 scale-100" : "transition ease-out duration-100 transform opacity-0 scale-95"}"`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex={-1}
                        >
                            <div className="py-1" role="none">
                                <button className="text-gray-700 w-full text-left block px-4 py-2 text-sm align-middle" role="menuitem" tabIndex={-1} id="menu-item-0"><IconPencil className="float-left mr-2" /> Update</button>
                                <Divider />
                                <button className="text-gray-700 w-full text-left block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1"><IconTrash className="float-left mr-2" /> Delete</button>
                            </div>
                        </div>
                    )}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <StrucureFunction
                            // @ts-ignore
                            list_function={row.list_function}
                        />
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}

export default RowGroup;