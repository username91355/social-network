import React from "react";

interface IProps {
    contacts: TContacts
}

type TContacts = {
    [key: string]: string | null
}

export const ContactList: React.FC<IProps> = props => {

    const {
        contacts
    } = props

    if (!contacts) {
        return null
    }

    return (
        <div>
            <b>Contacts</b>
            {
                Object.keys(contacts).map(key =>
                    <Contact key={key} title={key}
                             value={contacts[key]}/>)
            }
        </div>
    )
}

interface IPropsContact {
    title: string
    value: string | null
}

const Contact: React.FC<IPropsContact> = props => {
    const {title, value} = props
    return <div><b>{title}</b>{value}</div>
}