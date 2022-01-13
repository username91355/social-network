import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import {App} from './app/App'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './state/store'

ReactDOM.render(
    // <BrowserRouter basename={process.env.PUBLIC_URL}/>
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
)
