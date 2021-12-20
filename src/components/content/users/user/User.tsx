import {UserType} from "../../../../data/users-reducer";
import React from "react";
import styles from "./User.module.css";
import avatar from "../../../../assets/img/avatar.png";
import {Link} from "react-router-dom";
import Button from "../../../common/button/Button";

type TProps = {
    user: UserType
    followOnUser: (id: number) => void
    unfollowFromUser: (id: number) => void
}

const User: React.FC<TProps> = ({user, followOnUser, unfollowFromUser}) => {

    console.log('User')
    const follow = () => {
        followOnUser(user.id)
    }

    const unfollow = () => {
        unfollowFromUser(user.id)
    }

    return (
        <div className={styles.user_wrapper}>
            <div className={styles.user_img_box}>
                <img src={(user.photos.small) || avatar} alt="avatar"/>
            </div>
            <div className={styles.user_info_box}>
                <Link className={styles.user_info_name}
                      to={`/profile/${user.id}`}>{user.name}</Link>
                <span>{(user.status) ? user.status : 'Empty status'}</span>
            </div>
            <div className={styles.user_button_box}>
                {
                    (user.followed)
                        ?<Button title={'Unfollow'} onClick={unfollow}/>
                        :<Button title={'Follow'} onClick={follow}/>
                }
            </div>
        </div>
    );
};

export default React.memo(User)