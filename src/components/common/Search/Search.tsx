import React, {ChangeEvent} from 'react';
import styles from './Search.module.css'

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
                   placeholder={placeholder}
                   className={styles.input}/>
        </label>
    );
};

export default React.memo(Search);