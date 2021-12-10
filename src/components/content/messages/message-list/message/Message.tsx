import React from 'react';
import IncomingMessage from './incoming-message/IncomingMessage';
import OutgoingMessage from './outgoing-message/OutgoingMessage';
import {TUser} from "../../../../../redux/reducers/messages-reducer";

export type TProps = {
    outgoing: boolean
    message: string
    authUserPhoto: string
    authUserName: string
    interlocutors: Array<TUser>
}

const Message: React.FC<TProps> = props => {

    const {
        outgoing,
        message,
        authUserPhoto,
        authUserName,
        interlocutors,
    } = props

    return (
        <>
            {outgoing
                ? <OutgoingMessage message={message}
                                   authUserName={authUserName}
                                   authUserPhoto={authUserPhoto}/>
                : <IncomingMessage message={message}
                                   interlocutors={interlocutors}/>}
        </>
    );
};

export default Message;