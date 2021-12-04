import React, {ChangeEvent} from 'react';

type TProps = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    children?: string
}

const Search: React.FC<TProps> = props => {

    const {
        value,
        onChange,
        placeholder = "search...",
        children
    } = props

    return (
        <label>
            {children}
            <input type={"text"}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}/>
        </label>
    );
};

export default Search;