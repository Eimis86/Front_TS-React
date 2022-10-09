import { CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import { Card, Container } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const Trending: React.FC = () => {

    const [trending, setTrending] = useState<[]>([]);

    useEffect(() => {
        getTrending();
    }, [])

    const getTrending = async () => {
        await axios.get('https://api.coingecko.com/api/v3/search/trending', {
        })
            .then((res: AxiosResponse) => {
                setTrending(res.data.coins);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }

    return (
        <>
            <Typography
                variant='h4'
                align="center"
                style={{ marginTop: '60px' }}>
                Trending Coins</Typography>
            <Container
                component='div'
                sx={{
                    display: 'flex',
                    marginBottom: '20px',
                }}>
                {trending.map(({ item }: any) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 10,
                            maxWidth: 345
                        }}>
                        <CardHeader
                            title={item.name}
                        />
                        <div style={{ display: "flex", width: '50%', margin: 'auto' }}>
                            <CardMedia
                                height="100%"
                                width="100%"
                                component="img"
                                image={item.large}
                                alt={item.large}
                            />
                        </div>
                        <CardContent>
                            <Typography>{item.symbol}</Typography>
                            <Typography>{Number(item.price_btc).toFixed(8)} btc</Typography>
                        </CardContent>
                    </Card>
                )
                )
                }
            </Container>
        </>
    );
}

export default Trending;