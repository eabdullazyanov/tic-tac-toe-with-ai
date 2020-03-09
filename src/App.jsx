import React, { useState, useCallback } from 'react';
import './App.css';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import { APP_STATUS_MAIN_MENU, APP_STATUS_LOADING, APP_STATUS_GAME_IN_PROGRESS } from './constants';

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS_MAIN_MENU);
  const startGame = useCallback(
    () => {
      setAppStatus(APP_STATUS_GAME_IN_PROGRESS);
    },
    [setAppStatus],
  );
  return (
    <div className="App">
      <div className="appInner">
        {(() => {
          switch (appStatus) {
            case APP_STATUS_MAIN_MENU: return <MainMenu startGame={startGame} />;
            case APP_STATUS_LOADING: return null;
            case APP_STATUS_GAME_IN_PROGRESS: return <Game />;
            default: return null;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
