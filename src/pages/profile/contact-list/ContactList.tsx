import React from 'react'

interface IProps {
    contacts: TContacts
}

type TContacts = {
    [key: string]: string | null
}

export const ContactList: React.FC<IProps> = React.memo(props => {

    const {
        contacts
    } = props

    if (!contacts) {
        return null
    }

    return (
        <div>
            <h3 style={{color: '#f0f2f5'}}>Contacts</h3>
            {
                Object.keys(contacts).map(key =>
                    <Contact key={key} title={key}
                             value={contacts[key]}/>)
            }
        </div>
    )
})

interface IPropsContact {
    title: string
    value: string | null
}

const Contact: React.FC<IPropsContact> = React.memo(props => {
    const {title, value} = props
    return <div><b>{title}:</b> {value ? <a href={value}>{value}</a> : ' ...'}</div>
})