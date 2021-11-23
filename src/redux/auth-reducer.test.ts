import authReducer, {isAuthorized} from "./auth-reducer";

const testState = {
    isAuth: false,
    id: null,
    email: null,
    login: null,
}

test('Auth reducer: auth me', () => {
    const data = {
        id: 1,
        email: 'test@mail.com',
        login: 'User42'
    }
    const result = authReducer(testState, isAuthorized(data))

    expect(result).toEqual({
        isAuth: true,
        id: 1,
        email: 'test@mail.com',
        login: 'User42',
    })
})

