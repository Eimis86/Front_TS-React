import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardNav from "../DashBoard/DashboardNav";
import useAuth from '../hooks/useAuth';
import Delete from '@mui/icons-material/Delete'
import axios, { AxiosError, AxiosResponse } from "axios";

const Wallet = () => {

    const {auth}:any = useAuth();

    const[walletname, setWalletName] = useState<string>('');
    const[walletmodel, setWalletModel] = useState<string>('');

    const[wallets, setWallets] = useState<[]>([]);

    const loadWallets = async () => {
        
        await axios.get(`https://localhost:7193/api/Wallet/GetWallets`,{
            params:{userid:auth.userId},
            headers:{'Authorization':`Bearer ${auth.jwtToken}`}
        })
        .then( (res:AxiosResponse) => {
            console.log(res.data);
            setWallets(res.data);
        })
        .catch( (error:AxiosError) => {
            console.log(error);
        })
    }

    useEffect( () => {
        loadWallets();
    },[])

    const handlleAddWallet = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post(`https://localhost:7193/api/Wallet`,{
            walletName: walletname,
            walletNumber: walletmodel,
            userId: auth.userId
        },{
            headers:{
                'Authorization': `Bearer ${auth.jwtToken}`
            }
        })
        .then( (res: AxiosResponse) => {
            console.log(res.data);
        })
        .catch( (error:AxiosError) => {
            console.log(error);
        })
        loadWallets();
    } 

    const handlleDelete = async(id:number) => {
        await axios.delete(`https://localhost:7193/api/Wallet/${id}`,{
            headers:{
                'Authorization': `Bearer ${auth.jwtToken}`
            }
        })
        .then( (res:AxiosResponse ) => {
            console.log(res);
        })
        .catch( (error:AxiosError) => {
            console.log(error);
        })
        loadWallets();
    }

    return (
        <>
            <DashboardNav />
            <Typography align="center" component='h2' variant='h4'>Wallet</Typography>
            <Container component='div' 
            sx={{
                marginTop:'40px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Wallet Name</TableCell>
                                    <TableCell align='center'>Wallet Model</TableCell>
                                    <TableCell>  </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wallets.map( ({id,walletName,walletNumber}:any) => (
                                <TableRow key={id}> 
                                    <TableCell align='center'>{walletName}</TableCell>
                                    <TableCell align='center'>{walletNumber}</TableCell>
                                    <TableCell align='center'> <Delete onClick={ () => { handlleDelete(id) }} /> </TableCell>
                                </TableRow>                                    
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box component='form' onSubmit={handlleAddWallet}>
                    <Typography>Add Wallet To Your Account</Typography>
                    <TextField
                        id='walletname'
                        label='Wallet Name'
                        name='walletname'
                        margin="normal"
                        fullWidth
                        onChange={(e) => {
                            setWalletName(e.target.value);
                        }}
                    />
                    <TextField
                        id='walletmodel'
                        label='Wallet Model'
                        name="walletmodel"
                        margin="normal"
                        fullWidth
                        onChange={(e) => {
                            setWalletModel(e.target.value);
                        }}
                    />
                    <Button
                        type='submit'
                        variant="contained"
                    >
                        Add Wallet
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Wallet;