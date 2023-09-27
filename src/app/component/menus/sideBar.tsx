// components/Sidebar.js
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";
import { usePathname } from 'next/navigation';
import { useAnimate, stagger, motion, color } from "framer-motion";
import { Menus } from '../../../global/menus';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@/lib/fontawesome';
import { getTokenFromLocalStorage, storeTokenInLocalStorage } from "@/global/apis"

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean, from: string) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul" + from,
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li" + from,
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [from, setFrom] = useState('');
    const scope = useMenuAnimation(isOpen, from);
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
        <nav className="menu" ref={scope}>
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
            <ul>
                <motion.button
                    className='flex nav-item rounded text-slate-400'
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIsOpen(!isOpen), setFrom('.logout') }}
                    key={Math.random()}
                >
                    <p className="text-sm font-bold float-left px-1 py-1">logout</p>
                </motion.button>
                <li className={`flex nav-item rounded hover:bg-blue-500 focus:ring-blue-300`}>
                    <button onClick={logout}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='right-from-bracket' />
                        </div>
                        <p className="text-l text-black font-bold float-left px-3 py-3">Logout</p>
                    </button>
                </li>
            </ul>
        </nav >
    );
};

export default Sidebar;