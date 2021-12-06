import {NavLink} from "react-router-dom";
import styles from "./DialogList.module.css";
import React from "react";
import avatar from '../../../assets/img/avatar-small.png'
import {TUser} from "../../../redux/reducers/messages-reducer";

type TProps = {
    dialogs: Array<TUser>
}

const DialogList: React.FC<TProps> = props => {

    const {
        dialogs
    } = props

    return <div className={styles.dialogs__container}>
        {
            dialogs.map(d => {
                return <div key={d.id} className={styles.dialogs__item}>

                    <NavLink to={`/messages/${d.id}`}
                             className={({isActive}) => isActive
                                 ? styles.dialogs__link_active
                                 : styles.dialogs__link}>
                        <div className={styles.dialogs__link_info}
                             style={{display: 'flex', alignItems: 'center'}}>
                            <img src={d.photos.small || avatar} alt="avatar"/>
                            <div>
                                <div>
                                    {d.name}
                                </div>
                                <div>
                                    {d.status || 'Status not set'}
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            })
        }
    </div>
}

export default DialogList