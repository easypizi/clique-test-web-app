/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
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

  //

  document.body.addEventListener('touchmove', (e) => {
    if (e.touches[0].clientY < 50) {
      // если свайп начинается вверху страницы
      e.preventDefault(); // отменяем скролл
      // показываем модальное окно с подтверждением
      if (confirm('Вы уверены, что хотите закрыть приложение?')) {
        tg.close();
      }
    }
  });

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
