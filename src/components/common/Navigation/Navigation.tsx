import React, {MouseEvent} from 'react';
import styles from './Navigation.module.css'
import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import {Button} from '@mui/material';

export const Navigation = () => {

    const buttonStyle = {
        color: '#1976d2',
        fontWeight: 600,
        textDecoration: 'none'
    }

    return (
        <div className={styles.nav__wrapper}>
            <Button variant="text"
                    startIcon={<AccountCircleIcon/>}
                    onClick={(e:MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                <NavLink to={'/profile'} style={buttonStyle}>My profile</NavLink>
            </Button>
            <Button variant="text"
                    startIcon={<ForumRoundedIcon/>}
                    onClick={(e:MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                <NavLink to={'/messages'} style={buttonStyle}>Messages</NavLink>
            </Button>
            <Button variant="text"
                    startIcon={<PeopleRoundedIcon/>}
                    onClick={(e:MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                <NavLink to={'/friends'} style={buttonStyle}>Friends</NavLink>
            </Button>
        </div>
    );
}