import React from 'react';
import { Route } from 'react-router';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import FriendsPageContainer from './components/FriendsPage/FriendPageContainer';
import MessagesPageContainer from './components/MessagesPage/MessagesPageContainer';
import logo from './assets/img/logo.png'

function App() {
  return (
    <div className="app__wrapper">
      <div className="header__wrapper">
        <div className="header__content">
        <div className="header__logo">
          <img className="header__logo_img"src={logo} alt="" />
        </div>
        </div>
      </div>
      <div className="app__content">
        <SideBar />
        <div className="app__mainWindow">
          <Route path='/messages' render = {() => <MessagesPageContainer/>} />
          <Route path='/friends' render = {() => <FriendsPageContainer/>} />
        </div>
      </div>
    </div>
  );
}

export default App;
