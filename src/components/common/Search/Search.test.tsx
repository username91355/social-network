import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

const onChange = jest.fn();

describe("Search component test", ()=> {

    it('Search component is render without child', () => {
        render(<Search value={''} onChange={onChange}/>)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    });

    it('Search component is render with child', () => {
        render(<Search value={''} onChange={onChange}>Child</Search>)

        expect(screen.getByLabelText('Child')).toBeInTheDocument()
    });

    it('Search component is render with placeholder', () => {
        render(<Search value={''}
                       onChange={onChange}
                       placeholder={'Test placeholder'}/>)

        expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
    });

    it('Search component is render without placeholder', () => {
        render(<Search value={''} onChange={onChange}/>)

        expect(screen.getByPlaceholderText('search...')).toBeInTheDocument()
    });

    it('Change value in Search component', () => {
        render(<Search value={''} onChange={onChange}/>)

        userEvent.type(screen.getByRole('textbox'), 'Test')

        expect(onChange).toHaveBeenCalledTimes(4)
    });

    it('Search snapshot', () => {
        const search = render(<Search value={'test'} onChange={onChange}/>)

        expect(search).toMatchSnapshot()
    });
})