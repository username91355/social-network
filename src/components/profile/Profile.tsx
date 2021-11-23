import React from 'react';
import avatar from '../../assets/img/avatar.png'
import styles from './Profile.module.css'


const Profile: React.FC<any> = props => {

    console.log('Profile warm ')

    const {
        profile,
        status,
    } = props

    if(!profile) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className={styles.profile_img_container}>
                <img className={styles.profile_img} src={profile.photos.large ? profile.photos.large : avatar} alt="avatar"/>
            </div>
            <div className={styles.profile_bio_container}>
                <h2>{profile.fullName ? profile.fullName : 'name'}</h2>
                <p>{status}</p>
                <div>{profile.lookingForAJob ? 'Look for a job' : 'I do not consider job offers'}</div>
                <div>{profile.lookingForAJobDescription}</div>
            </div>
            <div>
                { Object.keys(profile.contacts).map( key => {
                    return (
                        <div key={key}><b>{key}</b>: {profile.contacts[key]}</div>
                    )
                })}
            </div>
        </div>
    );
};

export default Profile;

// {
//     "aboutMe": "I love dogs, guns and pencils.",
//     "contacts": {
//         "facebook": "http://facebook.com",
//         "website": "http://realjohnwick.com",
//         "vk": null,
//         "twitter": null,
//         "instagram": null,
//         "youtube": null,
//         "github": "https://github.com/username1",
//         "mainLink": null
// },
//     "lookingForAJob": true,
//     "lookingForAJobDescription": "I have many talents.",
//     "fullName": "John Wick",
//     "userId": 19850,
//     "photos": {
//         "small": "https://social-network.samuraijs.com/activecontent/images/users/19850/user-small.jpg?v=3",
//         "large": "https://social-network.samuraijs.com/activecontent/images/users/19850/user.jpg?v=3"
// }
// }