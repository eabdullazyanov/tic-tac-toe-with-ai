const CELLS_NUMBER = 9;

const hasWon = (playerIndex, field) => {
  const rows = [0, 0, 0];
  const cols = [0, 0, 0];
  const diagonals = [0, 0];
  for (let i = 0; i < CELLS_NUMBER; i++) {
    if (field[i] !== playerIndex) continue;

    const rowIndex = Math.floor(i / 3);
    rows[rowIndex]++;
    if (rows[rowIndex] === 3) return true;

    const colIndex = i % 3;
    cols[colIndex]++;
    if (cols[colIndex] === 3) return true;

    if (colIndex === rowIndex) diagonals[0]++;
    if (diagonals[0] === 3) return true;

    if (colIndex + rowIndex === 3 - 1) diagonals[1]++;
    if (diagonals[1] === 3) return true;
  }

  return false;
}

export const createTree = () => {
  const generateChildren = (node, field, playerIndex) => {
    const children = [];
    for (let i = 0; i < field.length; i++) {
      if (field[i] != null) continue;
      field[i] = playerIndex;
      children[i] = {
        value: 0,
      };
      if (hasWon(playerIndex, field)) {
        children[i].value = playerIndex === 0 ? 10 : -10;
        node.value = children[i].value;
      } else {
        const nextPlayerIndex = playerIndex === 0 ? 1 : 0;
        generateChildren(children[i], field, nextPlayerIndex);
      }
      field[i] = null;
    }
    node.children = children;

    return node;
  }

  const currentField = new Array(CELLS_NUMBER);
  const tree = generateChildren({}, currentField, 0);

  return tree;
}
