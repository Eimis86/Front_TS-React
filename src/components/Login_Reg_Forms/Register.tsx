import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {useState} from 'react';

const Register: React.FC = () => {

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser();
    }

    const navigate = useNavigate();

    const[action, setAction]= useState<boolean>(false);

    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[repassword, setRePassword] = useState<string>("");

    const createUser = async () => {
        if(repassword === password){
            await axios.post( 'https://localhost:7193/api/User/Register' , {
            Username: username,
            Password: password,
            })
            .then( (res: AxiosResponse ) => {
                console.log(res.data);
                setAction(true);

                setTimeout( () => {
                    navigate('/');
                }, 3000);
            })
            .catch( (error: AxiosError ) => {
                console.log(error.status);
            })
        }
    }
    

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box sx={{ marginTop: 20, }}>
                <Typography component='h1' variant='h5' align='center'>
                    Register field
                </Typography>
                <Box component='form' onSubmit={handleRegister}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                    {
                        action ?
                        <Typography> Account has been successfully created </Typography> :
                        <Typography></Typography>
                    }
                    <TextField
                        required
                        id='username'
                        label='Username'
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
                        label='Password'
                        margin='normal'
                        id='password'
                        name='password'
                        fullWidth
                        onChange={ (e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <TextField
                        required
                        label='Reenter password'
                        margin='normal'
                        id='password'
                        name='repassword'
                        fullWidth
                        onChange={ (e) => {
                            setRePassword(e.target.value);
                        }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                    >
                        Sign up
                    </Button>
                    <Link to='/'>
                        Sing in
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}


export default Register