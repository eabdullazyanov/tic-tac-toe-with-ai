/* eslint-disable no-param-reassign */

import { CELLS_NUMBER, MAX } from '../constants';
import { hasWon, getOpponent, getBestChildValue } from '.';

function generateChildren(mutableField, currentPlayer) {
  const children = [];

  for (let i = 0; i < mutableField.length; i++) {
    if (mutableField[i] != null) continue;
    mutableField[i] = currentPlayer;
    children[i] = {};
    if (hasWon(currentPlayer, mutableField)) {
      children[i].value = currentPlayer;
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
  } else {
    node.value = getBestChildValue(currentPlayer, children);
    node.children = children;
  }
}

function createMinimaxTree() {
  const mutableField = new Array(CELLS_NUMBER);
  const tree = {};
  generateNextPossibleMoves(tree, mutableField, MAX);

  return tree;
}

const minimaxTree = createMinimaxTree();

export default minimaxTree;
