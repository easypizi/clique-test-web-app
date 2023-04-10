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

  // TODO: https://core.telegram.org/bots/webapps#events-available-for-web-apps
  // Prevent accident closing of the window. Probably we should use height Change event and track this changes.
  // const thereAreUnsavedChanges = () => true;

  // const onBeforeUnload = useCallback((e) => {
  //   if (thereAreUnsavedChanges()) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //     return;
  //   }

  //   delete e.returnValue;
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', onBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeUnload);
  //   };
  // }, [onBeforeUnload]);

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
