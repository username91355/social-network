import React from "react";
import {SubmitHandler, useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "../../data/reducers/auth-reducer";
import {useLocation, useNavigate} from "react-router-dom";


type Inputs = {
    email: string,
    password: string,
    rememberMe: boolean,
};

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const path: string = (typeof location.state === 'string') ? location.state : '/'

    const { register, handleSubmit, formState: { errors }, reset} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        const {email,password,rememberMe} = data
        dispatch(login(email, password, rememberMe))
        reset()
        navigate(path)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'email'}
                       {...register('email', { required: true })}/>
                <input type={'password'}
                       {...register('password',{ required: true })}/>
                <input type={'checkbox'}
                       {...register('rememberMe')}/>
                {errors.email && <span>This field is required</span>}
                <input type={'submit'}/>
            </form>
        </div>
    )
}