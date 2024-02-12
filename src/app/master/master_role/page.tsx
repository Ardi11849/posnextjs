'use client'
import { Suspense, useState } from 'react';
import Loading from '@/app/component/loading';
import './css/index.css';
import dynamic from 'next/dynamic';
import CardLayouts from '@/app/component/cardLayout';

const DynamicHeader = dynamic(() => import('@/app/component/menus/appBar'), {
    loading: () => <Loading />,
})

export default function HorizontalLinearStepper() {

    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <CardLayouts label='Master Role'>
                {/* <TableContainer className='overflow-x-scroll rounded-lg relative' component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    </Table>
                </TableContainer> */}
            </CardLayouts>
        </Suspense>
    )
}