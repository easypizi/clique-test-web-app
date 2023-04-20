import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import ContentPage from './view/ContentPage/ContentPage';
import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  // TODO: https://core.telegram.org/bots/webapps#events-available-for-web-apps
  // Made prevent for closing the window

  return (
    <div className="App">
      <Routes>
        <Route index element={<ContentPage />} />
        {/* <Route path="/store" element={<StorePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
