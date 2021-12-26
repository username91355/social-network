import React, {useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {WithAuth} from "../../WithAuth";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, subscribeToUser, unsubscribeFromUser} from "../../state/reducers/users-reducer";
import {TAppState} from "../../state/store";
import {IUser} from "../../api/api";
import {Search} from "../../components/search/Search";

export const Users = () => {

    const dispatch = useDispatch()
    const {page, count, term, friend, subscriptionProcess} = useSelector((state: TAppState) => state.users)
    const users = useSelector((state: TAppState) => state.users.users)

    useEffect(() => {
        dispatch(getUsers(page, count, term, friend))
    }, [dispatch])

    const setSearchValue = useCallback((value: string) => {
        dispatch(getUsers(page, count, value, friend))
    }, [dispatch])

    const setUserLsitFilter = useCallback((filter: boolean | null) => {
        dispatch(getUsers(page, count, term, filter))
    }, [dispatch])

    return (
        <WithAuth>
            <Search submit={setSearchValue}/>
            <div>
                <button onClick={() => setUserLsitFilter(null)}>All</button>
                <button onClick={() => setUserLsitFilter(true)}>Friends</button>
                <button onClick={() => setUserLsitFilter(false)}>Users</button>
            </div>
            {users.map(u => <User key={u.id} {...u} subscriptionProcess={subscriptionProcess}/>)}
        </WithAuth>
    );
};

interface IUserProps extends IUser {
    subscriptionProcess: number[]
}

const User: React.FC<IUserProps> = props => {

    const {
        id,
        name,
        status,
        photos,
        followed,
        subscriptionProcess
    } = props
    const dispatch = useDispatch()
    const isDisebled = subscriptionProcess.some(i => i === id)

    const subscribe = () => {
        dispatch(subscribeToUser(id))
    }

    const unsubscribe = () => {
        dispatch(unsubscribeFromUser(id))
    }

    return <div>

        <Link to={`/profile/${id}`}>
            <img src={photos.small} alt="..."/>{name}</Link>
        <span>{status || '...'}</span>
        {
            followed
                ? <button onClick={unsubscribe} disabled={isDisebled}>Unsubscribe</button>
                : <button onClick={subscribe} disabled={isDisebled}>Subscribe</button>
        }
    </div>
}