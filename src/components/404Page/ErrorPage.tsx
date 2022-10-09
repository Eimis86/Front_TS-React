import { Typography } from '@material-ui/core';
import Box from '@mui/material/Box';

const ErrorPage = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: 25,
            }}
        >
            <Typography
                component='h1'
                variant='h2'
            >
                404 Error
            </Typography>
            <Typography
                component='h1'
                variant='h3'
            >
                Page Not Found
            </Typography>
        </Box>
    )
}

export default ErrorPage;