import React, {ChangeEvent, useState} from 'react'
import styles from './Bio.module.css'
import {EditableSpan} from '../../../components/editeble-span/EditableSpan'
import {IProfile} from '../../../api/api'
import {ContactList} from "../contact-list/ContactList";
import {useParams} from "react-router-dom";
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {changeProfileAvatar, changeProfileInfo} from "../../../state/reducers/profile-reducer";
import {useForm} from "react-hook-form";

interface IProps {
    profile: IProfile
    profileStatus: string | null
    changeUserStatus: (value: string) => void
}

export const Bio: React.FC<IProps> = React.memo(props => {

    const {
        profile,
        profileStatus,
        changeUserStatus
    } = props

    const dispatch = useDispatch()
    const params = useParams()
    const [settingsMode, setSettingsMode] = useState<boolean>(false)
    const [bioSettingsMode, setBioSettingsMode] = useState<boolean>(false)
    const userId: number | null = Number(params.userId)
    const changeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch(changeProfileAvatar(e.target.files[0]))
        }
    }

    return (
        <div className={styles.profile__bio}>
            <div className={styles.profile__bio_avaAndSettingsSection}>
                <img className={styles.profile__bio_img}
                     src={profile.photos.large || 'https://joeschmoe.io/api/v1/random'}
                     alt='photo'/>
                {!userId && <Button onClick={() => setSettingsMode(!settingsMode)}>Edit profile</Button>}
                {settingsMode && <div>
                    Change profile image:
                    <Input size={'small'}
                           style={{fontSize: '10px', cursor: 'pointer'}}
                           onChange={changeProfileImage}
                           type={'file'}/>
                    Edit profile info:
                    <Button onClick={() => setBioSettingsMode(!bioSettingsMode)}
                            size={'small'}
                            style={{fontSize: '10px'}}
                            disabled={bioSettingsMode}>Edit profile info</Button>
                </div>}
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

interface IEditModeBIOInfo {
    setBioSettingsMode: (value: boolean) => void
    profile: IProfile
}

const EditModeInfo: React.FC<IEditModeBIOInfo> = props => {

    const dispatch = useDispatch()
    const {setBioSettingsMode, profile} = props
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            ...profile,
            contacts: {
                ...profile.contacts
            }
        }
    })

    const onSubmit = (data: any) => {
        let fullData = {
            ...profile,
            ...data
        }
        console.log(fullData)
        dispatch(changeProfileInfo(fullData))
    }

    return (
        <div className={styles.profile__bio_info}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <b>Full name</b><input {...register('fullName')}/>
                    {errors.fullName && <span>This field email is required</span>}
                </div>
                <div>
                    <b>Work status: </b> <input type={'checkbox'} {...register('lookingForAJob')}/>
                </div>
                <div>
                    <b>Looking for a job description: </b><input {...register('lookingForAJobDescription')}/>
                </div>
                <div>
                    <b>About me: </b><input {...register('aboutMe')}/>
                </div>
                <div>
                    <b>Contacts: </b>
                    {Object.keys(profile.contacts).map(i => {
                        return <div key={i}>
                            <b>{i}:</b>
                            {/*//@ts-ignore*/}
                            <input {...register(`contacts.${i}`)}/>
                        </div>
                    })}
                </div>
                <button>Save</button>
            </form>
            <button onClick={() => setBioSettingsMode(false)}>Close</button>
        </div>
    )
}

const Info: React.FC<IProps> = props => {

    const {
        profile,
        profileStatus,
        changeUserStatus
    } = props

    return (
        <div className={styles.profile__bio_info}>
            <h2>{profile?.fullName}</h2>
            <EditableSpan profileStatus={profileStatus} changeUserStatus={changeUserStatus}/>
            <hr/>
            <div>
                <b>Work status: </b>
                {profile?.lookingForAJob ? 'Looking for a job' : 'Working'}
            </div>
            <div>
                <b>Looking for a job description: </b>
                {profile?.lookingForAJobDescription || ' ...'}
            </div>
            <div>
                <b>About me: </b>
                {profile?.aboutMe || ' ...'}
            </div>
            <ContactList contacts={profile?.contacts}/>
        </div>
    )
}