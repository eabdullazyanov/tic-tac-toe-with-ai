import React, { useState } from 'react';
import shortid from 'shortid';

const FIELD_SIZE = 3;
const CELLS_NUMBER = FIELD_SIZE ** 2;

const CELL_STATE_EMPTY = 0;
const CELL_STATE_CROSS = 1;
const CELL_STATE_TOE = 2;

const CROSS = 'X';
const TOE = 'O';

const generateEmptyField = () => new Array(CELLS_NUMBER).fill(null).map(() => ({
  id: shortid.generate(),
  cellState: CELL_STATE_EMPTY,
}));

const Game = () => {
  const [field, updateField] = useState(generateEmptyField());
  console.log('field', field);
  return (
    <div className="game">
      <div className="field">
        {field.map(({ id }) => (
          <div key={id} className="cell">{CROSS}</div>
        ))}
      </div>
    </div>
  )
};

export default Game;
