import {IUser} from '../../../api/api'
import React, { useCallback } from 'react'
import {useDispatch} from 'react-redux'
import {subscribeToUser, unsubscribeFromUser} from '../../../state/reducers/users-reducer'
import {Button, Card, Skeleton} from 'antd'
import {Link} from 'react-router-dom'
import {EditOutlined, UserOutlined} from '@ant-design/icons/lib/icons'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'

interface IUserProps extends IUser {
    subscriptionProcess: number[]
    isLoaded: boolean
}

export const User: React.FC<IUserProps> = React.memo(props => {

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

    const subscribe = useCallback(() => {
        dispatch(subscribeToUser(id))
    },[])

    const unsubscribe = useCallback(() => {
        dispatch(unsubscribeFromUser(id))
    },[])

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
})