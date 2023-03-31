import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';

import Authorization from './view/AuthorizationPage/AuthorizationPage';
import ContentPage from './view/ContentPage/ContentPage';
import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Authorization />} />
        <Route path="/space" element={<ContentPage />} />
        {/* <Route path="/store" element={<StorePage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
