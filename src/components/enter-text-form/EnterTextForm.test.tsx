import {render, screen} from '@testing-library/react'
import {EnterTextForm} from './EnterTextForm'
import userEvent from "@testing-library/user-event";

const sendFn = jest.fn()
const changeFn = jest.fn()

describe('EnterTextForm test`s', () => {
    beforeAll(() => {
        window.matchMedia = window.matchMedia || function() {
            return {
                matches: false,
                addListener: jest.fn(),
                removeListener: jest.fn()
            }
        }
    });
    it('should be render with title, value and label', () => {
        render(<EnterTextForm title={'title'}
                              value={'value'}
                              label={'label'}
                              send={sendFn}
                              onChange={changeFn}/>)

        expect(screen.getByText('label')).toBeInTheDocument()
        expect(screen.getByText('value')).toBeInTheDocument()
        expect(screen.getByText('title')).toBeInTheDocument()
    })
    it('Change message text area should be work', () => {
        render(<EnterTextForm title={'title'}
                              value={'value'}
                              label={'label'}
                              send={sendFn}
                              onChange={changeFn}/>)

        userEvent.type(screen.getByRole('textbox'), 'test')

        expect(changeFn).toHaveBeenCalledTimes(4)
    })
    it('Send message should be work', () => {
        render(<EnterTextForm title={'title'}
                              value={'value'}
                              label={'label'}
                              send={sendFn}
                              onChange={changeFn}/>)

        userEvent.click(screen.getByRole('button'))

        expect(sendFn).toHaveBeenCalledTimes(1)
    })
    it('Enter text form span snapshot', () => {
        const element = render(<EnterTextForm title={'title'}
                                              value={'value'}
                                              label={'label'}
                                              send={sendFn}
                                              onChange={changeFn}
        />)

        expect(element).toMatchSnapshot()
    })
})