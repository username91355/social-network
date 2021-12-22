import React from 'react';
import WithAuth from "../../hoc/WithAuth";

const Profile = () => {
    return (
        <WithAuth>
            <div>
                Profile
            </div>
        </WithAuth>
    );
};

export default Profile;