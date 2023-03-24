import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
// import UserList from './components/UserList/UserList';
// import ChatList from './components/ChatList/ChatList';
import UserProfile from './components/UserProfile/UserProfile';
import TabNavigation from './components/TabNavigation/TabNavigation';
import { useTelegram } from './hooks/useTelegram';

import './App.css';

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
        {/* <Route index element={<UserList />} /> */}
        {/* <Route path="/groups" element={<ChatList />} /> */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
