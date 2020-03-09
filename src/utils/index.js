import {
  FIELD_SIZE, CELLS_NUMBER, MAX, MIN,
} from '../constants';

export function hasWon(player, field) {
  const rows = [0, 0, 0];
  const cols = [0, 0, 0];
  const diagonals = [0, 0];
  for (let i = 0; i < CELLS_NUMBER; i++) {
    if (field[i] !== player) continue;

    const rowIndex = Math.floor(i / FIELD_SIZE);
    const colIndex = i % FIELD_SIZE;

    rows[rowIndex]++;
    cols[colIndex]++;
    if (colIndex === rowIndex) diagonals[0]++;
    if (colIndex + rowIndex === FIELD_SIZE - 1) diagonals[1]++;
  }

  return Math.max(...rows, ...cols, ...diagonals) === FIELD_SIZE;
}

export const getOpponent = player => (player === MAX ? MIN : MAX);

export function getBestChildIndex(role, children) {
  if (!children) return null;

  return children.reduce((bestI, currentChild, i) => {
    if (bestI === null) return i;
    if (role === MAX && currentChild.value > children[bestI].value) return i;
    if (role === MIN && currentChild.value < children[bestI].value) return i;

    return bestI;
  }, null);
}

export function getBestChildValue(role, children) {
  const index = getBestChildIndex(role, children);
  return children[index].value;
}
