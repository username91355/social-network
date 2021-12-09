import {NavLink} from "react-router-dom";
import styles from "./DialogList.module.css";
import React from "react";
import avatar from '../../../../assets/img/avatar-small.png'
import {TUser} from "../../../../redux/reducers/messages-reducer";

type TProps = {
    userList: Array<TUser>
}

const DialogList: React.FC<TProps> = props => {

    const {
        userList
    } = props

    return <div className={styles.dialogs__container}>
        {
            userList.map(d => {
                return <div key={d.id} className={styles.dialogs__item}>

                    <NavLink to={`/messages/${d.id}`}
                             className={({isActive}) => isActive
                                 ? styles.dialogs__link_active
                                 : styles.dialogs__link}>
                        <div className={styles.dialogs__link_info}
                             style={{display: 'flex', alignItems: 'center'}}>
                            <img src={d.photos.small || avatar} alt="avatar"/>
                            <div>
                                <h3>{d.name}</h3>
                                <div>{d.status || 'Status not set'}</div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            })
        }
    </div>
}

export default DialogList