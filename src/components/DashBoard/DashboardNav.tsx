import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AppBar , Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardNav: React.FC = () => {

    const {setAuth, auth}:any = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = React.useState<boolean>(false);

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const drawerWidth = 240;

    const handlleLogout = () => {
        setAuth({userId:'', username:'', jwtToken:''});
        if(auth){
            console.log('empty');
            console.log(auth);
        }
        console.log(auth);
        navigate('/');
    }
    console.log(auth);

    const handlleClick = ( navigateWhere: string ) => {
        navigate(`/${navigateWhere}`);
    }

    return (
        <>
        <Box sx={{ display: 'flex',
                    width: '100%',
                    height:'64px',
                    }}>
            <CssBaseline />
            <AppBar color='secondary'>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography style={{ flexGrow: 1, }}>
                        Coin Dashboard
                    </Typography>
                    <Typography color='inherit'>
                        <Button onClick={handlleLogout}>Logout</Button>
                        {auth.username}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx = {{ 
                    width: drawerWidth
                 }}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon /> 
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Account', 'Purcase', 'Wallet', 'Dashboard'].map((text, index) => (
                        <ListItem button key={text} onClick={ () => {handlleClick(text)}} >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

        </Box>
        <Box sx={{
            marginTop: 5
        }}>
            <Stack 
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={0}
            mt={2}
            >
            </Stack>
        </Box>
        </>
    )
}

export default DashboardNav;