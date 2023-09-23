// components/Header.js
'use client'
import { IconSearch, IconList } from '@tabler/icons-react';
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Sidebar from './sideBar';
import { Card, CardContent, Grid, Typography, CardMedia } from '@mui/material';

const show = {
    opacity: 1,
    display: "block"
};

const hide = {
    opacity: 0,
    transitionEnd: {
        display: "none"
    }
};

interface HeaderProps {
    title: string; // Provide a type annotation here
    url: string;
}

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const Header = ({ title, url }: HeaderProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header className="bg-gray-50 py-5">
                <div className="pl-4 grid-cols-3 container-fluid mx-auto flex items-center">
                    <div className="text-black font-semibold text-xl pr-[5rem]"><img className="px-1 pt-1" width={150} src="https://shekinahland.com/wp-content/uploads/2022/01/logoipsum-logo-17-01.png" alt="ChitChat Logo" /></div>
                    <motion.button
                        className='rounded-lg'
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsVisible(!isVisible)}
                    ><IconList className="w-7 h-7" />
                    </motion.button>
                    <nav className="space-x-4 pl-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="py-2 pl-10 pr-4 text-black border rounded-full w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <IconSearch className="text-gray-500 absolute left-3 top-1/4" />
                        </div>
                    </nav>
                    <motion.nav
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        className="absolute top-5 right-[5rem] inline-block h-12 w-12"
                    >
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <img className='rounded-full ring-2 ring-white' src="https://image.gambarpng.id/pngs/gambar-transparent-boy-cartoon_65401.png" alt="" />
                        </motion.button>
                        <motion.div
                            className='bg-white w-36 absolute right-[0px]'
                            variants={{
                                open: {
                                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                                    transition: {
                                        type: "spring",
                                        bounce: 0,
                                        duration: 0.7,
                                        delayChildren: 0.3,
                                        staggerChildren: 0.05
                                    }
                                },
                                closed: {
                                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                                    transition: {
                                        type: "spring",
                                        bounce: 0,
                                        duration: 0.3
                                    }
                                }
                            }}
                            style={{ pointerEvents: isOpen ? "auto" : "none" }}
                        >
                            <Card className="rounded-lg" sx={{ display: 'flex' }}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                test
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                    <Grid item sx={{ paddingBottom: '10px' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ height: '200px' }}
                                            image='{row2.image}'
                                            alt="Live from space album cover" />
                                    </Grid>
                                </Grid>
                            </Card>
                        </motion.div>
                    </motion.nav>
                </div>
            </header>
            <motion.div className='float-left bg-gray-50 w-[17rem] px-6 text-white min-h-max min-h-full min-h-screen' animate={isVisible ? show : hide}> <Sidebar /> </motion.div>
        </>
    );
};

export default Header;