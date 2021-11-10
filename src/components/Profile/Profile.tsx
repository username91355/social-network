import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './Profile.module.css'
import avatar from './../../assets/img/ava.png'
import {Post} from "../common/Post/Post";
import {Button, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {ContactsType, UserDataType} from "../../redux/reducers/profileReducer";

type PostType = {
    id: number
    author: string
    text: string
    likes: number
    comments: number
}

type ProfilePropsType = {
    posts: Array<PostType>
    userData: UserDataType
    newPostAreaValue: string
    addPost: () => void
    removePost: (id: number) => void
    changePostTextArea: (text: string) => void
}

export const Profile: React.FC<ProfilePropsType> = ({
                                                        posts,
                                                        newPostAreaValue,
                                                        userData,
                                                        addPost,
                                                        removePost,
                                                        changePostTextArea
                                                    }) => {

    const onClickAddNewPost = () => {
        addPost()
    }

    const onKeyPressAddNewPost = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addPost()
        }
    }

    const onChangeNewPostTextArea = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        changePostTextArea(e.currentTarget.value)
    }

    return (
        <div className={styles.profile__wrapper}>
            <div className={styles.profile__info}>
                <div>
                    {(userData.userId)
                        ? <img className={styles.profile__avatar} src={`${userData.photos.large}`}/>
                        : <img className={styles.profile__avatar} src={avatar}/>}
                </div>

                <div className={styles.profile__info_text_block}>
                    <div className={styles.profile__info_text_name}>
                        {userData.fullName}
                    </div>

                    <div>
                       <b>Status</b>
                    </div>

                    <div>
                       <b>Looking for a job status</b>: {(userData.lookingForAJob) ? 'Looking for a job' : 'Working'}
                    </div>

                    <div>
                        My skills description
                        {userData.lookingForAJobDescription}
                    </div>

                    <div>
                        <b>Contacts</b>
                        <Contacts contacts={userData.contacts}/>
                    </div>
                </div>
            </div>

            <div className={styles.profile__newPost}>
                <TextField className={styles.profile__newPost_textField}
                           label="New post"
                           value={newPostAreaValue}
                           onKeyDown={onKeyPressAddNewPost}
                           onChange={onChangeNewPostTextArea}
                           variant="outlined"/>
                <Button variant="contained"
                        endIcon={<AddCircleOutlineIcon/>}
                        onClick={onClickAddNewPost}>Add Post</Button>
            </div>
            <div>
                {posts.map(p => {
                    return (
                        <Post id={p.id}
                              author={p.author}
                              text={p.text}
                              likes={p.likes}
                              comments={p.comments}
                              removePost={removePost}
                        />
                    )
                })}
            </div>
        </div>
    );
}


type ContactsPropsType = {
    contacts: ContactsType
}

const Contacts: React.FC<ContactsPropsType> = ({contacts}) => {
    const contactsKeys = Object.keys(contacts)
    const contactsLocal: { [key: string]: string | null } = contacts

    return (
        <div>
            {contactsKeys.map((key) => {
                return <div><b>{key}</b>: {contactsLocal[key]}</div>
            })}
        </div>
    )
}