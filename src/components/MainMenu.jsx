import React from 'react';
import PropTypes from 'prop-types';

const MainMenu = ({ startGame, startGameAsX, startGameAsO }) => (
  <div className="mainMenu">
    <div className="gameTitle">Tic Tac Toe</div>
    <button type="button" onClick={startGameAsX}>1 Player as X</button>
    <button type="button" onClick={startGameAsO}>1 Player as O</button>
    <button type="button" onClick={startGame}>2 Players</button>
  </div>
);

MainMenu.propTypes = {
  startGame: PropTypes.func.isRequired,
  startGameAsX: PropTypes.func.isRequired,
  startGameAsO: PropTypes.func.isRequired,
};

export default MainMenu;
