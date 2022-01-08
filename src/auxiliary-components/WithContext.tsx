import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../state/store";

interface ITestComponentWithContext {
    children: React.ReactNode
}

export const WithContext = ({children}: ITestComponentWithContext) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    )
}