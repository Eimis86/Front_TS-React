import { InputLabel, TableBody, TableFooter, Typography} from '@material-ui/core';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router';

const CoinList:React.FC = () =>{

    const[currency ,setCurrency] = useState<[]>([]);
    const[coins ,setCoins] = useState<[]>([]); 

    const[currData,setCurrData] = useState<string>('eur');

    const[pages, setPages] = useState<number>(0);
    const[rowsPerPage, setRowsPerPage] = useState<number>(50);

    useEffect( () => {

        if(coins)
            getCoinDetails();
        
        if(currency){
            getSupportedCurrencies();
        }

    }, [])

    useEffect( () =>{

        getCoinDetails();

    }, [currData])

    const getSupportedCurrencies= async () =>{
        await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies',{
        })
        .then( (res:AxiosResponse) =>{
            setCurrency(res.data);
        })
        .catch( (error:AxiosError) => {
            console.log(error);
        })
    }

    const getCoinDetails = async () =>{
        await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currData}&per_page=250&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,{
        })
        .then( (res:AxiosResponse) => {
            setCoins(res.data);
        })
        .catch( (error:AxiosError) => {
            console.log(error);
        })
    }

    const handleChange = (event:SelectChangeEvent<string>) =>{
        setCurrData(event.target.value);
    }

    const handlePages = (e:React.MouseEvent<HTMLButtonElement> | null, 
        newPage: number,
        ) =>{
            setPages(newPage);
    };

    const handleChangeRowsPerPage = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setRowsPerPage(parseInt(e.target.value,100));
        setPages(0);
    };

    const navigate = useNavigate();

    const handleCoinDetail = ( (id:string, name:string,market_cap:number, market_cap_rank:number,
        current_price:number,price_change_percentage_1h_in_currency:number,
                            price_change_percentage_24h_in_currency:number,price_change_percentage_7d_in_currency:number, image:string) => {
        navigate('/IndividualCoin', {state:{id, name, currData,market_cap, market_cap_rank,
            current_price,price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,price_change_percentage_7d_in_currency, image}});
    });

    let formatCurrency = Intl.NumberFormat('en-US');

    return(
        <>
        <div style={{display:"flex",justifyContent:'center'}}>
            <FormControl sx={{ width: '120px', display:'right'}}>
                <InputLabel variant='standard' htmlFor='uncontrolled-native'>Select Currency</InputLabel>
                <Select
                value={currData}
                onChange={ handleChange }
                >
                    {
                    currency.map( item => (
                        <MenuItem key={item} value={item} >{item}</MenuItem>                
                        ))
                    }
                </Select>
            </FormControl>
        </div>

        <Paper sx={{ width: '90%'}} style={{margin:"auto" }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
                    <TableRow>
                        <TableCell>Ranking</TableCell>
                        <TableCell colSpan={3}
                        align='center'
                        >Coin</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>1h</TableCell>
                        <TableCell>24h</TableCell>
                        <TableCell>7d</TableCell>
                        <TableCell>24h volume</TableCell>
                        <TableCell>Market Cap</TableCell>
                    </TableRow>                        
            </TableHead>
                <TableBody>
                {
                    (rowsPerPage > 0
                        ? coins.slice( pages * rowsPerPage, pages * rowsPerPage + rowsPerPage )
                        : coins
                        ).map( ({id,image,name,symbol,current_price,price_change_percentage_1h_in_currency,
                            price_change_percentage_24h_in_currency,price_change_percentage_7d_in_currency,market_cap, market_cap_rank}:any)=>(
                        <TableRow 
                            key={id} 
                            hover 
                            onClick={ () => {handleCoinDetail(id, name,market_cap, market_cap_rank,
                                current_price,price_change_percentage_1h_in_currency,
                            price_change_percentage_24h_in_currency,price_change_percentage_7d_in_currency, image)}}
                            >
                            <TableCell>{market_cap_rank}</TableCell>
                            <TableCell>
                            <Box
                            style={{
                                width:"20%",
                                height:"20%",
                            }}  
                            component='img'
                            src={image}
                            alt='coin'
                            />
                            </TableCell>
                            <TableCell>{name}</TableCell> 
                            <TableCell
                            align='left'
                            >{symbol}</TableCell>
                            <TableCell>{formatCurrency.format(current_price)}   
                            </TableCell>
                            <TableCell>{price_change_percentage_1h_in_currency}</TableCell>
                            <TableCell>{price_change_percentage_24h_in_currency}</TableCell>
                            <TableCell>{price_change_percentage_7d_in_currency}</TableCell>
                            <TableCell>{}</TableCell>
                            <TableCell>{market_cap}</TableCell>
                        </TableRow>          
                        )
                    )
                }
            </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    count={coins.length}
                    onPageChange={handlePages}
                    page={pages}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableRow>
                </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      </>
    );
}

export default CoinList;