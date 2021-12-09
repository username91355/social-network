import {render,screen} from "@testing-library/react";
import Contact from "./Contact";

test("сontact render", ()=> {
    render(<Contact title={'Facebook'} value={'http://facebook.com'}/>)

    const title = screen.getByText(/Facebook/i)
    const value = screen.getByText(/facebook.com/i)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
})