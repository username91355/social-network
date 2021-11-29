import React from 'react'
import avatar from '../../assets/img/avatar.png'
import styles from './Profile.module.css'
import {TProfile} from '../../redux/profile-reducer'

const Profile: React.FC<TProps> = props => {

    console.log('Profile')

    const {
        profile,
        status
    } = props

    if (!profile) {
        return <div>Login</div>
    }

    return (
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_img_container}>
                <img className={styles.profile_img} src={profile.photos.large
                    ? profile.photos.large
                    : avatar} alt="avatar"
                />
            </div>
            <div className={styles.profile_bio_container}>
                {status}
            </div>
            <div className={styles.profile_contacts_container}>

            </div>
        </div>
    );
};

type TProps = {
    profile: TProfile
    status: string
}

export default Profile;