import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import React, {useEffect} from 'react';
import {getProfileTC, TProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import Profile from "./Profile";


type TProps = TMSTProps & TMDTProps

type TMSTProps = {
    profile: TProfile
    status: string
    authUserID: number
}

type TMDTProps = {
    getProfileTC: (userId: number) => void
}

//const ProfileMemo = React.memo(Profile)

const ProfileContainer = React.memo((props: TProps) => {

    const {
        profile,
        authUserID,
        getProfileTC
    } = props

    const params = useParams()

    useEffect(() => {
        const userID = params.userID

        if (!userID) {
            getProfileTC(authUserID)
        } else {
            getProfileTC(+userID)
        }
    }, [getProfileTC, authUserID, params.userID])

    return <>
        <Profile profile={profile} status={'status'}/>
    </>
})

const mapStateToProps = (state: AppStateType): TMSTProps => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        authUserID: state.auth.id
    }
}

export default connect(mapStateToProps, {
    getProfileTC
})(ProfileContainer)