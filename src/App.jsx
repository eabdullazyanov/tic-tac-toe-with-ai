import React, { useState, useCallback } from 'react';
import './App.css';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import {
  APP_STATUS_MAIN_MENU, APP_STATUS_GAME, APP_STATUS_GAME_AS_X, APP_STATUS_GAME_AS_O, MIN, MAX,
} from './constants';

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS_MAIN_MENU);

  const startGame = useCallback(() => setAppStatus(APP_STATUS_GAME), []);
  const startGameAsX = useCallback(() => setAppStatus(APP_STATUS_GAME_AS_X), []);
  const startGameAsO = useCallback(() => setAppStatus(APP_STATUS_GAME_AS_O), []);
  const returnToMainMenu = useCallback(() => setAppStatus(APP_STATUS_MAIN_MENU), []);

  return (
    <div className="App">
      <div className="appInner">
        {(() => {
          switch (appStatus) {
            case APP_STATUS_MAIN_MENU: return (
              <MainMenu
                startGame={startGame}
                startGameAsX={startGameAsX}
                startGameAsO={startGameAsO}
              />
            );
            case APP_STATUS_GAME: return <Game returnToMainMenu={returnToMainMenu} />;
            case APP_STATUS_GAME_AS_X: return <Game ai={MIN} returnToMainMenu={returnToMainMenu} />;
            case APP_STATUS_GAME_AS_O: return <Game ai={MAX} returnToMainMenu={returnToMainMenu} />;
            default: return null;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
