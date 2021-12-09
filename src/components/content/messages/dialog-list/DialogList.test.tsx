import {TUser} from "../../../../redux/reducers/messages-reducer";
import {render, screen} from "@testing-library/react";
import DialogList from "./DialogList";
import {BrowserRouter} from "react-router-dom";

const testData: Array<TUser> = [
    {
        followed: true,
        id: 1,
        name: 'Alice',
        photos: {
            small: 'smallAlice',
            large: 'largeAlice'
        },
        status: null,
        uniqueUrlName: null
    },
    {
        followed: true,
        id: 2,
        name: 'Alex',
        photos: {
            small: 'smallAlex',
            large: 'largeAlex'
        },
        status: 'Status',
        uniqueUrlName: null
    }
]

const DialogListWithBrowserRouter = (testData: Array<TUser>) => {
    return <BrowserRouter>
        <DialogList userList={testData}/>
    </BrowserRouter>
}

describe('Dialog list component', () => {
    it('DialogList render', () => {
        render(DialogListWithBrowserRouter(testData));

        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Alex')).toBeInTheDocument()
        expect(screen.getAllByRole('img').length).toBe(2)
        expect(screen.getByText(/Status not set/i)).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()
    });

    it('Empty contact list snapshot', ()=> {
        const dialogList = render(DialogListWithBrowserRouter(testData));

        expect(dialogList).toMatchSnapshot()
    });
});