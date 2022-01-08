import {cleanup, render, screen} from '@testing-library/react'
import {App} from './App'
import React from 'react'
import {WithContext} from '../auxiliary-components/WithContext'

// window.matchMedia = window.matchMedia || function() {
//     return {
//         matches: false,
//         addListener: jest.fn(),
//         removeListener: jest.fn()
//     }
// }

describe('App test`s', () => {
    beforeAll(() => {
        window.matchMedia = window.matchMedia || function () {
            return {
                matches: false,
                addListener: jest.fn(),
                removeListener: jest.fn()
            }
        }
    });
    afterAll(cleanup)
    // Object.defineProperty(window, "matchMedia", {
    //     writable: true,
    //     value: jest.fn().mockImplementation(query => ({
    //         matches: false,
    //         media: query,
    //         onchange: null,
    //         addListener: jest.fn(), // Deprecated
    //         removeListener: jest.fn(), // Deprecated
    //         addEventListener: jest.fn(),
    //         removeEventListener: jest.fn(),
    //         dispatchEvent: jest.fn(),
    //     }))
    // });
    it('should be render', () => {
        render(
            <WithContext>
                <App/>
            </WithContext>
        )

        expect(screen.getByText(/profile/ig)).toBeInTheDocument()
    })
    it('App snapshot', () => {
        const element = render(
            <WithContext>
                <App/>
            </WithContext>
        )

        expect(element).toMatchSnapshot()
    })
})