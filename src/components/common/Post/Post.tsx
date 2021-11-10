import React from "react"
import styles from "./Post.module.css"
import avatar from './../../../assets/img/ava.png'
import {IconButton} from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';

export type PostPropsType = {
    id: number
    author: string,
    text: string
    likes: number
    comments: number
    removePost: (id: number) => void
}

export const Post: React.FC<PostPropsType> = ({id,author, text, likes, comments, removePost}) => {

    const deletePost = () => {
        removePost(id)
    }

    return (
        <div className={styles.post__wrapper}>
            <div className={styles.post__author}>
                <img className={styles.post__author_img} src={avatar}/>
            </div>
            <div>
                <div className={styles.post__text}>
                    <div className={styles.post__header}>
                        <p className={styles.post__author_name}>{author}</p>
                        <IconButton className={styles.post__delete_button}
                                    size="small"
                                    style={{color: 'lightgray', marginLeft: 'auto'}}
                                    onClick={deletePost}>
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                    {text}
                </div>
                <div className={styles.post__counts}>
                    <IconButton size="small">
                        <ThumbUpAltIcon fontSize="inherit" color={'primary'}/>{likes}
                    </IconButton>
                    <IconButton size="small">
                        <CommentIcon fontSize="inherit" color={'primary'}/>{comments}
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
