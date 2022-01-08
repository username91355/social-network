import React, {useCallback, useEffect} from 'react'
import {WithAuth} from '../../auxiliary-components/WithAuth'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from '../../state/reducers/users-reducer'
import {TAppState} from '../../state/store'
import {SearchArea} from '../../components/search/Search'
import {Radio, RadioChangeEvent} from 'antd'
import {Preloader} from '../../components/preloader/Preloader'
import {Paginator} from '../../components/paginator/Paginator'
import {User} from './user/User'

const Users = React.memo(() => {

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

    const filterUserListHandler = useCallback((e: RadioChangeEvent) => {
        if (e.target.value === 'friends') {
            setUserListFilter(true)
        } else if (e.target.value === 'users') {
            setUserListFilter(false)
        } else {
            setUserListFilter(null)
        }
    },[])

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
                {users.map(u => <User key={u.id} {...u} isLoaded={users !== []}
                                      subscriptionProcess={subscriptionProcess}/>)}
                {totalCount
                    ? <Paginator totalUsers={totalCount} portionSize={page} changeCurrentPage={setCountValue}/>
                    : <Preloader/>}
            </div>
        </WithAuth>
    )
})

export default Users

