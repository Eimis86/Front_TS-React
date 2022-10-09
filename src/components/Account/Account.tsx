import { Box, TextField, Typography } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import DashboardNav from "../DashBoard/DashboardNav";
import useAuth from '../hooks/useAuth';

const Account = () => {

    const { auth }: any = useAuth();

    const [currpass, setCurrPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');

    const handlleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        changePass();
    }

    const changePass = async () => {
            await axios.put( `https://localhost:7193/api/User/${auth.userId}` ,{
                    OllPass : newPass ,
                    Username: auth.username,
                    Password: currpass,    
                }, { 
                    headers: {
                        'Authorization' : `Bearer ${auth.jwtToken}`
                    }
            })
            .then( (res: AxiosResponse ) => {
                console.log(res);
            })
            .catch( (error: AxiosError ) => {
                console.log(error.status);
            })
    }

    return (
        <>
            <DashboardNav />
            <Typography align="center" component='h2' variant='h4'>Account</Typography>
            <Container 
                component='div' 
                sx={{
                marginTop:'40px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <Box>
                    <Typography> Your account ID : {auth.userId}</Typography>
                    <Typography> Your Username is : {auth.username}</Typography>
                </Box>
                <Box component='form' onSubmit={handlleChange}>
                    <Typography>Change Password</Typography>
                    <TextField
                        id='currpass'
                        label='Current password'
                        name='password'
                        margin="normal"
                        fullWidth
                        onChange={(e) => {
                            setCurrPass(e.target.value);
                        }}
                    />
                    <TextField
                        id='newpass'
                        label='New password'
                        name="newpass"
                        margin="normal"
                        fullWidth
                        onChange={(e) => {
                            setNewPass(e.target.value);
                        }}
                    />
                    <Button
                        type='submit'
                        variant="contained"
                    >
                        Change Password
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Account;