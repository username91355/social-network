import React, {useCallback, useEffect} from 'react'
import styles from './Profile.module.css'
import {WithAuth} from '../../auxiliary-components/WithAuth'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, useParams} from 'react-router-dom'
import {Preloader} from '../../components/preloader/Preloader'
import {Post} from './post/Post'
import {Bio} from './bio/Bio'
import {EnterTextForm} from '../../components/enter-text-form/EnterTextForm'
import {
    addPost,
    changeNewPostText,
    changeStatus,
    profileInitialization,
    ProfileStatus
} from '../../state/reducers/profile-reducer'

export const Profile: React.FC = React.memo(() => {

    const
        dispatch = useDispatch(),
        navigate = useNavigate(),
        params = useParams(),
        id = useSelector((state: any) => state.app.id),
        profile = useSelector((state: any) => state.profile.profile),
        profileStatus = useSelector((state: any) => state.profile.status),
        profileInitStatus = useSelector((state: any) => state.profile.profileStatus),
        posts = useSelector((state: any) => state.profile.posts),
        newPostText = useSelector((state: any) => state.profile.newPostText)

    let userId: number | null = Number(params.userId)

    if (!userId) {
        userId = id
    }

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        } else if (userId) {
            dispatch(profileInitialization(userId))
        }
    }, [dispatch, userId])

    const changeUserStatus = useCallback((value: string) => {
        if (profileStatus !== value) {
            dispatch(changeStatus(value))
        } else {
            return
        }
    }, [])

    const changeNewPostArea = useCallback((value: string) => {
        dispatch(changeNewPostText(value))
    }, [])

    const addNewPost = useCallback(() => {
        dispatch(addPost())
    }, [])

    return (
        <WithAuth>
            {(profileInitStatus === ProfileStatus.IDLE || profileInitStatus === ProfileStatus.LOADING || !profile)
                ? <Preloader/>
                : <div className={styles.profile__wrapper}>
                    <div>
                        <Bio profile={profile}
                             profileStatus={profileStatus}
                             changeUserStatus={changeUserStatus}/>
                        <hr/>
                        <EnterTextForm title={'Add post'}
                                       value={newPostText}
                                       label={'New post'}
                                       onChange={changeNewPostArea}
                                       send={addNewPost}/>
                        {profile.userId === id && posts.map((i: any) => {
                            return <Post key={i.id} id={i.id} text={i.text} postLikes={i.likes}
                                         postComment={i.comment}/>
                        })}
                    </div>
                </div>
            }
        </WithAuth>
    )
})