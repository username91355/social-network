import React from 'react'
import {Story} from "@storybook/react"
import {Post, PostPropsType} from "../components/common/Post/Post"

export default {
    title: 'Common component/Post',
    component: Post,
}

const Template: Story<PostPropsType> = (args) => <Post {...args} />;

export const MyPost = Template.bind({})
MyPost.args = {
    author: 'Name',
    text: 'Test text post',
    likes: 2,
    comments: 3
}

export const LongPost = Template.bind({})
LongPost.args = {
    author: 'Alice',
    text: 'Consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
        'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
        'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
        'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 102,
    comments: 31
}

export const LongName = Template.bind({})
LongName.args = {
    author: 'Novuchadonosr',
    text: 'Consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    likes: 10,
    comments: 1
}


// export const ActionRegisteredUser: Story<PostPropsType> = () => {
//
//     const [registeredUser, setRegisteredUser] = useState(false)
//
//     return (
//         <Post />
//     )
// };
