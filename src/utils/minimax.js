import { FIELD_SIZE, CELLS_NUMBER } from '../constants'

const hasWon = (player, field) => {
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

const MAX = 0;
const MIN = 1;

const players = {
  [MAX]: {
    winMark: 1,
    getBestChild: children => children.reduce(
      (acc, child) => Math.max(acc, child.value),
      Number.NEGATIVE_INFINITY,
    ),
  },
  [MIN]: {
    winMark: -1,
    getBestChild: children => children.reduce(
      (acc, child) => Math.min(acc, child.value),
      Number.POSITIVE_INFINITY,
    ),
  },
}

const getOpponent = player => player === MAX ? MIN : MAX;

const generateChildren = (mutableField, currentPlayer) => {
  const children = [];

  for (let i = 0; i < mutableField.length; i++) {
    if (mutableField[i] != null) continue;
    mutableField[i] = currentPlayer;
    children[i] = {};
    if (hasWon(currentPlayer, mutableField)) {
      children[i].value = players[currentPlayer].winMark;
    } else {
      generateNextPossibleMoves(children[i], mutableField, getOpponent(currentPlayer));
    }
    mutableField[i] = null;
  }

  return children;
};

const generateNextPossibleMoves = (node, mutableField, currentPlayer) => {
  const children = generateChildren(mutableField, currentPlayer);

  if (children.length === 0) {
    node.value = 0;
    node.tie = true;
  } else {
    node.value = players[currentPlayer].getBestChild(children);
    node.children = children;
  }
}

export const createTree = () => {
  const mutableField = new Array(CELLS_NUMBER);
  const tree = {};
  generateNextPossibleMoves(tree, mutableField, MAX);

  return tree;
}
