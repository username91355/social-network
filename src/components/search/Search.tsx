import React from 'react';
import {useForm} from "react-hook-form";

interface IProps {
    submit: (value: string) => void
}

export const Search: React.FC<IProps> = props => {

    const {submit} = props
    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const onSubmit = (data: { search: string }) => {
        submit(data.search)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text"
                   {...register('search', {required: true})}
                   placeholder={'User name...'}/>
            {errors.search && <span>Search field is required</span>}
            <input type="submit"/>
        </form>
    );
};