/* eslint-disable no-param-reassign */

import { CELLS_NUMBER, MAX, MIN } from '../constants';
import { hasWon, getOpponent } from '.';

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
};

function generateChildren(mutableField, currentPlayer) {
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
}

function generateNextPossibleMoves(node, mutableField, currentPlayer) {
  const children = generateChildren(mutableField, currentPlayer);

  if (children.length === 0) {
    node.value = 0;
    node.tie = true;
  } else {
    node.value = players[currentPlayer].getBestChild(children);
    node.children = children;
  }
}

export default function createMinimaxTree() {
  const mutableField = new Array(CELLS_NUMBER);
  const tree = {};
  generateNextPossibleMoves(tree, mutableField, MAX);

  return tree;
}
