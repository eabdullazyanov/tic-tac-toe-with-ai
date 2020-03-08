import React from 'react';
import { GAME_MODE_1_PLAYER_VS_AI, GAME_MODE_2_PLAYERS } from '../constants';

const MainMenu = ({ startGame }) => {
  return (
    <div className="mainMenu">
      <div className="gameTitle">Tic Tac Toe</div>
      <button onClick={() => startGame(GAME_MODE_1_PLAYER_VS_AI)}>1 Player vs AI</button>
      <button onClick={() => startGame(GAME_MODE_2_PLAYERS)}>2 Players</button>
    </div>
  )
};

export default MainMenu;
