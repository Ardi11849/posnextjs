// components/Sidebar.js
'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";
import { Menus } from '@/global/menus';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@/lib/fontawesome';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Sidebar = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState({});
    const { data: session, status } = useSession({ required: true, onUnauthenticated() { push("/") } });

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut(); // Force sign in to hopefully resolve error
        }
    }, [session]);

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
                            <ListSubheader className='bg-transparent w-full' component="div" id="nested-list-subheader">
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
                            <List key={index2} className={pathname == row2.link ? 'bg-blue-300' : ''} component="div" disablePadding>
                                <Link href={row2.link}>
                                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                                        <ListItemButton className='w-full' component="button">
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    //@ts-ignore
                                                    icon={row2.icon}
                                                    size="xl"
                                                />
                                            </ListItemIcon>
                                            <ListItemText secondary={row2.nama} />
                                        </ListItemButton>
                                    </motion.div>
                                </Link>
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