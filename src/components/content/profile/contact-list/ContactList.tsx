import React from "react";
import styles from "../Profile.module.css";
import {TContacts} from "../../../../data/profile-reducer";
import Contact from "./сontact/Contact";


type TProps = {
    contacts: TContacts
}

const ContactList: React.FC<TProps> = props => {

    const {
        contacts
    } = props

    if (!contacts) {
        return null
    }

    return (
        <div className={styles.profile_contacts_container}>
            <b>Contacts</b>
            <ul className={styles.profile_contacts_list}>
                {
                    Object.keys(contacts).map(key =>
                        <Contact key={key}
                                 title={key}
                                 value={contacts[key]}/>)
                }
            </ul>
        </div>
    )
}

export default ContactList