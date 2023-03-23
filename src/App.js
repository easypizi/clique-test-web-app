import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import UserList from './components/userList/UserList';
import ChatList from './components/ChatList/ChatList';
import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<UserList />}></Route>
        <Route path="/chat-list" element={<ChatList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
