import React from 'react'
import {useForm} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../state/reducers/app-reducer'
import {TAppState} from '../../state/store'
import styles from './Login.module.css'

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
        <div className={styles.login__wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
                <div>
                    <p>
                        Enter the test account details: <br/>
                        Email: free@samuraijs.com <br/>
                        Password: free
                    </p>
                </div>
                <div>
                    <input {...register('email', {required: true})} type='email' placeholder={'*email'}/>
                    {errors.email && <span>This field email is required</span>}
                </div>
                <div>
                    <input {...register('password', {required: true})} type='password' placeholder={'*password'}/>
                    {errors.password && <span>This field password is required</span>}
                </div>
                <div>
                    <label>
                        <input {...register('rememberMe')} type='checkbox'/>
                        <span> Remember me</span>
                    </label>
                </div>
                {captchaUrl && <div>
                            <img src={captchaUrl} alt="captchaUrl"/>
                            <input {...register('captcha')}/>
                        </div>}
                <div className={styles.login__btn_container}>
                    <input className={styles.login__btn} type='submit'/>
                </div>
            </form>
        </div>
    )
})