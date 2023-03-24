import React, { useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';

import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
// import ChatList from './components/ChatList/ChatList';
// import UserProfile from './components/UserProfile/UserProfile';
import TabNavigation from './components/TabNavigation/TabNavigation';
// import TgChatUserList from './components/TgChatUserList/TgChatUserList';

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
      {/* <Routes>
        <Route index element={<TgChatUserList />} />
        <Route path="/groups" element={<ChatList />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes> */}
    </div>
  );
}

export default App;
