import { Grid } from "@mui/material";
import { useEffect } from "react";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import  'chart.js/auto'
ChartJS.register(...registerables);

interface Props {
    prices:[],
    days:string,
}

const Chart:React.FC<Props> = ({prices, days}:Props) => { 

    useEffect( () => {
        
    },[prices])

    return(
        <>
        <Grid item md={12}>
            <Line
            data = {{
                labels: prices.map( e => `${new Date(e[0]).getHours()}:${new Date(e[0]).getMinutes()}` ),
                datasets: [
                    {
                    label: "Price",
                    data: prices.map( (e) => e[1] ),
                    backgroundColor: '#fd0303',
                    borderColor: '#fd0303',
                    borderWidth:1,
                    }
                ]   
            }}
            options={{
                elements:{
                    point:{
                        radius: 0,
                    }
                },
                plugins:{
                    title:{
                        display:true,
                        text: `${days} day time`,
                        color:'black',
                    },
                    legend:{
                        display: false, 
                        position: "bottom",
                    },
                },
            }}
            />
        </Grid>
        </>
    )
}
export default Chart;