import { Box, Button } from '@mui/material'
import { relative } from 'path';
import React from 'react'

interface Props {
    pop:boolean,
    children:any,
    setPop:React.Dispatch<React.SetStateAction<boolean>>,
}

const Popup:React.FC<Props> = ({setPop,pop,children}:Props) => {

  return (pop) ? (
    <Box
        style={{
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
            height:'100vh',
            backgroundColor:'rgba(0,0,0,0.2)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}
    >
        <Box
            style={{
                position:'relative',
                padding: '32px',
                width:'100%',
                maxWidth:'640px',
                backgroundColor:'#FFF',
            }}
        >
            <Button
                style={{
                    position:'absolute',
                    top:'16px',
                    right:'16px',
                }}
                onClick={ () => {setPop(false)}}
            >Close</Button>
            {children}
        </Box>
    </Box>
  ) : (<></>);
}

export default Popup