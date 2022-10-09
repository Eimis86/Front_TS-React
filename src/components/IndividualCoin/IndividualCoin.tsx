import { CardContent, CardMedia, TableBody, TableCell, CardActions, Box, InputLabel, MenuItem } from "@material-ui/core";
import { Button, Card, FormControl, Grid, Table, TableHead, TableRow, TextField, Typography, SelectChangeEvent, Select } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import DashboardNav from "../DashBoard/DashboardNav";
import Chart from "./Chart";
import useAuth from '../hooks/useAuth';
import Popup from "../Popup/Popup";

interface LocationState {
    id: string,
    name: string,
    currData: [],
    market_cap: number,
    market_cap_rank: number,
    current_price: number,
    price_change_percentage_1h_in_currency: number,
    price_change_percentage_24h_in_currency: number,
    price_change_percentage_7d_in_currency: number,
    image: string
}

const IndividualCoin: React.FC = () => {

    const [currency,] = useState<string>('eur');
    //const[currArray, setCurrArray] = useState<[]>([]);
    const [days, setDays] = useState<string>('1');
    //1.30.1y.max
    const [prices, setPrices] = useState<[]>([]);

    const [pop, setPop] = useState<boolean>(false);

    const { auth }: any = useAuth();

    const [coinAmount, setCoinAmount] = useState<string>("");

    const [wallet, setWallet] = useState<[]>([]);
    const [walletData, setWalletData] = useState<string>('');

    const { state } = useLocation();
    const { id, name, currData, market_cap, market_cap_rank,
        current_price, price_change_percentage_1h_in_currency,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency, image } = state as LocationState;

    useEffect(() => {
        oneCoin();
    }, [])

    useEffect(() => {
        oneCoin();
    }, [days])

     const handleBuy = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        buyCoin();
    }

    const buyCoin = async () => {
        if(parseInt(coinAmount) > 0){
        var CoinAMOUNT = parseFloat(coinAmount);
        await axios.put(`https://localhost:7193/api/Coin/Buy`,{
                image:  image ,
                coinName:  name ,
                coinAmount:  CoinAMOUNT ,
                walletId:  walletData 
            },{
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
            setPop(false);
        }

    }

    const oneCoin = async () => {
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`, {
        })
            .then((res: AxiosResponse) => {
                setPrices(res.data.prices);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }

    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate('/Dashboard');
    }

    let formatCurrency = Intl.NumberFormat('en-US');

    const handle24hour = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('1');
    }
    const handle7day = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('7');
    }
    const handle14day = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('14');
    }
    const handle30day = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('30');
    }
    const handle90day = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('90');
    }
    const handle180day = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('180');
    }
    const handle1year = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('364');
    }
    const handleMax = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDays('max');
    }

    const handlePopupLoad = () => {
        setPop(true);
        getWallet();
    }

    const getWallet = async () => {
        await axios.get(`https://localhost:7193/api/Wallet/GetWallets`, {
            params: { userid: auth.userId },
            headers: { 'Authorization': `Bearer ${auth.jwtToken}` }
        })
            .then((res: AxiosResponse) => {
                setWallet(res.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }

    const handleWalletSelect = (event:SelectChangeEvent<string>) => {
        setWalletData(event.target.value);
    }

    return (
        <>
            <DashboardNav />
            <Grid container>
                <Grid item md={6} sx={{ display: "flex", justifyContent: 'center' }}>
                    <Card style={{ width: '80%' }}>
                        <Typography variant="h2" align="center">{name}</Typography>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <CardMedia
                                style={{
                                    width: "30%",
                                    height: "30%",
                                }}
                                component="img"
                                image={image}
                                alt={image}
                            />
                        </div>
                        <CardContent>
                            <Typography align="center" variant="h6" padding={"4px"}>Market cap rank: {market_cap_rank}</Typography>
                            <Typography align="center" variant="h6" padding={"4px"}>Total Market cap: {formatCurrency.format(market_cap)} {currData}</Typography>
                            <Typography align="center" variant="h6" padding={"4px"}>Current price: {formatCurrency.format(current_price)} {currData}</Typography>
                            <Table style={{ marginTop: '20px' }}>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ fontSize: "15pt" }} align="center">price change 1h</TableCell>
                                        <TableCell style={{ fontSize: "15pt" }} align="center">price change 24h</TableCell>
                                        <TableCell style={{ fontSize: "15pt" }} align="center">price change 7d</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "15pt" }} align="center">{Number(price_change_percentage_1h_in_currency).toFixed(2)}%</TableCell>
                                        <TableCell style={{ fontSize: "15pt" }} align="center">{Number(price_change_percentage_24h_in_currency).toFixed(2)}%</TableCell>
                                        <TableCell style={{ fontSize: "15pt" }} align="center">{Number(price_change_percentage_7d_in_currency).toFixed(2)}%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardActions style={{ justifyContent: "center" }}>
                            <Button onClick={handleNavigateBack}>Back to dashboard</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", alignItems: 'center' }}>
                    <div style={{ width: '95%' }}>
                        <Chart prices={prices} days={days} />
                        <Box>
                            <Button onClick={handle24hour}>24h</Button>
                            <Button onClick={handle7day}>7d</Button>
                            <Button onClick={handle14day}>14d</Button>
                            <Button onClick={handle30day}>30d</Button>
                            <Button onClick={handle90day}>90d</Button>
                            <Button onClick={handle180day}>180d</Button>
                            <Button onClick={handle1year}>1y</Button>
                            <Button onClick={handleMax}>Max</Button>
                        </Box>
                        <Box>
                            <Button sx={{
                                color: 'white',
                                backgroundColor: 'green'
                            }}
                                onClick={() => { handlePopupLoad() }}
                                fullWidth
                            >Buy</Button>
                            <Typography></Typography>
                            <Popup pop={pop} setPop={setPop}>
                                <Typography variant='h4'>{name}</Typography>
                                <FormControl sx={{ width: '200px', display: 'right' }}>
                                    <InputLabel variant='standard' htmlFor='uncontrolled-native'>Select Your Wallet</InputLabel>
                                    <Select
                                        value={walletData}
                                        onChange={handleWalletSelect}
                                    >
                                        {
                                            wallet.map(({ id, walletName }: any) => (
                                                <MenuItem key={id} value={id}>{walletName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Box component='form' onSubmit={handleBuy}>
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
                                            step:'any'
                                        }}
                                        onChange={(e) => {
                                            setCoinAmount(e.target.value);
                                        }}
                                    />
                                    <Button type="submit">Buy</Button>
                                </Box>
                            </Popup>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default IndividualCoin;