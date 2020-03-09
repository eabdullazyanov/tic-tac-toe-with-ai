import React, { useState, useEffect, useCallback } from 'react';
import shortid from 'shortid';

import { CELLS_NUMBER, MAX, MIN } from '../constants';
import createMinimaxTree from '../utils/createMinimaxTree';
import { hasWon, getOpponent } from '../utils';
import Ai from '../Ai';

const PLAYERS = [
  {
    idx: 0,
    name: 'Player 1',
    sign: 'X',
  },
  {
    idx: 1,
    name: 'Player 2',
    sign: 'O',
  },
];

const generateEmptyCell = () => ({
  id: shortid.generate(),
  occupiedBy: null,
});

const generateEmptyField = () => new Array(CELLS_NUMBER).fill(null).map(generateEmptyCell);

const Game = () => {
  const [field, updateField] = useState(generateEmptyField);
  const [whoseMove, setWhoseMove] = useState(MAX);
  const [tree] = useState(() => createMinimaxTree());
  const [currentTreeNode, setCurrentTreeNode] = useState(tree);
  const [winner, setWinner] = useState(null);

  const makeMove = useCallback(
    (cellIdx) => {
      const updatedField = [...field];
      updatedField[cellIdx] = {
        ...updatedField[cellIdx],
        occupiedBy: PLAYERS[whoseMove],
      };

      if (hasWon(PLAYERS[whoseMove], updatedField)) {
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
      const bestMove = Ai.getBestChildIndex(MIN, currentTreeNode.children);
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
            {occupiedBy && occupiedBy.sign}
          </div>
        ))}
      </div>
      <div>
        {winner !== null ? (
          <b>
            {PLAYERS[whoseMove].name}
            won!
          </b>
        ) : (
          <div>
            {PLAYERS[whoseMove].name}
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
