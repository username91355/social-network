import React, {useEffect} from 'react';
import {WithAuth} from "../../WithAuth";
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../state/store";
import {changeStatus, profileInitialization, ProfileStatus} from "../../state/reducers/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../../components/preloader/Preloader";
import {EditableSpan} from "../../components/editeble-span/EditableSpan";
import {ContactList} from './contact-list/ContactList';
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Post} from './post/Post';

export const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const id = useSelector((state: TAppState) => state.app.id)
    const profile = useSelector((state: TAppState) => state.profile.profile)
    const profileStatus = useSelector((state: TAppState) => state.profile.status)
    const profileInitStatus = useSelector((state: TAppState) => state.profile.profileStatus)
    const posts = useSelector((state: TAppState) => state.profile.posts)


    let userId: number | null = Number(params.userId)
    if (!userId) {
        userId = id
        if (!userId) {
            navigate('/login')
        }
    }

    useEffect(() => {


        if (userId) {
            dispatch(profileInitialization(userId))
        }
    }, [dispatch, userId])

    const changeUserStatus = (value: string) => {
        if (profileStatus !== value) {
            dispatch(changeStatus(value))
        } else {
            return
        }
    }
    if (!profile) return <Preloader/>
    return (
        <WithAuth>
            <div style={{color: '#f0f2f5'}}>{(profileInitStatus === ProfileStatus.IDLE || profileInitStatus === ProfileStatus.LOADING)
                ? <Preloader/>
                : <div >
                    <div style={{display: 'flex'}}>
                        <img style={{width: '150px', borderRadius: '50%'}}
                             src={profile.photos.large || "https://joeschmoe.io/api/v1/random"}/>
                        <div>
                            <div><h2 style={{color: '#f0f2f5'}}>{profile?.fullName}</h2></div>
                            <EditableSpan profileStatus={profileStatus} changeUserStatus={changeUserStatus}/>
                            <div>{profile?.lookingForAJob}</div>
                            <div>{profile?.lookingForAJobDescription}</div>
                            <div>{profile?.aboutMe}</div>
                        </div>
                    </div>
                    <ContactList contacts={profile?.contacts}/>
                        <Form>
                            <Form.Item>
                                <TextArea rows={4} onChange={()=>{}} value={'value'}/>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" onClick={()=>{}} type="primary">
                                    Add Post
                                </Button>
                            </Form.Item>
                        </Form>
                    {profile.userId === id && posts.map(i => {
                        return <Post key={i.id} text={i.text} postLikes={i.likes} postComment={i.comment}/>
                    })}
                </div>
            }</div>
        </WithAuth>
    );
};

