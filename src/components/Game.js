import React, { useState, useEffect, useCallback } from 'react';
import shortid from 'shortid';

import createTreeOfAllPossibleMoves from '../utils/createTreeOfAllPossibleMoves';
import Ai from '../Ai';

const FIELD_SIZE = 3;
const CELLS_NUMBER = FIELD_SIZE ** 2;

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

const hasWon = (player, field) => {
  const countOccupiedFieldsByColumn = new Array(FIELD_SIZE).fill(0);
  let thereAreFailedFieldsInRow;

  const diagonals = [
    {
      countFields: 0,
      includesCell: (cellIndex, rowIndex) => cellIndex + rowIndex === FIELD_SIZE - 1,
    },
    {
      countFields: 0,
      includesCell: (cellIndex, rowIndex) => cellIndex === rowIndex,
    },
  ];

  for (let i = 0; i < field.length; i++) {
    const cellIndex = i % FIELD_SIZE;
    const rowIndex = Math.floor(i / FIELD_SIZE);

    if (cellIndex === 0) {
      if (thereAreFailedFieldsInRow === null) return true;
      thereAreFailedFieldsInRow = null;
    }

    const cell = field[i];
    if (cell.occupiedBy === player) {
      countOccupiedFieldsByColumn[cellIndex]++;
      diagonals.forEach((diagonal) => {
        if (diagonal.includesCell(cellIndex, rowIndex)) diagonal.countFields++;
      });
    } else {
      thereAreFailedFieldsInRow = true;
    }
  }
  for (let i = 0; i < countOccupiedFieldsByColumn.length; i++) {
    if (countOccupiedFieldsByColumn[i] === FIELD_SIZE) return true;
  }

  for (let i = 0; i < diagonals.length; i++) {
    if (diagonals[i].countFields === FIELD_SIZE) return true;
  }

  return false;
};



const Game = () => {
  const [field, updateField] = useState(generateEmptyField);
  const [whoseMove, setWhoseMove] = useState(0);
  const [tree] = useState(() => createTreeOfAllPossibleMoves(FIELD_SIZE, PLAYERS, 0));
  const [currentTreeNode, setCurrentTreeNode] = useState(tree);
  const [ai] = useState(() => new Ai(tree));
  const [winner, setWinner] = useState(null);

  const makeMove = useCallback(
    (cellIdx) => {
      let updatedField = [...field];
      updatedField[cellIdx] = {
        ...updatedField[cellIdx],
        occupiedBy: PLAYERS[whoseMove],
      };
  
      if (hasWon(PLAYERS[whoseMove], updatedField)) {
        console.log('has won');
        setWinner(whoseMove);
      } else {
        setWhoseMove(whoseMove + 1 < PLAYERS.length ? whoseMove + 1 : 0);
      }
  
      updateField(updatedField);
    },
    [field, whoseMove, setWinner]
  );

  const makeAiMove = useCallback(
    () => {
      const bestMove = ai.getBestMove(currentTreeNode);
      makeMove(bestMove);
    },
    [ai, currentTreeNode, makeMove]
  );

  const onCellClick = useCallback(
    (cellId) => {
      const cellIdx = field.findIndex(currentCell => currentCell.id === cellId);
      if (field[cellIdx].occupiedBy != null) return;
  
      makeMove(cellIdx);
      setCurrentTreeNode(currentTreeNode[cellIdx]);
    },
    [field, makeMove, currentTreeNode, setCurrentTreeNode],
  );

  useEffect(
    () => {
      if (whoseMove !== 1) return;
      const timer = setTimeout(makeAiMove, 500);
      return () => clearTimeout(timer)
    },
    [whoseMove, currentTreeNode, makeAiMove],
  )

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
          <b>{PLAYERS[whoseMove].name} won!</b>
        ) : (
          <div>{PLAYERS[whoseMove].name}'s turn</div>
        )}
      </div>
      <div>
        <button>Reset</button>
      </div>
    </div>
  )
};

export default Game;
