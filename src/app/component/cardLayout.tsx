"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

const CardLayouts = ({ children, label }: { children: React.ReactNode, label: string }) => {
    return (
        <div className="px-4">
            <div className="rounded-lg bg-gray-200 h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 gap-5 px-4 py-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="rounded-lg">
                            <Grid>
                                <Grid item>
                                    <CardContent className='rounded-lg'>
                                        <Typography className="font-bold pb-3" variant="h6" component="div">
                                            {label}
                                        </Typography>
                                        {children}
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default CardLayouts;