import { InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import DashboardNav from "../DashBoard/DashboardNav";
import useAuth from '../hooks/useAuth';
import Popup from "../Popup/Popup";

interface CoinsData {
    id: number,
    coinName: string,
    coinAmount: number,
    walletId: number
}

const Purcase = () => {

    const { auth }: any = useAuth();

    const [coins, setCoins] = useState<[]>([]);
    const [wallets, setWallets] = useState<[]>([]);
    const [pop, setPop] = useState<boolean>(false);

    const [coinAmountInField, setCoinAmountInField] = useState<string>("");
    const [currentCoinData, setCurrentCoinData] = useState<CoinsData>({ id: 0, coinName: '', coinAmount: 0, walletId: 0 });

    const loadWallets = async () => {
        await axios.get(`https://localhost:7193/api/Wallet/GetWallets`, {
            params: { userid: auth.userId },
            headers: { 'Authorization': `Bearer ${auth.jwtToken}` }
        })
            .then((res: AxiosResponse) => {
                console.log(res.data);
                setWallets(res.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }

    const handleCoins = async (id: number) => {
        await axios.get(`https://localhost:7193/api/Coin/GetCoins`, {
            params: { walletId: id },
            headers: { 'Authorization': `Bearer ${auth.jwtToken}` }
        })
            .then((res: AxiosResponse) => {
                setCoins(res.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadWallets();
    }, [])

    const handlePopupLoad = (id: number, coinName: string, coinAmount: number, walletId: number) => {
        setPop(true);

        setCurrentCoinData({ id, coinName, coinAmount, walletId });

        //console.log(id + ' ' + coinName + ' ' + coinAmount);
        /*setTimeout( () =>{
            console.log(currentCoinData);
        }, 3000);*/
    }

    const handleSell = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('handle Sell');
        var coinFloat = parseFloat(coinAmountInField);
            await axios.put(`https://localhost:7193/api/Coin/Sell`, {
                coinName: currentCoinData.coinName,
                coinAmount: coinFloat,
                walletId: currentCoinData.walletId
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.jwtToken}`
                }
            })
                .then((res: AxiosResponse) => {
                    console.log(res);
                })
                .catch((error: AxiosError) => {
                    console.log(error);
                })
            handleCoins(currentCoinData.walletId);
            setPop(false);

        if(parseFloat(coinAmountInField) === currentCoinData.coinAmount){
            await axios.delete(`https://localhost:7193/api/Coin/${currentCoinData.id}`,{
                headers: {
                    'Authorization': `Bearer ${auth.jwtToken}`
                }
            })
            .then((res: AxiosResponse) => {
                console.log(res);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
            handleCoins(currentCoinData.walletId);
            setPop(false);
        }

    }

    return (
        <>
            <DashboardNav />
            <Grid container>
                <Grid item md={6} sx={{ display: "flex", justifyContent: 'center' }}>
                    <Table style={{ marginTop: '20px', width: '90%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontSize: "15pt" }} align="center"></TableCell>
                                <TableCell style={{ fontSize: "15pt" }} align="center">Coin name</TableCell>
                                <TableCell style={{ fontSize: "15pt" }} align="center">Coin Amount</TableCell>
                                <TableCell style={{ fontSize: "15pt" }} align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coins.map(({ id, image, coinName, coinAmount, walletId }: any) => (
                                <TableRow key={id}>
                                    <TableCell style={{ fontSize: "10pt" }} align="center">
                                        <Box
                                            style={{
                                                width: "10%",
                                                height: "10%",
                                            }}
                                            component='img'
                                            src={image}
                                            alt='coinImage'
                                        />
                                    </TableCell>
                                    <TableCell style={{ fontSize: "10pt" }} align="center">{coinName}</TableCell>
                                    <TableCell style={{ fontSize: "10pt" }} align="center">{coinAmount}</TableCell>
                                    <TableCell style={{ fontSize: "10pt" }} align="center"><Button onClick={() => {
                                        handlePopupLoad(id, coinName, coinAmount, walletId)
                                    }}>Sell</Button></TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: 'center' }}>
                    <Table style={{ marginTop: '20px', width: '90%' }}>
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ fontSize: "15pt" }} align="center">Wallet number</TableCell>
                                <TableCell style={{ fontSize: "15pt" }} align="center">Wallet name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wallets.map(({ id, walletName, walletNumber }: any) => (
                                <TableRow key={id} onClick={() => { handleCoins(id) }} hover >
                                    <TableCell style={{ fontSize: "10pt" }} align="center">{walletName}</TableCell>
                                    <TableCell style={{ fontSize: "10pt" }} align="center">{walletNumber}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            <Popup pop={pop} setPop={setPop}>
                <Typography variant='h4'>{currentCoinData.coinName}</Typography>
                <Box component='form' onSubmit={handleSell}>
                    <Box>
                        <TextField
                            required
                            id='coinAmount'
                            label='Coin Amount'
                            name='coinAmount'
                            autoFocus
                            margin='normal'
                            fullWidth
                            type='number'
                            inputProps={{
                                step: 'any',
                                min:0.1,
                                max: currentCoinData.coinAmount
                            }}
                            onChange={(e) => {
                                setCoinAmountInField(e.target.value);
                            }}
                        />
                    </Box>
                    <Button type="submit">Sell</Button>
                </Box>
            </Popup>
        </>
    )
}

export default Purcase;