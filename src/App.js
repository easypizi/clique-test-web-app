import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';

import Header from './components/Header/Header';
import UserList from './components/UserList/UserList';
import ChatList from './components/ChatList/ChatList';
import UserProfile from './components/UserProfile/UserProfile';

import './App.css';
import TabNavigation from './components/TabNavigation/TabNavigation';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <TabNavigation />
      <Routes>
        <Route index element={<ChatList />}></Route>
        <Route path="/groups" element={<UserList />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
