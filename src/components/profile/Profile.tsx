import React, {ChangeEvent, useState} from 'react'
import avatar from '../../assets/img/avatar.png'
import styles from './Profile.module.css'
import {TProfile} from '../../redux/profile-reducer'
import Preloader from "../common/preloader/Preloader";
import ContactList from './contact-list/ContactList';

type TProps = {
    profile: TProfile
    status: string
    setStatus: (status: string) => void
}

const Profile: React.FC<TProps> = props => {
    console.log('Profile')
    const {
        profile,
        status,
        setStatus,
    } = props

    const [statusEditMode, setStatusEditMode] = useState<boolean>(false)
    const [localStatus, setLocalStatus] = useState<string>(status)

    if (!profile) {
        return <Preloader/>
    }

    const setStatusEditModeOnDBC = () => {
        setStatusEditMode(!statusEditMode)
    }

    const changeStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    const setNewStatus = () => {
        setStatusEditMode(!statusEditMode)
        setStatus(localStatus)
    }

    return (
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_img_container}>
                <img className={styles.profile_img} src={profile.photos.large
                    ? profile.photos.large
                    : avatar} alt="avatar"/>
                <div className={styles.profile_status} onDoubleClick={setStatusEditModeOnDBC}>
                    {
                        statusEditMode
                            ? <input type="text"
                                     value={localStatus}
                                     onChange={changeStatusInput}
                                     onBlur={setNewStatus}/>
                            : <span>{status ? status : 'Set status'}</span>
                    }
                </div>
            </div>
            <div className={styles.profile_info}>
                <div className={styles.profile_bio_container_fullName}>{profile.fullName}</div>
                <div className={styles.profile_bio_container}>
                    <b>Job status</b>
                    <div>{profile.lookingForAJob
                        ? "Locking for a job"
                        : false}
                    </div>
                    <div>{profile.lookingForAJobDescription}</div>
                    <b>About me</b>
                    <div>{profile.aboutMe}</div>
                </div>
                <ContactList contacts={profile.contacts}/>
            </div>
        </div>
    );
};

export default Profile;