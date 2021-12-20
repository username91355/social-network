import {render, screen} from "@testing-library/react";
import User from "./User";
import {BrowserRouter} from "react-router-dom";

const followOnUser = jest.fn()
const unfollowFromUser = jest.fn()

const testUser = {
    id: 1,
    name: 'User',
    status: 'status',
    photos: {
        small: 'small',
        large: 'large'
    },
    followed: true
}

describe('MessageList', () => {
    it('MessageList render', async () => {
        render(<BrowserRouter>
            <User user={testUser} followOnUser={followOnUser} unfollowFromUser={unfollowFromUser}/>
        </BrowserRouter>);

        expect(screen.getByText(/User/)).toBeInTheDocument()
        expect(screen.getByText(/status/)).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src')
        expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'small')
        expect(screen.getByAltText('avatar')).not.toHaveAttribute('src', 'large')
        expect(screen.getByRole('button')).toHaveTextContent(/Unfollow/ig)
    });

    it('User snapshot', () => {
        const user = render(<BrowserRouter>
            <User user={testUser} followOnUser={followOnUser} unfollowFromUser={unfollowFromUser}/>
        </BrowserRouter>);

        expect(user).toMatchSnapshot()
    });
});
