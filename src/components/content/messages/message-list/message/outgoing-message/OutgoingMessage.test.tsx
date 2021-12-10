import {render, screen} from "@testing-library/react";
import OutgoingMessage, {TProps} from "./OutgoingMessage";

const testData: TProps = {
    message: 'testOutgoing',
    authUserPhoto: 'authUserPhoto',
    authUserName: 'authUserName'
};

describe('OutgoingMessage component', () => {
    it('Outgoing message render', () => {
        render(<OutgoingMessage {...testData}/>);

        expect(screen.getByText('authUserName')).toBeInTheDocument()
        expect(screen.getByText('testOutgoing')).toBeInTheDocument()
    });

    it('OutgoingMessage snapshot', ()=> {
        const outgoingMessage = render(<OutgoingMessage {...testData}/>);

        expect(outgoingMessage).toMatchSnapshot()
    });
});