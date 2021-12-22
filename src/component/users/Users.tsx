import React, {useEffect} from 'react';
import WithAuth from "../../hoc/WithAuth";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../data/redux";
import {usersInitialization} from "../../data/reducers/users-reducer";
import {useForm} from "react-hook-form";
import Preloader from "../common/preloader/Preloader";

type Inputs = {
    search: string
};

const Users = () => {

    const { register, handleSubmit, formState: { errors }, reset} = useForm<Inputs>();

    const dispatch = useDispatch()
    const {count, page, term, friend, users} = useSelector((state: AppStateType) => state.users)

    useEffect(()=> {
        dispatch(usersInitialization(count,page,term,friend))
    }, [count,page,term,friend,dispatch])

    const onSubmitSearch = (data: Inputs) => {
        dispatch(usersInitialization(count,page,data.search,friend))
        reset()
    }
    const filter = (filter: boolean | null) => {
        dispatch(usersInitialization(count,page,term,filter))
    }

    if(!users) <Preloader />
    return (
        <WithAuth>
            <div>
                <form onSubmit={handleSubmit(onSubmitSearch)}>
                    <input type={'search'} {...register('search',{ required: true })}/>
                    {errors.search && 'Field is required'}
                    <input type={'submit'}/>
                </form>
                <button onClick={()=>filter(false)}>Users</button>
                <button onClick={()=>filter(true)}>Friends</button>
                <button onClick={()=>filter(null)}>All</button>
                <div>{
                    users.map((i: any)=> {
                        return <div key={i.id}>
                            <span>{i.name}</span>
                        </div>
                    })
                }</div>
            </div>
        </WithAuth>
    );
};

export default Users;