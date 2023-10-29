'use client'
import { Suspense } from 'react';
import Loading from '@/app/component/loading';
import dynamic from 'next/dynamic'
import CardLayouts from '@/app/component/cardLayout';
import { useSession } from 'next-auth/react';
import TableMasterCustomer from './tables/table';

const DynamicHeader = dynamic(() => import('@/app/component/menus/appBar'), {
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