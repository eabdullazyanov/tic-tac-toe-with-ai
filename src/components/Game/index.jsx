import React, { useState, useEffect, useCallback } from 'react';

import {
  MAX, MIN, sign, name, AI, AI_DELAY,
} from '../../constants';
import minimaxTree from '../../utils/minimaxTree';
import { getOpponent, getBestChildIndex } from '../../utils';
import {
  generateEmptyField, getCellIndex, getFieldAfterMove, isGameOver,
} from './utils';

const Game = () => {
  const [gameResult, setGameResult] = useState();
  const [whoseMove, setWhoseMove] = useState(MAX);
  const [currentMinimaxNode, setCurrentMinimaxNode] = useState(minimaxTree);
  const [field, updateField] = useState(() => generateEmptyField());

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
  }, [field, whoseMove, currentMinimaxNode]);

  const onCellClick = useCallback((cellId) => {
    const cellIndex = getCellIndex(cellId, field);
    if (field[cellIndex].occupiedBy == null) makeMove(cellIndex);
  }, [field, makeMove]);

  const makeAiMove = useCallback(() => {
    const bestMove = getBestChildIndex(MIN, currentMinimaxNode.children);
    makeMove(bestMove);
  }, [currentMinimaxNode, makeMove]);

  useEffect(() => {
    if (whoseMove !== AI || gameResult != null) return undefined;

    const timer = setTimeout(makeAiMove, AI_DELAY);

    return () => clearTimeout(timer);
  }, [whoseMove, gameResult, currentMinimaxNode, makeAiMove]);

  return (
    <div className="game">
      <div className="field">
        {field.map(({ occupiedBy, id }) => (
          <div key={id} className="cell" onClick={() => onCellClick(id)}>
            {occupiedBy != null && sign[occupiedBy]}
          </div>
        ))}
      </div>
      <div>
        {
        gameResult == null
          ? (
            <div>
              {name[whoseMove]}
              &apos;s turn
            </div>
          )
          : (
            <b>
              {name[gameResult]}
              won!
            </b>
          )
        }
      </div>
      <div>
        <button type="button">Reset</button>
      </div>
    </div>
  );
};

export default Game;
