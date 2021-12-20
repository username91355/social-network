import {connect} from "react-redux";
import {AppStateType} from "../../../data/store";
import React, {useEffect} from 'react';
import {getProfileTC, getStatusTC, setStatusTC, TProfile} from "../../../data/profile-reducer";
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
    getStatusTC: (userId: number) => void
    setStatusTC: (status: string) => void
}

const ProfileContainer = React.memo((props: TProps) => {

    const {
        profile,
        status,
        authUserID,
        getProfileTC,
        setStatusTC,
        getStatusTC
    } = props

    const params = useParams()

    useEffect(() => {
        const userID = params.userID

        if (!userID) {
            getProfileTC(authUserID)
            getStatusTC(authUserID)
        } else {
            getProfileTC(+userID)
            getStatusTC(+userID)
        }

    }, [getProfileTC, getStatusTC, authUserID, params.userID])

    return <>
        <Profile profile={profile}
                 status={status}
                 setStatus={setStatusTC}/>
    </>
})

const mapStateToProps = (state: AppStateType): TMSTProps => {
    return {
        //@ts-ignore
        profile: state.profile.profile,
        //@ts-ignore
        status: state.profile.status,
        authUserID: state.auth.id
    }
}

export default connect(mapStateToProps, {
    getProfileTC,
    setStatusTC,
    getStatusTC
})(ProfileContainer)
