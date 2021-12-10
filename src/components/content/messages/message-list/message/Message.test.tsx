import {render, screen} from "@testing-library/react";
import Message, { TProps } from "./Message";

const testOutgoingData: TProps = {
    outgoing: true,
    message: 'testOutgoing',
    authUserPhoto: 'authUserPhoto',
    authUserName: 'authUserName',
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
}

const testIncomingData: TProps = {
    outgoing: false,
    message: 'testIncoming',
    authUserPhoto: 'authUserPhoto',
    authUserName: 'authUserName',
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
}

describe('Message component', () => {
    it('Message with outgoing data render', () => {
        render(<Message {...testOutgoingData}/>);

        expect(screen.getByText('authUserName')).toBeInTheDocument()
        expect(screen.getByText('testOutgoing')).toBeInTheDocument()
    });

    it('Message with incoming data render', () => {
        render(<Message {...testIncomingData}/>);

        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('testIncoming')).toBeInTheDocument()
    });


    it('Message with outgoing data snapshot', ()=> {
        const outgoingMessage = render(<Message {...testOutgoingData}/>);

        expect(outgoingMessage).toMatchSnapshot()
    });

    it('Message with incoming data render snapshot', ()=> {
        const incomingMessage = render(<Message {...testIncomingData}/>);

        expect(incomingMessage).toMatchSnapshot()
    });
});