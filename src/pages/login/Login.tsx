import React from 'react';
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../state/reducers/app-reducer";

const Login = () => {

    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const path: string = (typeof location.state === 'string') ? location.state : '/'

    const onSubmit = (data: any) => {
        const {email, password, rememberMe} = data
        const captcha = false
        dispatch(login(email,password,rememberMe,captcha))
        reset()
        navigate(path)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', {required: true})} type='email'/>
                {errors.email && <span>This field email is required</span>}
                <input {...register('password', {required: true})} type='password'/>
                {errors.password && <span>This field password is required</span>}
                <input {...register('rememberMe')} type='checkbox'/>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default Login;