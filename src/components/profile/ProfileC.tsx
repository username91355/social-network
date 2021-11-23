import {connect} from "react-redux";
import Profile from "./Profile";
import {AppStateType} from "../../redux/store";
import {getProfileTC} from "../../redux/profile-reducer";
import React, {useEffect} from 'react';
import {compose} from "redux";
import {useParams} from "react-router-dom";

const ProfileAuthCont: React.FC<any> = ({profile, status, getProfileTC, isAuth, authUserID}) => {
    return <>
        {
            (!isAuth)
                ? <div>Loding...</div>
                : <ProfileContainer profile={profile}
                                    status={status}
                                    isAuth={isAuth}
                                    getProfileTC={getProfileTC}
                                    authUserID={authUserID}
                />
        }
    </>
}


const ProfileContainer: React.FC<any> = ({profile, status, getProfileTC, isAuth, authUserID}) => {

    const params = useParams()

    useEffect(() => {
        const userID = params.userID
        console.log('useEffect from PC')

        if (!profile) {
            getProfileTC(authUserID)
        }

        if (!userID) {
            getProfileTC(authUserID)
        } else {
            getProfileTC(userID)
        }

    }, [params, authUserID])

    if (!isAuth) {
        return <div>Loading...</div>
    }

    return <>
        <Profile profile={profile} status={status} isAuth={isAuth} authUserID={authUserID}/>
    </>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        isAuth: state.auth.isAuth,
        authUserID: state.auth.id
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfileTC
    })
)(ProfileAuthCont)