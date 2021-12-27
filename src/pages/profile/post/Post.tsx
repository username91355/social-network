import React, {useState} from "react";
import {Comment, Tooltip} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

interface IProps {
    text: string
    postLikes: number
    postComment: number
}

export const Post: React.FC<IProps> = props => {

    const {text, postLikes, postComment} = props
    const [likes, setLikes] = useState(postLikes);
    const [likeThisPost, setLikeThisPost] = useState(false)
    const [action, setAction] = useState<null | string>(null);

    const like = () => {
        if(!likeThisPost) {
            setLikes(likes + 1);
            setAction('liked');
            setLikeThisPost(true)
        } else {
            setLikes(likes - 1);
            setAction(null);
            setLikeThisPost(false)
        }

    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Comment">
      <span>
        <CommentOutlined/>
          <span className="comment-action">{postComment}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <Comment style={{margin: '10px 10px', backgroundColor: 'white', color: 'black'}}
                 actions={actions}
                 author={<a>{'BDmitriy'}</a>}
                 avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="avatar"/>}
                 content={<p>{text}</p>}
        />
    );
};