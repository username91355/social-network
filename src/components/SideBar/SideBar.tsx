import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
    return (
        <div>
            <ul>
                <li><NavLink to='/profile'>My Profile</NavLink></li>
                <li><NavLink to='/messages'>Messages</NavLink></li>
                <li><NavLink to='/friends'>Friends</NavLink></li>
            </ul>
        </div>
    )
}

export default SideBar