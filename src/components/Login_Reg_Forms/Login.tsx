import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography, CssBaseline, TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import  axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import useAuth from '../hooks/useAuth';

const Login:React.FC = () => {

    const {setAuth, auth}:any = useAuth();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        LoginUser();

    }

    const navigate = useNavigate();

    const[active, setActive] = useState<boolean>(false);

    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");

    const LoginUser = async () => {
        await axios.post('https://localhost:7193/api/User/Login', {
            Username: username,
            Password: password,
        })
        .then( (res: AxiosResponse) => {
            if( res.data ) { 
                const jwtToken:string = res.data.token;
                const userId:number = res.data.id;
                setAuth({userId, username, jwtToken});
                if(auth){
                    setActive(false);
                    console.log(auth);
                    navigate('/Dashboard');
                }
            } 
        })
        .catch( (error: AxiosError) => {
            console.log(error.status);
            setActive(true);
        });

    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box sx={{ marginTop: 20 }}>
                <Typography component='h1' variant='h5' align='center'>
                    Login field
                </Typography>
                <Box component='form' onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >

                    {
                    active ? 
                    <Typography> Username or Password incorrect </Typography> : 
                    <Typography> </Typography>
                    }

                    <TextField
                        required
                        id='username'
                        label='username'
                        name='username'
                        autoFocus
                        margin='normal'
                        fullWidth
                        onChange={ (e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <TextField
                        required
                        label='password'
                        margin='normal'
                        type='password'
                        id='password'
                        name='password'
                        fullWidth
                        onChange={ (e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                    >
                        Sign in
                    </Button>
                    <Link to='/Register'>
                        Sing up
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;