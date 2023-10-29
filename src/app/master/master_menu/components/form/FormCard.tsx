import { Box, Button, Card, CardContent, Divider, Grid, InputLabel, TextField, Typography, styled } from "@mui/material"
import FormTable from "./FormTable"
import { useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconArrowBadgeLeft } from "@tabler/icons-react";

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

const FormCard = ({showTable, showFromFunction, showFromMenu}: any) => {
    const [dataDetail, setDataDetail] = useState([{}]);
    const [labelGroup, setLabelGroup] = useState('');
    const [namaMenu, setNamaMenu] = useState('');
    const [icon, setIcon] = useState('');
    const [linkModule, setLinkModule] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleAdToList = () => {
        setDataDetail((prevData) => [
            ...prevData,
            {
                label_group: labelGroup,
                nama_menu: namaMenu,
                icon: icon,
                link_module: linkModule,
                image_url: imageUrl
            }
        ])
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
                        <TextField
                            required
                            id="nama"
                            name="nama"
                            label="Label Group"
                            size="small"
                            multiline
                            fullWidth
                            value={labelGroup}
                            onChange={(e) => setLabelGroup(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider className='py-5' />
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
                            Icon
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                            Image URL
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            required
                            id="url"
                            name="url"
                            label="Image URL"
                            size="small"
                            multiline
                            fullWidth
                            value={imageUrl}
                            onChange={(e) => { setImageUrl(e.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} />
                    <Grid item xs={12} sm={5} />
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" onClick={handleAdToList}>
                            Add To List
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={5} />
                    <Grid className="w-full pt-5 rounded-lg">
                        {dataDetail.length > 1 ? <FormTable dataDetail={dataDetail.slice(1)} /> : null}
                    </Grid>
                </Grid>
                <button onClick={showTable} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                    <IconArrowBadgeLeft className="float-left mr-2" /> Back
                </button>
            </Box>
        </>
    )
}

export default FormCard