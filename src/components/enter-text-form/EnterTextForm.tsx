import React, {ChangeEvent} from 'react'
import styles from './EnterTextForm.module.css'
import {Button, Form} from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface IProps {
    value: string
    title: string
    label?: string
    onChange: (value: string) => void
    send: () => void
    buttonDisabled?: boolean
}

export const EnterTextForm: React.FC<IProps> = React.memo(props => {

    const {value, title, label = null, onChange, send, buttonDisabled = false} = props

    const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <div className={styles.textForm__wrapper}>
            <h3 className={styles.textForm__title}>{label}</h3>
            <Form>
                <Form.Item>
                    <TextArea className={styles.textForm__textArea} rows={4} onChange={changeTextArea} value={value}/>
                </Form.Item>
                <Form.Item>
                    <Button className={styles.textForm__button}
                            htmlType='submit'
                            disabled={buttonDisabled}
                            onClick={send}
                            type='primary'>
                        {title}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})