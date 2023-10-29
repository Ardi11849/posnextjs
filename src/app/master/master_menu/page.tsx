'use client'
import { Suspense, useEffect, useRef, useState } from 'react';
import Loading from '@/app/component/loading';
import dynamic from 'next/dynamic'
import StructureGroup from './components/table/stuctureGroup';
import CardLayouts from '@/app/component/cardLayout';
import { Button, Grid, InputLabel, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FormModalGroup from './components/form/FormModalGroup';
import { setShowHide, store } from '@/global/redux/store';
import FormCard from './components/form/FormCard';
import Select from 'react-select';
import { getMerchant, getMerchantById } from '@/app/master/master_merchant/middleware/apis';
import { isNull } from '@/global/config/config';
import { useSession } from 'next-auth/react';

const DynamicHeader = dynamic(() => import('@/app/component/menus/appBar'), {
    loading: () => <Loading />,
})

export default function PageMasterMenu() {
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState('');
    const [showHideTable, setShowHideTable] = useState(true);
    const [showHideFormMenu, setShowHideFormMenu] = useState(false);
    const [showHideFormFunction, setShowHideFormFunction] = useState(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [panggil, setPanggil] = useState(true);
    const [merchant_id, setMerchant_id] = useState('');
    const { data: session, status } = useSession();
    const [merchant, setMerchant] = useState([{
        value: '',
        label: 'Pilih Merchant'
    }]);

    useEffect(() => {
        if (isNull(session) == false && panggil == true) {
            fetchMerchant('null')
            setPanggil(false);
        }
    }, [session])

    useEffect(() => {
        const delay = setTimeout(() => {
            setMerchant([{
                value: "",
                label: "Pilih Merchant"
            }])
            fetchMerchant('null')
        }, 1000);
        return () => clearTimeout(delay)
    }, [search]);

    let fetchMerchant = async (id: string) => {
        let response = [];
        if (id != 'null' && id != undefined) {
            const datas = {
                //@ts-ignore
                token: session?.accessToken,
                merchant_id: id
            }
            response = await getMerchantById(datas);
        } else {
            const datas = {
                //@ts-ignore
                token: session?.accessToken,
                sort: null,
                page: 1,
                perPage: 100,
                search: search,
                id: null
            }
            response = await getMerchant(datas);
        }

        if (response.status >= 200 && response.status <= 299) {
            const json = response.data.data;
            if (Array.isArray(json)) {
                json.map((object: any) => {
                    setMerchant((data) => [
                        ...data,
                        {
                            value: object.id,
                            label: object.name
                        }
                    ])
                });
            } else {
                setMerchant((data) => [
                    ...data,
                    {
                        value: json.id,
                        label: json.name
                    }
                ])
            }
        } else {
            setMerchant([{
                value: "",
                label: "Pilih Merchant"
            }])
        }

        setLoading(false);
    };

    const handleClickOpen = (action: string) => {
        setIsOpen(true);
        setAction(action);
        setShowHide(true);
    };

    const handleClickClose = () => {
        setIsOpen(false);
        setShowHide(false);
        setAction('');
        setPanggil(false);
    }

    const showTable = () => {
        setShowHideTable(true);
        setShowHideFormMenu(false);
        setShowHideFormFunction(false);
    }

    const showFromMenu = () => {
        setShowHideTable(false);
        setShowHideFormMenu(true);
        setShowHideFormFunction(false);
    }

    const showFromFunction = () => {
        setShowHideTable(false);
        setShowHideFormMenu(false);
        setShowHideFormFunction(true);
    }


    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            {showHideTable ?
                <>
                    <FormModalGroup
                        isOpen={isOpen}
                        close={handleClickClose}
                        action={action}
                        merchant_id={merchant_id}
                        /** @ts-ignore */
                        accessToken={session?.accessToken}
                    />
                    <CardLayouts label='Master Menu'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "left",
                                        fontWeight: 700
                                    }}
                                >
                                    Merchant
                                </InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Select
                                    instanceId='3'
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={
                                        merchant.filter((option: { value: string; }) => option.value === merchant_id)
                                    }
                                    ref={selectRef}
                                    defaultValue={merchant[0]}
                                    isDisabled={false}
                                    isLoading={loading}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={merchant}
                                    onChange={(e: any) => {
                                        setMerchant_id(e.value)
                                    }}
                                // onInputChange={(inputValue: SetStateAction<string>) => { setSearch(inputValue), setLoading(true) }}
                                />
                            </Grid>
                        </Grid>
                        {merchant_id != '' ?
                            <>
                                <Stack direction="row" spacing={2} className='pb-3'>
                                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                                        <Button className='bg-blue-600 text-white' variant="contained" onClick={() => handleClickOpen('add')}>
                                            Add New
                                        </Button>
                                    </motion.div>
                                </Stack>
                                <StructureGroup showTable={showTable} showFromMenu={showFromMenu} showFromFunction={showFromFunction} merchant_id={merchant_id} />
                            </>
                            : <div className='text-center text-red-500 font-bold text-lg py-5'>Select Merchant First</div>
                        }
                    </CardLayouts>
                </>
                : ''
            }
            {showHideFormMenu &&
                <CardLayouts label='Add Menu'>
                    <FormCard showTable={showTable} showFromMenu={showFromMenu} showFromFunction={showFromFunction} />
                </CardLayouts>
            }
        </Suspense>
    )
}