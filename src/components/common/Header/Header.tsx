import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Login} from "../Login/Login";
import styles from './Header.module.css'
import Container from '@mui/material/Container';

type HeaderPropsType = {
    isInitializationUser: boolean
    login: () => void
    logout: () => void
}

export const Header: React.FC<HeaderPropsType> = ({isInitializationUser, login, logout}) => {

    return (
        <Box className={styles.header__wrapper}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" component="div">
                            Social network
                        </Typography>
                        <div className={styles.header__login}>
                            <Login
                                registeredUser={isInitializationUser}
                                signInClickHandler={login}
                                signUpClickHandler={() => {}}
                                logOutClickHandler={logout}/>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}