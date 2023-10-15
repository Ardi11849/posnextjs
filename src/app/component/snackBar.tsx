import { Alert, Snackbar } from "@mui/material";

const SnackBar = ({type, message}: {type: string, message: string}) => {
    return (
        <Snackbar autoHideDuration={6000}>
            <Alert 
            // @ts-ignore
            severity= {type ? type : 'error'} 
            sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar;