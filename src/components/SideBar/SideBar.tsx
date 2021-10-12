import React from "react";
import { NavLink } from "react-router-dom";
import classes from './SideBar.module.css'

function SideBar() {
    return (
        <div className={classes.sideBar__wrapper}>
            <ul className={classes.sideBar__bar}>
                <li className={classes.sideBar__item}>
                    <NavLink className={classes.sideBar__item_link}
                    activeClassName={classes.sideBar__item_link_active}
                    to='/profile'>My Profile</NavLink>
                </li>
                <li className={classes.sideBar__item}>
                    <NavLink className={classes.sideBar__item_link}
                    activeClassName={classes.sideBar__item_link_active}
                    to='/messages'>Messages</NavLink>
                </li>
                <li className={classes.sideBar__item}>
                    <NavLink className={classes.sideBar__item_link}
                    activeClassName={classes.sideBar__item_link_active}
                    to='/friends'>Friends</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBar