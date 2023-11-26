'use client'
import { Suspense, useEffect, useRef, useState } from 'react';
import Loading from '@/app/component/loading';
import dynamic from 'next/dynamic'
import StructureGroup from './components/table/stuctureGroup';
import CardLayouts from '@/app/component/cardLayout';
import { Grid, InputLabel } from '@mui/material';
import FormModalGroup from './components/form/FormModalGroup';
import { setShowHide } from '@/global/redux/store';
import { CreateFormMenu, UpdateFormMenu } from './components/form/FormCard';
import Select from 'react-select';
import { getMerchant, getMerchantById } from '@/app/master/master_merchant/middleware/apis';

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
    const [refresh, setRefresh] = useState(false);
    const [merchantId, setMerchantId] = useState('');
    const [groupId, setGroupId] = useState<string | null | undefined>();
    const [menuId, setMenuId] = useState<string | null | undefined>();
    const [functionId, setFunctionId] = useState<string | null | undefined>();
    const [merchant, setMerchant] = useState([{
        value: '',
        label: 'Pilih Merchant'
    }]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setMerchant([{
                value: "",
                label: "Pilih Merchant"
            }])
            fetchMerchant('null')
        }, 3000);
        return () => clearTimeout(delay)
    }, [search]);

    let fetchMerchant = async (id: string) => {
        let response = [];
        if (id != 'null' && id != undefined) {
            const datas = {
                merchantId: id
            }
            response = await getMerchantById(datas);
        } else {
            const datas = {
                page: 1,
                perPage: 100,
                search: search,
                id: null,
                sort: null
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
        setPanggil(false);
    };

    const handleClickOpen = (action: string, groupId: string | null | undefined) => {
        setIsOpen(true);
        setAction(action);
        setShowHide(true);
        setMenuId(null);
        setGroupId(groupId);
    };

    const handleClickClose = () => {
        setIsOpen(false);
        setShowHide(false);
        setAction('');
        setPanggil(false);
        setRefresh(!refresh);
    }

    const showTable = () => {
        setShowHideTable(true);
        setShowHideFormMenu(false);
        setShowHideFormFunction(false);
    }

    const showFormMenu = (action: string, groupId: string | null | undefined, menuId: string | null | undefined) => {
        console.log(menuId);
        
        setShowHideTable(false);
        setShowHideFormMenu(true);
        setShowHideFormFunction(false);
        setAction(action);
        setMenuId(menuId);
        setGroupId(groupId);
    }

    const showFormFunction = () => {
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
                        merchantId={merchantId}
                        groupId={groupId}
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
                                        merchant.filter((option: { value: string; }) => option.value === merchantId)
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
                                        setMerchantId(e.value)
                                    }}
                                    onInputChange={(inputValue) => { setSearch(inputValue), setLoading(true) }}
                                />
                            </Grid>
                        </Grid>
                        {merchantId != '' ?
                            <StructureGroup refresh={refresh} merchantId={merchantId} handleClickOpen={handleClickOpen} showTable={showTable} showFormMenu={showFormMenu} showFormFunction={showFormFunction} />
                            : <div className='text-center text-red-500 font-bold text-lg py-5'>Select Merchant First</div>
                        }
                    </CardLayouts>
                </>
                : ''
            }
            {showHideFormMenu &&
                (action == 'create') ?
                <CardLayouts label='Add Menu'>
                    <CreateFormMenu showTable={showTable} groupId={groupId} action={action} merchantId={merchantId} />
                </CardLayouts>
                : showHideFormMenu && (action == 'update') ?
                <CardLayouts label='Update Menu'>
                    <UpdateFormMenu menuId={menuId} showTable={showTable} groupId={groupId} action={action} merchantId={merchantId} />
                </CardLayouts>
                : ''
            }
        </Suspense>
    )
}