'use client';

import { FontAwesomeIcon } from '@/lib/fontawesome';
import { Button } from '@mui/material';
import { useState } from 'react';
import { createMasterMenu } from '../../middleware/apis';
import { motion } from 'framer-motion';
import { IconCircleX, IconDeviceFloppy } from '@tabler/icons-react';
import SnackBar from '@/app/component/snackBar';
interface modalProps {
    isOpen: any;
    close: any;
    action: string;
    merchant_id: string;
    accessToken: string;
}

const FormModalGroup = ({ isOpen, close, action, merchant_id, accessToken }: modalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        merchant_id: merchant_id
    });

    const handleSave = async () => {
        // @ts-ignore
        const result = await createMasterMenu(accessToken, formData);
        console.log(result);
        
        if (result.data.code < 200 && result.data.code >= 300) {
            setFormData({
                name: '',
                merchant_id: merchant_id
            });
            close()
        }else{
            alert(result.response.data.message);
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            merchant_id: merchant_id
        });
        close()
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