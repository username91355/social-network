import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import styles from './Bio.module.css'
import {IProfile} from '../../../api/api'
import {useParams} from "react-router-dom";
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {
    changeProfileAvatar,
    getUserFriendStatus,
    setCurrentProfileFriendStatus
} from "../../../state/reducers/profile-reducer";
import {Info} from './info/Info';
import {EditModeInfo} from './edit-mode-info/EditModeInfo';
import {subscribeToUser, unsubscribeFromUser} from "../../../state/reducers/users-reducer";

interface IProps {
    profile: IProfile
    profileStatus: string | null
    changeUserStatus: (value: string) => void
    isFriend: boolean
    subscriptionProcess: number[]
}

export const Bio: React.FC<IProps> = React.memo(props => {

    const {
        profile,
        profileStatus,
        changeUserStatus,
        isFriend,
        subscriptionProcess
    } = props

    const dispatch = useDispatch()
    const params = useParams()
    const [settingsMode, setSettingsMode] = useState<boolean>(false)
    const [bioSettingsMode, setBioSettingsMode] = useState<boolean>(false)
    const userId: number | null = Number(params.userId)

    useEffect(() => {
        if (userId && userId !== profile.userId) {
            dispatch(getUserFriendStatus(userId))
        }
    }, [userId, profile.userId, isFriend])

    const changeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch(changeProfileAvatar(e.target.files[0], profile.userId))
        }
    }

    const subscribe = useCallback(() => {
        dispatch(subscribeToUser(userId))
        dispatch(setCurrentProfileFriendStatus(true))
    }, [])

    const unsubscribe = useCallback(() => {
        dispatch(unsubscribeFromUser(userId))
        dispatch(setCurrentProfileFriendStatus(false))
    }, [])

    const isDisabled = subscriptionProcess.some(i => i === userId)

    return (
        <div className={styles.profile__bio}>
            <div className={styles.profile__bio_avaAndSettingsSection}>
                <img className={styles.profile__bio_img}
                     src={profile.photos.large || 'https://joeschmoe.io/api/v1/random'}
                     alt='photo'/>
                {!userId &&
                <Button style={{width: '100%'}} onClick={() => setSettingsMode(!settingsMode)}>Edit profile</Button>}
                {settingsMode && <div className={styles.profile__bio_settingsBlock}>
                    <div>Change profile image:</div>
                    <Input size={'small'}
                           className={styles.profile__bio_settingsBlock_img}
                           onChange={changeProfileImage}
                           type={'file'}
                    />
                    <div>Edit profile info:</div>
                    <Button onClick={() => setBioSettingsMode(!bioSettingsMode)}
                            size={'small'}
                            style={{fontSize: '10px', width: '100%'}}
                            disabled={bioSettingsMode}>Edit profile info</Button>
                </div>}
                {userId
                    ? <Button style={{width: '100%'}}
                              disabled={isDisabled}
                              onClick={isFriend
                                  ? unsubscribe
                                  : subscribe}>
                        {isFriend
                            ? 'Unsubscribe'
                            : 'Subscribe'}</Button>
                    : null}
            </div>
            {
                bioSettingsMode
                    ? <EditModeInfo setBioSettingsMode={setBioSettingsMode} profile={profile}/>
                    : <Info profile={profile}
                            profileStatus={profileStatus}
                            changeUserStatus={changeUserStatus}/>
            }
        </div>
    )
})
