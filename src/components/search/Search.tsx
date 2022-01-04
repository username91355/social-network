import React from 'react'
import Search from 'antd/es/input/Search'

interface IProps {
    submit: (value: string) => void
}

export const SearchArea: React.FC<IProps> = React.memo(props => {

    const {submit} = props

    const onSearch = (data: string) => {
        submit(data)
    }

    return (
        <Search placeholder="*Input search user name" onSearch={onSearch} enterButton />
    )
})