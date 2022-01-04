import React from 'react'
import styles from './Bio.module.css'
import {EditableSpan} from '../../../components/editeble-span/EditableSpan'
import {IProfile} from '../../../api/api'

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

    return (
        <div className={styles.profile__bio}>
            <img className={styles.profile__bio_img}
                 src={profile.photos.large || 'https://joeschmoe.io/api/v1/random'}
                 alt='photo'/>
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
            </div>
        </div>
    )
})