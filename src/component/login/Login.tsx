import React from "react";
import {SubmitHandler, useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "../../data/reducers/auth-reducer";

type Inputs = {
    email: string,
    password: string,
    rememberMe: boolean,
};

export const Login = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        const {email,password,rememberMe} = data
        dispatch(login(email, password, rememberMe))
        reset()
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