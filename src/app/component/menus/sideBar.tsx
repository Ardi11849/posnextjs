// components/Sidebar.js
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";
import { usePathname } from 'next/navigation';
import { Menus } from '../../../global/menus';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@/lib/fontawesome';
import { getTokenFromLocalStorage, storeTokenInLocalStorage } from "@/global/apis"

const Sidebar = () => {
    const router = useRouter()

    const { push } = useRouter();
    const [open, setOpen] = useState({});
    useMemo(() => {
        let datasOpen = {}
        Menus.map((row, index) => {
            Object.assign(datasOpen, { [row.id]: true })
        })
        setOpen(datasOpen)
    }, [])

    const handleClick = (id: string | number) => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            // @ts-ignore
            [id]: !open[id]
        }));
    };

    const redirectIfAuthenticated = async () => {
        const isUserAuthenticated = await getTokenFromLocalStorage();
        if (isUserAuthenticated == null || isUserAuthenticated == 'null' || isUserAuthenticated == undefined) {
            push('/');
        }
    };

    useEffect(() => {
        redirectIfAuthenticated();
    }, []);

    const logout = async () => {
        storeTokenInLocalStorage('null');
        router.replace('/');
    }

    const path = usePathname();
    return (
        <nav className="menu">
            {Menus.map((row, index) => (
                <div key={index}>
                    <List disablePadding
                        sx={{ width: '100%', color: 'black', cursor: 'pointer', bgcolor: 'transparent' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        onClick={() => handleClick(row.id)}
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {row.labelGroup}
                                {
                                    // @ts-ignore
                                    open[row.id] ? <ExpandLess /> : <ExpandMore />
                                }
                            </ListSubheader>
                        }
                    >
                    </List>
                    <Collapse
                        in={
                            // @ts-ignore
                            open[row.id]
                        }
                        timeout="auto"
                        unmountOnExit
                    >
                        {row.list.map((row2, index2) => (
                            <List key={index2} component="div" disablePadding>
                                <ListItemButton component="a" href={row2.link}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon
                                            //@ts-ignore
                                            icon={row2.icon}
                                            size="xl"
                                        />
                                    </ListItemIcon>
                                    <ListItemText secondary={row2.nama} />
                                </ListItemButton>
                            </List>
                        ))}
                    </Collapse>
                    <Divider />
                    <hr />
                </div>
            ))
            }
        </nav >
    );
};

export default Sidebar;