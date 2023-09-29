import { Box, Button, Card, CardContent, Divider, Grid, InputLabel, TextField, Typography } from "@mui/material"
import FormTable from "./FormTable"

const FormCard = () => {
    return (
        <>
            <Card className="rounded-lg">
                <CardContent className='rounded-lg overflow-y-auto'>
                    <Box sx={{ padding: 5 }}>
                        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                            Tambah Menu
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
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
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
            <Divider className='py-5' />
            <Card className='rounded-lg'>
                <CardContent className='rounded-lg'>
                    <Box sx={{ padding: 5 }}>
                        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                            List
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
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
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700
                                    }}
                                >
                                    Icon
                                </InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="author"
                                    name="author"
                                    label="Icon"
                                    multiline
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700
                                    }}
                                >
                                    Link Module
                                </InputLabel>
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} />
                            <Grid item xs={12} sm={5} />
                            <Grid item xs={12} sm={4}>
                                <Button variant="contained" sx={{ color: "#ff781f" }}>
                                    Add To List
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5} />
                            <Grid item>
                                <FormTable />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default FormCard