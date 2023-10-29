import { StyledTableCell, StyledTableRow } from "@/app/component/styledTable";
import { Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconPencil, IconTrash } from "@tabler/icons-react";

interface InterfaceRow {
    row: {
        id: string;
        name: string;
        link: string;
        active: boolean;
    };
};

function RowFunction({ row }: InterfaceRow) {
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
            <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <StyledTableCell>{row.link}</StyledTableCell>
                <StyledTableCell>
                    {(row.active) ? 'Active' : 'Not Active'}
                </StyledTableCell>
                <StyledTableCell>
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
                            className={`absolute float-right z-10 focus:outline-none w-56 mt-2 origin-top-right "${openAction ? "rounded-md bg-white ring-opacity-5 shadow-lg ring-1 ring-black transition ease-in duration-75 transform opacity-100 scale-100" : "transition ease-out duration-100 transform opacity-0 scale-95"}"`}
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
        </>
    );
}

export default RowFunction;