import {render, screen} from "@testing-library/react";
import IncomingMessage, {TProps} from "./IncomingMessage";

const testData: TProps = {
    message: 'testIncoming',
    interlocutors: [{
        followed: true,
        id: 1,
        name: 'Alice',
        photos: {
            small: 'smallAlice',
            large: 'largeAlice'
        },
        status: null,
        uniqueUrlName: null
    }]
};

const testDataUserWithoutPhotos: TProps = {
    message: 'testIncoming',
    interlocutors: [{
        followed: true,
        id: 1,
        name: 'Alice',
        photos: {
            small: null,
            large: null
        },
        status: null,
        uniqueUrlName: null
    }]
};

const testDataUserWithoutName: TProps = {
    message: 'testIncoming',
    interlocutors: [{
        followed: true,
        id: 1,
        name: '',
        photos: {
            small: null,
            large: null
        },
        status: null,
        uniqueUrlName: null
    }]
};

describe('IncomingMessage component', () => {
    it('Incoming message render', async () => {
        render(<IncomingMessage {...testData}/>);

        const image = await screen.findByAltText('interlocutorsPhoto')
        expect(image).toHaveAttribute('src', 'smallAlice')

        expect(screen.queryByRole("heading")).toHaveTextContent('Alice')
        expect(screen.getByText(/Alice/)).toBeInTheDocument()
        expect(screen.getByText(/testIncoming/)).toBeInTheDocument()
    });

    it('Incoming message render user without photos', async () => {
        render(<IncomingMessage {...testDataUserWithoutPhotos}/>);

        const image = await screen.findByAltText('interlocutorsPhoto')
        expect(image).toHaveAttribute('src', 'avatar-small.png')

        expect(screen.queryByRole("heading")).toHaveTextContent('Alice')
        expect(screen.getByText(/Alice/)).toBeInTheDocument()
        expect(screen.getByText(/testIncoming/)).toBeInTheDocument()
    });

    it('Incoming message render user without name', async () => {
        render(<IncomingMessage {...testDataUserWithoutName}/>);

        expect(screen.queryByRole("heading")).not.toHaveTextContent('Alice')
        expect(screen.getByRole("heading")).toBeEmptyDOMElement()
        expect(screen.getByText(/testIncoming/)).toBeInTheDocument()
    });

    it('Empty contact list snapshot', () => {
        const dialogList = render(<IncomingMessage {...testData}/>);

        expect(dialogList).toMatchSnapshot()
    });
});