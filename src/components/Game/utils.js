import shortid from 'shortid';

import { CELLS_NUMBER } from '../../constants';

const generateEmptyCell = () => ({
  id: shortid.generate(),
  occupiedBy: null,
});
export const generateEmptyField = () => new Array(CELLS_NUMBER).fill(null).map(generateEmptyCell);

export const getCellIndex = (id, field) => field.findIndex(cell => cell.id === id);

export function getFieldAfterMove(field, whoseMove, cellIndex) {
  const updatedField = [...field];

  updatedField[cellIndex] = {
    ...updatedField[cellIndex],
    occupiedBy: whoseMove,
  };

  return updatedField;
}

export const isGameOver = minimaxNode => minimaxNode.children == null;
