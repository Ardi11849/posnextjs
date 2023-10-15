'use client';

import { isNull } from '@/global/config/config';
import { FontAwesomeIcon } from '@/lib/fontawesome';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select'
import { createMasterMenu, getMerchant, getMerchantById } from '../../middleware/Api';
import { motion } from 'framer-motion';
import { IconCircleX, IconDeviceFloppy } from '@tabler/icons-react';
import SnackBar from '@/app/component/snackBar';
interface modalProps {
    isOpen: any,
    close: any,
    action: string
}

const FormModalGroup = ({ isOpen, close, action }: modalProps) => {
    const selectRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        merchant_id: ''
    });
    const [merchant, setMerchant] = useState([{
        value: '',
        label: 'Pilih Merchant'
    }]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [panggil, setPanggil] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (isNull(session) == false && isOpen == true && panggil == true) {
            fetchMerchant('null')
            setPanggil(false);
        }
    }, [session])

    useEffect(() => {
        const delay = setTimeout(() => {
            setMerchant([{
                value: "",
                label: "Pilih Kabupaten"
            }])
            fetchMerchant('null')
        }, 1000);
        return () => clearTimeout(delay)
    }, [search]);

    let fetchMerchant = async (id: string) => {
        let response = [];
        if (id != 'null' && id != undefined) {
            // @ts-ignore
            response = await getMerchantById(session?.accessToken, id);
        } else {
            // @ts-ignore
            response = await getMerchant(session?.accessToken, 1, 100, search);
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

    const handleSave = async () => {
        // @ts-ignore
        const result = await createMasterMenu(session?.accessToken, formData);
        if (result.response.data.code < 200 && result.response.data.code >= 300) {
            setFormData({
                name: '',
                merchant_id: ''
            });
            setMerchant([{
                value: '',
                label: 'Pilih Merchant'
            }])
            close()
            setPanggil(true);
            setLoading(false);
        }else{
            alert(result.response.data.error[0].message);
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            merchant_id: ''
        });
        setMerchant([{
            value: '',
            label: 'Pilih Merchant'
        }])
        close()
        setPanggil(true);
        setLoading(false);
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300 ${isOpen ? 'show' : 'hide'}`}>
            <div className="bg-gray-300 text-black w-1/3 rounded-lg p-6 shadow-lg">
                <div className="grid">
                    <div className="col py-3">
                        <p className="font-bold">Tambah Data</p>
                        <hr />
                    </div>
                    <div className="col py-3">
                        <form>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Nama</span>
                                <input type="text" id='nama' name='nama' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Merchant</span>
                                <Select
                                    instanceId='3'
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={
                                        merchant.filter((option: { value: string; }) => option.value === formData.merchant_id)
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
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            //@ts-ignore
                                            merchant_id: e.value
                                        })
                                    }}
                                // onInputChange={(inputValue: SetStateAction<string>) => { setSearch(inputValue), setLoading(true) }}
                                />
                            </label>
                        </form>
                    </div>
                    <div className="col py-3">
                        {
                            action == 'add' ? (
                                <motion.div className='float-left' whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                                    <Button className='bg-blue-600 text-white' variant="contained" startIcon={<IconDeviceFloppy />} onClick={handleSave}>
                                        Save
                                    </Button>
                                </motion.div>
                            ) : action == 'update' ? (
                                <Button onClick={handleSave} className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                                    <FontAwesomeIcon className='w-4 h-4' icon='pen-to-square' />
                                    <span className="pl-2">Ubah</span>
                                </Button>
                            ) : (
                                <Button onClick={handleSave} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                                    <FontAwesomeIcon className='w-4 h-4' icon='trash' />
                                    <span className="pl-2">Hapus</span>
                                </Button>
                            )
                        }
                        <motion.div className='float-right' whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                            <Button color='inherit' onClick={handleClose} variant="contained" startIcon={<IconCircleX />} >
                                Cancle
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <SnackBar type='success' message='berhasil' />
        </div>
    )
}

export default FormModalGroup;