import React from 'react';
import './App.css';
import {HeaderContainer} from "./components/common/Header/HeaderContainer";
import {Navigation} from "./components/common/Navigation/Navigation";
import {Route} from "react-router-dom";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {FriendsContainer} from "./components/Friends/FriendsContainer";
import {MessagesContainer} from "./components/Messages/MessagesContainer";


function App() {

    return (
        <div className="app__wrapper">
            <HeaderContainer />
            <div className="app__container">
                <Navigation/>
                <div className="app__content">
                    <Route path={'/profile'} render={() => <ProfileContainer />}/>
                    <Route path={'/messages'} render={() => <MessagesContainer />}/>
                    <Route path={'/friends'} render={() => <FriendsContainer />}/>
                </div>
            </div>
        </div>
    );
}

export default App;
