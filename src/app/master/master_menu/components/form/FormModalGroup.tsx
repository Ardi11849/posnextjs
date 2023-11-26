'use client';

import { FontAwesomeIcon } from '@/lib/fontawesome';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { createMasterMenu, deleteMasterMenu, getMasterMenu, updateMasterMenu } from '../../middleware/apis';
import { motion } from 'framer-motion';
import { IconCircleX, IconDeviceFloppy, IconPencil, IconTrash } from '@tabler/icons-react';
import SnackBar from '@/app/component/snackBar';
interface modalProps {
    isOpen: any;
    close: any;
    action: string;
    merchantId: string;
    groupId: string | null | undefined;
}

const FormModalGroup = ({ isOpen, close, action, merchantId, groupId }: modalProps) => {
    const [formData, setFormData] = useState({
        id: groupId,
        name: '',
        active: true,
        merchant_id: merchantId
    });

    useEffect(() => {
        if (action == 'update' || action == 'delete') {
            getMenu()
        }
    }, [action]);

    const getMenu = async () => {
        const result = await getMasterMenu({
            merchant_id: merchantId,
            id: groupId,
            search: '',
            page: '1',
            perPage: '10',
            sort: ''
        })

        if (result.data.code >= 200 && result.data.code < 300) {
            setFormData({
                id: groupId,
                name: result.data.data[0].name,
                active: result.data.data[0].active,
                merchant_id: merchantId
            });
        }
    }

    const handleSave = async () => {
        let result = {
            data: {
                code: 0,
                error: {
                    message: ''
                }
            },
            response: {
                data: {
                    message: ''
                }
            }
        };
        console.log(formData);
        
        if (action == 'add') {
            result = await createMasterMenu(formData);
        } else if (action == 'update') {
            result = await updateMasterMenu(formData);
        } else {
            result = await deleteMasterMenu(formData);
        }

        if (result.data.code >= 200 && result.data.code < 300) {
            setFormData({
                id: groupId,
                name: '',
                active: true,
                merchant_id: merchantId
            });
            close()
        } else {
            if (Array.isArray(result.data.error)) {
                alert(result.data.error[0].message);
            } else {
                alert(result.data.error.message);
            }
        }
    }

    const handleClose = () => {
        setFormData({
            id: groupId,
            name: '',
            active: true,
            merchant_id: merchantId
        });
        close()
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300 ${isOpen ? 'show' : 'hide'}`}>
            <div className="bg-gray-300 text-black w-1/3 rounded-lg p-6 shadow-lg">
                <div className="grid">
                    <div className="col py-3">
                        <p className="font-bold">{action == 'add' ? 'Add New Group' : action == 'update' ? 'Update Group' : 'Delete Group'}</p>
                        <hr />
                    </div>
                    <div className="col py-3">
                        <form>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Nama</span>
                                {action == 'update' || action == 'delete' ? (
                                    <input type="hidden" name="id" value={groupId ? groupId : ''} />
                                ) : ''}
                                {
                                    action == 'delete' ? (
                                        <p className="font-bold pt-3">{formData.name}</p>
                                    )
                                        :
                                        <input type="text" id='nama' name='nama' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                                }
                            </label>
                            {action != 'delete' ? (
                                <label className="block pt-5">
                                    <span className="block text-sm font-medium text-slate-700">Status Aktif</span>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel onClick={() => setFormData({ ...formData, active: true })} control={<Radio />} label="Aktif" checked={formData.active === true} />
                                        <FormControlLabel onClick={() => setFormData({ ...formData, active: false })} control={<Radio />} label="Tidak Aktif" checked={formData.active === false} />
                                    </RadioGroup>
                                </label>
                            ) : ''}
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
                                <motion.div className='float-left' whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                                    <Button className='bg-yellow-400 text-white' variant="contained" startIcon={<IconPencil />} onClick={handleSave}>
                                        Ubah
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div className='float-left' whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                                    <Button className='bg-red-400 text-white' variant="contained" startIcon={<IconTrash />} onClick={handleSave}>
                                        Hapus
                                    </Button>
                                </motion.div>
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