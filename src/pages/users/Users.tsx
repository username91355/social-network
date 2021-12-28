import React, {useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {WithAuth} from "../../auxiliary-components/WithAuth";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, subscribeToUser, unsubscribeFromUser} from "../../state/reducers/users-reducer";
import {TAppState} from "../../state/store";
import {IUser} from "../../api/api";
import {SearchArea} from "../../components/search/Search";
import {Button, Card, Pagination, Radio, RadioChangeEvent, Skeleton} from "antd";
import {EditOutlined, UserOutlined} from '@ant-design/icons/lib/icons';
import Meta from 'antd/lib/card/Meta';
import Avatar from 'antd/lib/avatar/avatar';
import {Preloader} from "../../components/preloader/Preloader";
import {Paginator} from "../../components/paginator/Paginator";

export const Users = () => {

    const dispatch = useDispatch()
    const {page, count, term, friend, subscriptionProcess} = useSelector((state: TAppState) => state.users)
    const totalCount = useSelector((state: TAppState) => state.users.totalCount)
    const users = useSelector((state: TAppState) => state.users.users)

    useEffect(() => {
        dispatch(getUsers(page, count, term, friend))
    }, [dispatch])

    const setCountValue = useCallback((count: number) => {
        dispatch(getUsers(page, count, term, friend))
    }, [dispatch])

    const setSearchValue = useCallback((term: string) => {
        dispatch(getUsers(page, count, term, friend))
    }, [dispatch])

    const setUserListFilter = useCallback((filter: boolean | null) => {
        dispatch(getUsers(page, count, term, filter))
    }, [dispatch])

    const filterUserListHandler = (e: RadioChangeEvent) => {
        if (e.target.value === 'friends') {
            setUserListFilter(true)
        } else if (e.target.value === 'users') {
            setUserListFilter(false)
        } else {
            setUserListFilter(null)
        }
    }
    return (
        <WithAuth>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px'}}>
                <SearchArea submit={setSearchValue}/>
                <Radio.Group value={'default'} style={{padding: '10px 0'}}
                             onChange={filterUserListHandler}>
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="friends">Friends</Radio.Button>
                    <Radio.Button value="users">Users</Radio.Button>
                </Radio.Group>
                {users.map(u => <User key={u.id} {...u} isLoaded={users !== []} subscriptionProcess={subscriptionProcess}/>)}
                {totalCount
                    ? <Paginator totalUsers={totalCount} portionSize={page} changeCurrentPage={setCountValue}/>
                    : <Preloader/>}
            </div>
        </WithAuth>
    );
};

interface IUserProps extends IUser {
    subscriptionProcess: number[]
    isLoaded: boolean
}

const User: React.FC<IUserProps> = props => {

    const {
        id,
        name,
        status,
        photos,
        followed,
        subscriptionProcess,
        isLoaded
    } = props

    const dispatch = useDispatch()
    const isDisabled = subscriptionProcess.some(i => i === id)

    const subscribe = () => {
        dispatch(subscribeToUser(id))
    }

    const unsubscribe = () => {
        dispatch(unsubscribeFromUser(id))
    }

    return (
        <div style={{width: '100%'}}>
            <Card style={{margin: '10px 0'}}
                actions={[
                    <Link to={`/profile/${id}`}>Profile<UserOutlined/></Link>,
                    <EditOutlined key="edit"/>,
                    <>
                        {
                            followed
                                ? <Button onClick={unsubscribe} disabled={isDisabled}>Unsubscribe</Button>
                                : <Button onClick={subscribe} disabled={isDisabled}>Subscribe</Button>
                        }
                    </>
                ]}
            >
                <Skeleton loading={!isLoaded} avatar active>
                    <Meta
                        avatar={<Avatar src={photos.small || "https://joeschmoe.io/api/v1/random"}/>}
                        title={name}
                        description={status || '...'}
                    />
                </Skeleton>
            </Card>
        </div>
    )
}