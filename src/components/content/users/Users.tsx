import React, {ChangeEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {initializationStatus, UserType} from "../../../redux/users-reducer";
import avatar from '../../../assets/img/avatar.png'
import styles from './Users.module.css'
import {UsersPropsType} from './UsersC';
import Preloader from "../../common/preloader/Preloader";
import Search from "../../common/Search/Search";

const Users: React.FC<UsersPropsType> = props => {
    console.log('Users')
    const {
        count,
        page,
        term,
        friend,
        users,
        usersInit,
        getUsers,
        followOnUser,
        unfollowFromUser,
        changeSearchArea,
        showAllUsers,
        showSubscribers,
        showNonSubscribers,
    } = props

    const takeUsers = () => {
        getUsers(count, page, term, friend)
    }

    useEffect(takeUsers, [count, page, friend, getUsers])

    const searchAreaChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeSearchArea(e.currentTarget.value)
    }

    if (usersInit === initializationStatus.NOT_INITIALIZED) {
        takeUsers()
    }

    return <>
        {(usersInit === initializationStatus.NOT_INITIALIZED)
            ? <Preloader/>
            : <div>
                <div>
                    <Search value={term} onChange={searchAreaChangeHandler}/>
                    <button onClick={takeUsers}>Search</button>
                </div>
                <div className={styles.users_filter_buttons}>
                    <button className={!friend && friend === null ? styles.active_filter_button : ''}
                            onClick={showAllUsers}>All users
                    </button>
                    <button className={friend ? styles.active_filter_button : ''}
                            onClick={showSubscribers}> Subscribers
                    </button>
                    <button className={!friend && friend !== null ? styles.active_filter_button : ''}
                            onClick={showNonSubscribers}>Non subscribers
                    </button>
                </div>
                {
                    users.map((u: UserType) => {
                        return <User key={u.id}
                                     user={u}
                                     followOnUser={followOnUser}
                                     unfollowFromUser={unfollowFromUser}
                        />
                    })
                }
            </div>
        }
    </>
        ;
};

type UserPropsType = {
    user: UserType
    followOnUser: (id: number) => void
    unfollowFromUser: (id: number) => void
}

const User: React.FC<UserPropsType> = ({user, followOnUser, unfollowFromUser}) => {
    const follow = () => {
        followOnUser(user.id)
    }

    const unfollow = () => {
        unfollowFromUser(user.id)
    }

    return (
        <div className={styles.user_wrapper}>
            <div className={styles.user_img_box}>
                <img src={(user.photos.small) ? user.photos.small : avatar} alt="avatar"/>
            </div>
            <div className={styles.user_info_box}>
                <Link to={`/profile/${user.id}`}>{user.name}</Link>
                <span>{(user.status) ? user.status : 'Empty status'}</span>
            </div>
            <div className={styles.user_button_box}>
                {
                    (user.followed)
                        ? <button onClick={unfollow}>Unfollow</button>
                        : <button onClick={follow}>Follow</button>
                }
            </div>
        </div>
    );
};

export default Users;