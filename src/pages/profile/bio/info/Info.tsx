import React from "react";
import styles from "./Info.module.css";
import {EditableSpan} from "../../../../components/editeble-span/EditableSpan";
import {ContactList} from "../../contact-list/ContactList";
import {IProfile} from "../../../../api/api";

interface IProps {
    profile: IProfile
    profileStatus: string | null
    changeUserStatus: (value: string) => void
}

export const Info: React.FC<IProps> = props => {

    const {
        profile,
        profileStatus,
        changeUserStatus
    } = props

    return (
        <div className={styles.info__wrapper}>
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