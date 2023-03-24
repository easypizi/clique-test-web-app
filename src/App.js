import React, { useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import TabNavigation from './components/TabNavigation/TabNavigation';

import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
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
