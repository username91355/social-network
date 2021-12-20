import React, {ChangeEvent, useEffect} from 'react';
import {initializationStatus, UserType} from "../../../data/users-reducer";
import styles from './Users.module.css'
import {UsersPropsType} from './UsersC';
import Preloader from "../../common/preloader/Preloader";
import Search from "../../common/Search/Search";
import User from './user/User';
import Button from "../../common/button/Button";

const Users: React.FC<UsersPropsType> = props => {

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

                <div className={styles.users_filter_buttons}>
                    <div>
                        <Search value={term} onChange={searchAreaChangeHandler}/>
                        <Button title={'Search'} onClick={takeUsers}/>
                    </div>
                    <Button title={'All users'}
                            onClick={showAllUsers}
                            isActive={!friend && friend === null }/>
                    <Button title={'Subscribers'}
                            onClick={showSubscribers}
                            isActive={friend}/>
                    <Button title={'Non subscribers'}
                            onClick={showNonSubscribers}
                            isActive={!friend && friend !== null}/>
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

export default React.memo(Users);