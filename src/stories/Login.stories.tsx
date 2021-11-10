import React, {useState} from 'react';
import {Login,LoginPropsType} from "../components/common/Login/Login";
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Common component/Login',
    component: Login,
}

const Template: Story<LoginPropsType> = (args) => <Login {...args} />;

const clickOnSignInButton = action('Click Sign in')
const clickOnSignUpButton = action('Click Sign up')
const clickOnLogOut =  action('Log out')

export const registeredUser = Template.bind({});
registeredUser.args = {
    registeredUser: true,
    logOutClickHandler: clickOnLogOut
};

export const notRegisteredUser = Template.bind({});
notRegisteredUser.args = {
    registeredUser: false,
    signInClickHandler: clickOnSignInButton,
    signUpClickHandler: clickOnSignUpButton
};

export const ActionRegisteredUser: Story<LoginPropsType> = () => {

    const [registeredUser, setRegisteredUser] = useState(false)

    return (
        <Login registeredUser={registeredUser}
               signInClickHandler={()=>setRegisteredUser(true)}
               signUpClickHandler={()=>{}}
               logOutClickHandler={()=>setRegisteredUser(false)}/>
    )
};

