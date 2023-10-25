'use client'
import { Suspense } from 'react';
import Loading from '../component/loading';
import dynamic from 'next/dynamic'
import CardLayouts from '../component/cardLayout';
import TableMasterMerchant from './tables/table';

const DynamicHeader = dynamic(() => import('../component/menus/appBar'), {
    loading: () => <Loading />,
})

export default function Master_merchant() {


    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <CardLayouts label='Master Customer'>
                <TableMasterMerchant />
                {/* <FormCard /> */}
            </CardLayouts>
        </Suspense>
    )
}