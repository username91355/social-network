import {appReducer, AppStatus, removeUserData, setAppError, setAppStatus, setUserData} from "./app-reducer";

const testStateWitoutData = {
    appStatus: AppStatus.IDLE,
    isAuth: false,
    id: null,
    email: null,
    login: null,
    error: null,
    captchaUrl: null
}

const testStateWithData = {
    appStatus: AppStatus.IDLE,
    isAuth: false,
    id: null,
    email: null,
    login: null,
    error: null,
    captchaUrl: null
}

describe('App-reducer tests', () => {
    it('App reducer with unknown action', () => {
        //@ts-ignore
        const result = appReducer(testStateWitoutData, {type: 'UNKNOWN_REDUCER'})

        expect(result).toBe(testStateWitoutData)
    })
    it('Set user data', () => {
        const result = appReducer(testStateWitoutData, setUserData({
            id: 1,
            email: 'test@mail.com',
            login: 'test'
        }))

        expect(result.appStatus).toBe(AppStatus.IDLE)
        expect(result.isAuth).toBeTruthy()
        expect(result.id).toBe(1)
        expect(result.email).toBe('test@mail.com')
        expect(result.login).toBe('test')
        expect(result.error).toBeNull()
        expect(result).not.toBe(testStateWitoutData)
    })

    it('Remove user data', () => {
        const result = appReducer(testStateWithData, removeUserData())

        expect(result.appStatus).toBe(AppStatus.IDLE)
        expect(result.isAuth).toBeFalsy()
        expect(result.id).toBeNull()
        expect(result.email).toBeNull()
        expect(result.login).toBeNull()
        expect(result.error).toBeNull()
        expect(result).not.toBe(testStateWithData)
    })

    it('Set app error', () => {
        const result = appReducer(testStateWitoutData, setAppError('test error'))

        expect(result.appStatus).toBe(AppStatus.IDLE)
        expect(result.isAuth).toBeFalsy()
        expect(result.id).toBeNull()
        expect(result.email).toBeNull()
        expect(result.login).toBeNull()
        expect(result.error).toBe('test error')
        expect(result).not.toBe(testStateWitoutData)
    })

    it('Set app status', () => {
        const result = appReducer(testStateWitoutData, setAppStatus(AppStatus.SUCCESS))

        expect(result.appStatus).toBe(AppStatus.SUCCESS)
        expect(result.isAuth).toBeFalsy()
        expect(result.id).toBeNull()
        expect(result.email).toBeNull()
        expect(result.login).toBeNull()
        expect(result.error).toBeNull()
        expect(result).not.toBe(testStateWitoutData)
    })
})
