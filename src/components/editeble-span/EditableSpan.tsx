import { EditOutlined } from '@ant-design/icons'
import React, {ChangeEvent, useState} from 'react'

interface IProps {
    profileStatus: string | null
    changeUserStatus: (status: string) => void
}

export const EditableSpan: React.FC<IProps> = React.memo(props => {

    const {
        profileStatus,
        changeUserStatus
    } = props

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(profileStatus || '')

    const inputOnBlur = () => {
        changeUserStatus(inputValue)
        setEditMode(false)
    }

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const spanDBLClick = () => {
        setEditMode(true)
    }

    return <>
        {editMode
            ? <input type={'text'}
                     value={inputValue}
                     onChange={inputChange}
                     onBlur={inputOnBlur}
                     style={{color: 'black',width: '250px'}}/>
            : <span onDoubleClick={spanDBLClick}>{profileStatus || 'set status'}</span>
        }
        <span onClick={()=>setEditMode(!editMode)}><EditOutlined /></span>
    </>
})