import React from 'react';
import PropTypes from 'prop-types';
import { GAME_MODE_1_PLAYER_VS_AI, GAME_MODE_2_PLAYERS } from '../constants';

const MainMenu = ({ startGame }) => (
  <div className="mainMenu">
    <div className="gameTitle">Tic Tac Toe</div>
    <button type="button" onClick={() => startGame(GAME_MODE_1_PLAYER_VS_AI)}>1 Player vs AI</button>
    <button type="button" onClick={() => startGame(GAME_MODE_2_PLAYERS)}>2 Players</button>
  </div>
);

MainMenu.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default MainMenu;
