'use client'
import { Suspense } from 'react';
import Loading from '../component/loading';
import dynamic from 'next/dynamic'
import CardLayouts from '../component/cardLayout';
import { useSession } from 'next-auth/react';
import TableMasterCustomer from './tables/table';

const DynamicHeader = dynamic(() => import('../component/menus/appBar'), {
    loading: () => <Loading />,
})

export default function Master_customer() {
    const { data: session, status } = useSession();

    console.log('session', session)

    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <CardLayouts label='Master Customer'>
                <TableMasterCustomer />
                {/* <FormCard /> */}
            </CardLayouts>
        </Suspense>
    )
}