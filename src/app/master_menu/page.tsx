'use client'
import { Fragment, ReactNode, Suspense, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Loading from '../component/loading';
import FormCard from './components/FormCard';
import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../component/menus/appBar'), {
  loading: () => <Loading />,
})


export default function HorizontalLinearStepper() {
    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <div className="px-4">
                <div className="rounded-lg bg-gray-200 overflow-y-auto h-[calc(100vh-6rem)]">
                    <div className="grid grid-cols-1 gap-5 px-4 py-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FormCard />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}