'use client'
import { useCallback, useEffect, useState } from 'react';
import AppBar from "../component/menus/appBar";
import { motion } from "framer-motion";
import { Card, CardContent, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Menus } from "../../../global/menus";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const [code, setCode] = useState('');

    const router = useRouter();
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        console.log("Key pressed:", event.key);
        setCode(event.key)
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        const delay = setTimeout(() => {
            console.log(code);
            
            if (code == 'p') {
                router.replace('/penjualan');
            }
        }, 1000);
        setTimeout(() => {
            setCode('')
        }, 5000)
        return () => clearTimeout(delay)
    }, [code])

    return (
        <PerfectScrollbar>
            <AppBar title="Dashboard" url="#" />
            <div className="px-4">
                <div className="bg-gray-200 rounded-lg min-h-screen">
                    {Menus.map((row, index) => (
                        <div key={index}>
                            <div className="px-4 py-4 text-2xl grid gap-4 font-mono font-bold underline">{row.labelGroup}</div>
                            <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-3 sm:grid-cols-2 px-4 py-4">
                                {row.list.map((row2, index2) => (
                                    <motion.div
                                        key={index2}
                                        className="hover:cursor-pointer"
                                        id={row2.id.toString()}
                                        whileHover={{ scale: 0.9 }}
                                        whileTap={{ scale: 1.1 }}
                                    >
                                        <Card key={index2} className="rounded-lg" sx={{ display: 'flex' }}>
                                            <Grid key={index2} container direction="column">
                                                <Grid item>
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {row2.nama}
                                                        </Typography>
                                                    </CardContent>
                                                </Grid>
                                                <Grid item sx={{ paddingBottom: '10px' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ height: '200px' }}
                                                        image={row2.image}
                                                        alt="Live from space album cover" />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PerfectScrollbar>
    )
}

export default Dashboard;