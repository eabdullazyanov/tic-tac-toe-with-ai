import React, { useState, useEffect, useCallback } from 'react';
import shortid from 'shortid';

import {
  CELLS_NUMBER, MAX, MIN, sign, name,
} from '../constants';
import createMinimaxTree from '../utils/createMinimaxTree';
import { hasWon, getOpponent, getBestChildIndex } from '../utils';

const generateEmptyCell = () => ({
  id: shortid.generate(),
  occupiedBy: null,
});

const generateEmptyField = () => new Array(CELLS_NUMBER).fill(null).map(generateEmptyCell);

const Game = () => {
  const [field, updateField] = useState(() => generateEmptyField());
  const [whoseMove, setWhoseMove] = useState(MAX);
  const [tree] = useState(() => createMinimaxTree());
  const [currentTreeNode, setCurrentTreeNode] = useState(tree);
  const [winner, setWinner] = useState(null);

  const makeMove = useCallback(
    (cellIdx) => {
      const updatedField = [...field];
      updatedField[cellIdx] = {
        ...updatedField[cellIdx],
        occupiedBy: whoseMove,
      };

      if (hasWon(whoseMove, updatedField)) {
        setWinner(whoseMove);
      } else {
        setWhoseMove(getOpponent(whoseMove));
      }

      updateField(updatedField);
    },
    [field, whoseMove, setWinner],
  );

  const makeAiMove = useCallback(
    () => {
      const bestMove = getBestChildIndex(MIN, currentTreeNode.children);
      makeMove(bestMove);
      setCurrentTreeNode(currentTreeNode.children[bestMove]);
    },
    [currentTreeNode, makeMove],
  );

  const onCellClick = useCallback(
    (cellId) => {
      const cellIdx = field.findIndex(currentCell => currentCell.id === cellId);
      if (field[cellIdx].occupiedBy != null) return;

      makeMove(cellIdx);
      setCurrentTreeNode(currentTreeNode.children[cellIdx]);
    },
    [field, makeMove, currentTreeNode, setCurrentTreeNode],
  );

  useEffect(
    () => {
      if (whoseMove !== 1) return undefined;
      const timer = setTimeout(makeAiMove, 500);
      return () => clearTimeout(timer);
    },
    [whoseMove, currentTreeNode, makeAiMove],
  );

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
        {winner !== null ? (
          <b>
            {name[whoseMove]}
            won!
          </b>
        ) : (
          <div>
            {name[whoseMove]}
            &apos;s turn
          </div>
        )}
      </div>
      <div>
        <button type="button">Reset</button>
      </div>
    </div>
  );
};

export default Game;
