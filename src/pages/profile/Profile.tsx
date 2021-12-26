import React, {useEffect} from 'react';
import {WithAuth} from "../../WithAuth";
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../state/store";
import {changeStatus, profileInitialization, ProfileStatus} from "../../state/reducers/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../../components/preloader/Preloader";
import {EditableSpan} from "../../components/editeble-span/EditableSpan";
import {ContactList} from './contact-list/ContactList';

export const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const id = useSelector((state: TAppState) => state.app.id)
    const profile = useSelector((state: TAppState) => state.profile.profile)
    const profileStatus = useSelector((state: TAppState) => state.profile.status)
    const profileInitStatus = useSelector((state: TAppState) => state.profile.profileStatus)

    useEffect(() => {
        let userId: number | null = params.userId
            ? parseInt(params.userId, 10)
            : null
        if (!userId) {
            userId = id
            if (!userId) {
                navigate('/login')
            }
        }

        if (userId) {
            dispatch(profileInitialization(userId))
        }
    }, [dispatch])

    const changeUserStatus = (value: string) => {
        if (profileStatus !== value) {
            dispatch(changeStatus(value))
        } else {
            return
        }
    }
    if (!profile) return <Preloader/>
    return (
        <WithAuth>
            <div>{(profileInitStatus === ProfileStatus.IDLE || profileInitStatus === ProfileStatus.LOADING || !profile)
                ? <Preloader/>
                : <div>
                    <img src={profile?.photos?.large || ''} alt='avatar'/>
                    <div>{profile?.fullName}</div>
                    <EditableSpan profileStatus={profileStatus} changeUserStatus={changeUserStatus}/>
                    <div>{profile?.lookingForAJob}</div>
                    <div>{profile?.lookingForAJobDescription}</div>
                    <div>{profile?.aboutMe}</div>
                    <ContactList contacts={profile?.contacts}/>
                </div>
            }</div>
        </WithAuth>
    );
};