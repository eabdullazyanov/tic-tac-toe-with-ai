import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  MAX, sign, name, AI_DELAY, CENTRAL_CELL,
} from '../../constants';
import minimaxTree from '../../utils/minimaxTree';
import { getOpponent, getBestChildIndex } from '../../utils';
import {
  generateEmptyField, getCellIndex, getFieldAfterMove, isGameOver,
} from './utils';

const Game = ({ ai, returnToMainMenu }) => {
  const [gameResult, setGameResult] = useState(null);
  const [whoseMove, setWhoseMove] = useState(MAX);
  const [currentMinimaxNode, setCurrentMinimaxNode] = useState(minimaxTree);
  const [field, updateField] = useState(() => generateEmptyField());
  const [movesCount, setMovesCount] = useState(0);

  const setInitialState = useCallback(() => {
    setGameResult(null);
    setWhoseMove(MAX);
    setCurrentMinimaxNode(minimaxTree);
    updateField(generateEmptyField());
    setMovesCount(0);
  }, []);

  const makeMove = useCallback((cellIndex) => {
    const fieldAfterMove = getFieldAfterMove(field, whoseMove, cellIndex);
    updateField(fieldAfterMove);

    const newMinimaxNode = currentMinimaxNode.children[cellIndex];
    setCurrentMinimaxNode(newMinimaxNode);

    if (isGameOver(newMinimaxNode)) {
      setGameResult(newMinimaxNode.value);
    } else {
      setWhoseMove(getOpponent(whoseMove));
    }
    setMovesCount(movesCount + 1);
  }, [field, whoseMove, currentMinimaxNode, movesCount]);

  const onCellClick = useCallback((cellId) => {
    if (whoseMove === ai) return;

    const cellIndex = getCellIndex(cellId, field);
    if (field[cellIndex].occupiedBy == null) makeMove(cellIndex);
  }, [field, whoseMove, ai, makeMove]);

  const makeAiMove = useCallback(() => {
    const bestMove = field[CENTRAL_CELL].occupiedBy == null && movesCount < 3
      ? CENTRAL_CELL
      : getBestChildIndex(ai, currentMinimaxNode.children);
    makeMove(bestMove);
  }, [currentMinimaxNode, ai, makeMove, field, movesCount]);

  useEffect(() => {
    if (whoseMove !== ai || gameResult != null) return undefined;

    const timer = setTimeout(makeAiMove, AI_DELAY);

    return () => clearTimeout(timer);
  }, [whoseMove, gameResult, ai, currentMinimaxNode, makeAiMove]);

  return (
    <div className="game">
      <div className="field">
        {field.map(({ occupiedBy, id }) => (
          <div key={id} className="cell" onClick={() => onCellClick(id)}>
            {occupiedBy != null && sign[occupiedBy]}
          </div>
        ))}
      </div>
      <div className="statusBar">
        {
        gameResult == null
          ? (
            <div>
              {`${name[whoseMove]}'s turn (${sign[whoseMove]})`}
            </div>
          )
          : ' '
        }
      </div>
      {gameResult != null && (
        <div className="gameOver">
          <div className="message">
            {
              gameResult === 0
                ? 'Tie!'
                : `${name[gameResult]} win!`
            }
          </div>
          <button type="button" onClick={setInitialState}>Play again</button>
          <button type="button" onClick={returnToMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
};

Game.propTypes = {
  ai: PropTypes.number,
  returnToMainMenu: PropTypes.func.isRequired,
};

Game.defaultProps = {
  ai: null,
};

export default Game;
