import React from 'react';
import { Result, Button } from 'antd'
import {useNavigate} from 'react-router-dom'

export const PageNotFound = React.memo(() => {

    const navigate = useNavigate()

    return (
        <Result
            style={{backgroundColor: 'white', height: '100%'}}
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={<Button type='primary' onClick={()=>navigate('/')}>Back Home</Button>}
        />
    )
})