import {IProfile} from "../../../../api/api";
import React from "react";
import styles from './EditModeInfo.module.css'
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {changeProfileInfo} from "../../../../state/reducers/profile-reducer";

interface IProps {
    setBioSettingsMode: (value: boolean) => void
    profile: IProfile
}

export const EditModeInfo: React.FC<IProps> = props => {

    const dispatch = useDispatch()
    const {setBioSettingsMode, profile} = props
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            ...profile,
            contacts: {
                ...profile.contacts
            }
        }
    })

    const onSubmit = (data: any) => {
        let fullData = {
            ...profile,
            ...data
        }
        dispatch(changeProfileInfo(fullData))
    }

    return (
        <div className={styles.infoEditMode__wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.infoEditMode__form}>
                <b>Full name</b>
                <input {...register('fullName')}/>
                {errors.fullName && <span>This field email is required</span>}

                <b>Work status: </b>
                <input type={'checkbox'} {...register('lookingForAJob')}/>

                <b>Looking for a job description: </b>
                <input {...register('lookingForAJobDescription')}/>

                <b>About me: </b>
                <input {...register('aboutMe')}/>

                <b>Contacts: </b>
                <div className={styles.infoEditMode__contacts}>
                    {Object.keys(profile.contacts).map(i => {
                        return <div key={i} className={styles.infoEditMode__contact}>
                            <b>{i}:</b>
                            {/*//@ts-ignore*/}
                            <input {...register(`contacts.${i}`)}/>
                        </div>
                    })}
                </div>
                <div/><hr/>
                <div/>
                <div className={styles.infoEditMode__btn_box}>
                    <button className={styles.infoEditMode__btn}>Save changes</button>
                    <button type={'button'} className={styles.infoEditMode__btn}
                            onClick={() => setBioSettingsMode(false)}>Close settings</button>
                </div>
            </form>

        </div>
    )
}
