import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContentPage from './view/ContentPage/ContentPage';
import './App.css';

function App() {
  // TODO: https://core.telegram.org/bots/webapps#events-available-for-web-apps
  // Made prevent for closing the window

  return (
    <div className="App">
      <Routes>
        <Route index element={<ContentPage />} />
      </Routes>
    </div>
  );
}

export default App;
