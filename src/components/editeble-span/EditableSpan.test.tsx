import { render, screen } from '@testing-library/react'
import {EditableSpan} from './EditableSpan'

const changeUserStatusCallback = jest.fn()

describe('EditableSpan test`s',()=> {
    it('should be render with status: test', () => {
        render(<EditableSpan profileStatus={'test'}
                             changeUserStatus={changeUserStatusCallback}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
    })
    it('should be render without', () => {
        render(<EditableSpan profileStatus={null}
                             changeUserStatus={changeUserStatusCallback}/>)

        expect(screen.getByText('set status')).toBeInTheDocument()
    })
    it('Editable span snapshot', () => {
        const element = render(<EditableSpan profileStatus={'test'}
                             changeUserStatus={changeUserStatusCallback}/>)

        expect(element).toMatchSnapshot()
    })
})