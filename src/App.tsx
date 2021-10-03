import React from 'react';
import { Route } from 'react-router';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import FriendsPageContainer from './components/FriendsPage/FriendPageContainer';
import MessagesPageContainer from './components/MessagesPage/MessagesPageContainer';

function App() {
  return (
    <div className="App">
      <SideBar />
      <Route path='/messages' render = {() => <MessagesPageContainer/>} />
      <Route path='/friends' render = {() => <FriendsPageContainer/>} />
    </div>
  );
}

export default App;
