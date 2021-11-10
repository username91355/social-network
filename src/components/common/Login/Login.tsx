import React from "react";
import {Avatar, Button} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import avatar from './../../../assets/img/ava.png';
import styles from './Login.module.css'
import CustomizedMenus from "./LoginDropedMenu";

export type LoginPropsType = {
    registeredUser: boolean
    signInClickHandler: () => void
    signUpClickHandler: () => void
    logOutClickHandler: () => void
}

export const Login: React.FC<LoginPropsType> = ({
                                                    registeredUser,
                                                    signInClickHandler,
                                                    signUpClickHandler,
                                                    logOutClickHandler
                                                }) => {

    return (
        <div className={styles.registeredUser__wrapper}>
            {registeredUser
                ? <div className={styles.registeredUser__container}>
                    <CustomizedMenus userName={'Alice'} logOutClickHandler={logOutClickHandler}/>
                    <Avatar alt="userAvatar" src={avatar}/>
                </div>
                : <div className={styles.notRegisteredUser__container}>
                    <Button className={styles.notRegisteredUser__container_button}
                            onClick={signUpClickHandler}
                            style={{color: 'White'}}
                            variant="outlined">Sign up</Button>
                    <Button className={styles.notRegisteredUser__container_button}
                            onClick={signInClickHandler} startIcon={<LoginIcon/>}
                            style={{backgroundColor: 'White', color: '#2196f3'}}
                            variant="contained">Sign in</Button>
                </div>
            }
        </div>
    )
}
