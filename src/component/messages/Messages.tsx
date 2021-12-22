import React from 'react';
import WithAuth from "../../hoc/WithAuth";

const Messages = () => {
    return (
        <WithAuth>
            <div>
                Messages
            </div>
        </WithAuth>
    );
};

export default Messages;