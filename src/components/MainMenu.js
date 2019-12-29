import React from 'react';
import { GAME_MODE_1_PLAYER_VS_AI, GAME_MODE_2_PLAYERS } from '../constants';

const MainMenu = ({ startGame }) => {
  return (
    <div>
      <span onClick={() => startGame(GAME_MODE_1_PLAYER_VS_AI)}>1 Player vs AI</span>
      <br />
      <span onClick={() => startGame(GAME_MODE_2_PLAYERS)}>2 Players</span>
    </div>
  )
};

export default MainMenu;
