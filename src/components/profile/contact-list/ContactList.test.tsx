import {render,screen} from "@testing-library/react";
import ContactList from "./ContactList";

const testData = {
    telegram: 'telegram.com',
    facebook: 'facebook.com'
}

describe('сontact list component', ()=> {
    it('ContactList render', ()=> {
        render(<ContactList contacts={testData}/>)

        expect(screen.getByRole('list')).toBeInTheDocument()
        expect(screen.getByText(/facebook/i)).toBeInTheDocument()
        expect(screen.getByText(/telegram.com/i)).toBeInTheDocument()
    });

    it('сontact list without data', () => {
        render(<ContactList contacts={{}}/>)

        expect(screen.getByText('Contacts')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).toBeNull()
    });

    it('сontact list snapshot', ()=> {
        const contactList = render(<ContactList contacts={testData}/>)

        expect(contactList).toMatchSnapshot()
    });

    it('Empty contact list snapshot', ()=> {
        const contactList = render(<ContactList contacts={{}}/>)

        expect(contactList).toMatchSnapshot()
    });
})