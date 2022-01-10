import React from 'react'
import {useForm} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../state/reducers/app-reducer'
import {TAppState} from "../../state/store";

export const Login = React.memo(() => {

    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const captchaUrl = useSelector((state: TAppState) => state.app.captchaUrl)

    const path: string = (typeof location.state === 'string') ? location.state : '/'

    const onSubmit = (data: any) => {
        const {email, password, rememberMe, captcha = null} = data
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
                {captchaUrl && <div>
                            <img src={captchaUrl} alt="captchaUrl"/>
                            <input {...register('captcha')}/>
                        </div>}
                <input type='submit'/>
            </form>
        </div>
    )
})