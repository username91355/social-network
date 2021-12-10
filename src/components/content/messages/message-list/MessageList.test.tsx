import {fireEvent, render, screen} from "@testing-library/react";
import MessageList from "./MessageList";
import userEvent from "@testing-library/user-event";

const changeNewMessageArea = jest.fn()
const sendMessage = jest.fn()

const testData = {
    dialogId: '11117',
    dialogs: [{
        followed: true,
        id: 11117,
        name: 'Alice',
        photos: {
            small: 'smallAlice',
            large: 'largeAlice'
        },
        status: null,
        uniqueUrlName: null
    }],
    messages: [
        {id: 1, message: 'Hi. Thanks for the help.', outgoing: true},
        {id: 2, message: 'Hi. You are always welcome!', outgoing: false},
        {id: 3, message: 'How are you?', outgoing: false}
    ],
    authUserPhoto: 'authUserPhoto',
    authUserName: 'authUserName',
    newMessageText: 'newMessageText',
    changeNewMessageArea: changeNewMessageArea,
    sendMessage: sendMessage,
}

const testDataWithoutMessages = {
    dialogId: '11117',
    dialogs: [{
        followed: true,
        id: 11117,
        name: 'Alice',
        photos: {
            small: 'smallAlice',
            large: 'largeAlice'
        },
        status: null,
        uniqueUrlName: null
    }],
    messages: [],
    authUserPhoto: 'authUserPhoto',
    authUserName: 'authUserName',
    newMessageText: 'newMessageText',
    changeNewMessageArea: changeNewMessageArea,
    sendMessage: sendMessage,
}

describe('MessageList', () => {
    it('MessageList render', async () => {
        render(<MessageList {...testData}/>);

        const newMessageArea = screen.getByRole('textbox')
        const buttonSendMessage = screen.getByRole('button')

        expect(screen.getByText(/Hi. Thanks for the help./)).toBeInTheDocument()
        expect(screen.getByText(/Hi. You are always welcome!/)).toBeInTheDocument()
        expect(screen.getByText(/How are you?/)).toBeInTheDocument()
        expect(screen.getAllByText(/Alice/).length).toBe(2)

        fireEvent.change(newMessageArea, {target: { value: 'test' }})
        expect(testData.changeNewMessageArea).toHaveBeenCalledTimes(1)

        // Don`t work... input is controlled
        // await userEvent.type(newMessageArea, 'Test')
        // expect(newMessageArea).toHaveValue('Test')

        fireEvent.click(buttonSendMessage)
        expect(testData.sendMessage).toHaveBeenCalledTimes(1)

    });

    it('MessageList render without messages', async () => {
        render(<MessageList {...testDataWithoutMessages}/>);

        expect(screen.getByText(/Select user for start dialog/)).toBeInTheDocument()
    });

    it('MessageList snapshot', () => {
        const incomingMessage = render(<MessageList {...testData}/>);

        expect(incomingMessage).toMatchSnapshot()
    });
});

