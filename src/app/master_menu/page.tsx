'use client'
import { Suspense, useContext, useEffect, useState } from 'react';
import Loading from '../component/loading';
import dynamic from 'next/dynamic'
import CollapsibleTable from './components/table/collapsibelTable';
import CardLayouts from '../component/cardLayout';
import { Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FormModalGroup from './components/form/FormModalGroup';
import { setShowHide, store } from '@/global/redux/store';
import { apis } from '@/global/apis';
import { isNull } from '@/global/config/config';
import { useSession } from 'next-auth/react';

const DynamicHeader = dynamic(() => import('../component/menus/appBar'), {
    loading: () => <Loading />,
})

export default function HorizontalLinearStepper() {
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState('');
    const [rows, setRows] = useState([]);
    const [callData, setCallData] = useState(true);
    const { data: session, status } = useSession();
    
    const getData = async () => {
        //@ts-ignore
        const datas: any = { method: 'GET', url: '/master/menu/results', token: session?.accessToken };        
        const result = await apis(datas);
        setRows(result.data.data);
        setCallData(false);        
    }

    useEffect(() => {
        if (isNull(session) == false && callData) getData();
    },[session, callData]);
    
    const handleClickOpen = (action: string) => {
        setIsOpen(true);
        setAction(action);
        setShowHide(true);
    };

    const handleClickClose = () => {
        setIsOpen(false);
        setShowHide(false);
        setAction('');
        setCallData(true);
    }

    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <CardLayouts label='Master Menu'>
                <Stack direction="row" spacing={2} className='pb-3'>
                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                        <Button className='bg-blue-600 text-white' variant="contained" onClick={() => handleClickOpen('add')}>
                            Add New
                        </Button>
                    </motion.div>
                </Stack>
                <FormModalGroup isOpen={isOpen} close={handleClickClose} action={action} />
                <CollapsibleTable rows={rows} />
                {/* <FormCard /> */}
            </CardLayouts>
        </Suspense>
    )
}