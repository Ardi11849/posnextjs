"use client";

import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

const CardLayouts = ({ children, label }: { children: React.ReactNode, label: string }) => {
    return (
        <div className="px-4">
            <div className="rounded-lg bg-gray-200 min-h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 gap-5 px-4 py-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="rounded-lg">
                            <Grid>
                                <Grid item>
                                    <CardContent className='rounded-lg overflow-y-auto min-h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)]'>
                                        <Typography className="font-bold pb-3" variant="h6" component="div">
                                            {label}
                                        </Typography>
                                        <Divider className='py-1' />
                                        <Box sx={{ paddingTop: 3 }}>
                                            {children}
                                        </Box>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default CardLayouts;