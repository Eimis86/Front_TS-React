import { Typography } from "@mui/material";
import CoinList from "./CoinList";
import DashboardNav from "./DashboardNav";
import Trending from "./Trending";

const Dashboard:React.FC = () => {
    return(
        <>
            <DashboardNav/>
            <Typography variant='h4' align='center'> Coin Market </Typography>
            <CoinList/>
            <Trending/>
        </>    
    )
};

export default Dashboard;