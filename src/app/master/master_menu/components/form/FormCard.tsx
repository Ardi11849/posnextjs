import { Box, Button, Card, CardContent, Divider, Grid, InputLabel, TextField, Typography, styled } from "@mui/material"
import FormTable from "./FormTable"
import { useEffect, useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconArrowBadgeLeft } from "@tabler/icons-react";
import { getMasterMenu } from "../../middleware/apis";
import { toBase64 } from "@/global/config/config";
import { IconDeviceFloppy } from "@tabler/icons-react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FormCard = ({ uuid, action, showTable, showFromFunction, showFromMenu, merchant_id }: any) => {
    const [dataDetail, setDataDetail] = useState([{}]);
    const [labelGroup, setLabelGroup] = useState('');
    const [namaMenu, setNamaMenu] = useState('');
    const [icon, setIcon] = useState('');
    const [linkModule, setLinkModule] = useState('');
    const [image, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [openList, setOpenList] = useState(false);

    useEffect(() => {
        getMenu();
    }, [action]);

    const getMenu = async () => {
        const result = await getMasterMenu({
            merchant_id: merchant_id,
            id: uuid,
            search: '',
            page: '1',
            perPage: '10',
            sort: ''
        })

        if (result.data.code >= 200 && result.data.code < 300) {
            setLabelGroup(result.data.data[0].name);
        }
    }

    // This function will be triggered when the file field change
    const imageChange = async (e: any, from: string) => {
        if (e.target.files && e.target.files.length > 0) {
            const base64: any = await toBase64(e.target.files[0]);
            if (from === 'image') {
                setImage(base64);
                setSelectedImage(e.target.files[0]);
            } else if (from === 'icon') {
                setIcon(base64);
                setSelectedIcon(e.target.files[0]);
            }
        }
    };

    const handleAdToList = () => {
        if (namaMenu !== '' && icon !== '' && linkModule !== '' && image !== '') {
            setDataDetail((prevData) => [
                ...prevData,
                {
                    nama_menu: namaMenu,
                    icon: icon,
                    selectedIcon: selectedIcon,
                    link_module: linkModule,
                    image: image,
                    selectedImage: selectedImage
                }
            ]);
            setOpenList(true);
            setNamaMenu('');
            setIcon('');
            setLinkModule('');
            setImage('');
            setSelectedIcon(null);
            setSelectedImage(null);
        }
    }

    const removeImage = () => {
        setImage('');
        setSelectedImage(null);
    }

    const removeIcon = () => {
        setIcon('');
        setSelectedIcon(null);
    }

    const deleteData = (index: number) => {
        setDataDetail((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    }
    return (
        <>
            <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                fontWeight: 700
                            }}
                        >
                            Label Group
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography gutterBottom sx={{ paddingBottom: 5 }}>
                            {labelGroup}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box sx={{ padding: 5 }}>
                <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                    List
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                fontWeight: 700
                            }}
                        >
                            Nama Menu
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            required
                            id="nama"
                            name="nama"
                            label="Nama Menu"
                            size="small"
                            multiline
                            value={namaMenu}
                            onChange={(e) => { setNamaMenu(e.target.value) }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                fontWeight: 700
                            }}
                        >
                            Link Module
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            required
                            id="author"
                            name="author"
                            label="Link Module"
                            multiline
                            fullWidth
                            size="small"
                            autoComplete="off"
                            value={linkModule}
                            onChange={(e) => { setLinkModule(e.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                fontWeight: 700
                            }}
                        >
                            Icon
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput onChange={(e) => imageChange(e, 'icon')} id="icon" name="icon" accept="image/*" type="file" />
                        </Button>

                        {selectedIcon && (
                            <div className="thumb pt-3">
                                <img
                                    src={URL.createObjectURL(selectedIcon)}
                                    alt="Thumb"
                                />
                                <button onClick={removeIcon}>
                                    Remove This Icon
                                </button>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                fontWeight: 700
                            }}
                        >
                            Image
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput onChange={(e) => imageChange(e, 'image')} id="icon" name="icon" accept="image/*" type="file" />
                        </Button>

                        {selectedImage && (
                            <div className="thumb pt-3">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Thumb"
                                />
                                <button onClick={removeImage}>
                                    Remove This Image
                                </button>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" onClick={handleAdToList}>
                            Add To List
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} />
                    <Grid className="w-full pt-5 rounded-lg">
                        <FormTable deleteData={deleteData} dataDetail={dataDetail.slice(1)} />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <button onClick={showTable} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                            <IconArrowBadgeLeft className="float-left mr-2" /> Back
                        </button>
                    </Grid>
                    <Grid item xs={12} sm={7} >
                        <button onClick={showTable} disabled={dataDetail.length < 2 ? true : false} className="disabled:opacity-75 disabled:cursor-no-drop bg-blue-500 hover:bg-blue-700 text-white float-right font-bold py-2 px-4 rounded-full">
                            <IconDeviceFloppy className="float-left mr-2" /> Simpan
                        </button>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default FormCard