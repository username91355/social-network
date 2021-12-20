import React from 'react'
import './App.css'
import Header from './components/common/header/HeaderC';
import ContentWithAuth from './components/content/ContentWithAuth';

const App = () => {


    return (
        <div className='app_wrapper'>
            <Header/>
            <ContentWithAuth />
        </div>
    );
}

export default App