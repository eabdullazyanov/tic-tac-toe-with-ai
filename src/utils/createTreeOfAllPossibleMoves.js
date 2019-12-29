function createTreeOfAllPossibleMoves(fieldSize, players, ownerPlayerIndex){
  const cellsNumber = fieldSize ** 2;
  const field = new Array(cellsNumber).fill(null);
  let playerIndex = 0;
  const playersOccupation = players.map(() => ({
    byRows: new Array(fieldSize).fill(0),
    byCols: new Array(fieldSize).fill(0),
    byDiagonals: [0, 0],
  }));

  function buildAllPossibleNextMoves(node){
    let winChancesSum = 0;
    let guaranteedWin = false;
    let occupiedCellsNumber = 0;
    for (let i = 0; i < cellsNumber; i++) {
      if (field[i]) continue;
      occupiedCellsNumber++;
      const row = Math.floor(i / fieldSize);
      const col = i % fieldSize;
      field[i] = true;

      let hasWon = false;
      hasWon = ++playersOccupation[playerIndex].byRows[row] === fieldSize || hasWon;
      hasWon = ++playersOccupation[playerIndex].byCols[col] === fieldSize || hasWon;
      if (col === row) {
        hasWon = ++playersOccupation[playerIndex].byDiagonals[0] === fieldSize || hasWon;
      }
      if (col + row === fieldSize - 1) {
        hasWon = ++playersOccupation[playerIndex].byDiagonals[1] === fieldSize  || hasWon;
      }

      node[i] = {};
      if (hasWon) {
        if (playerIndex === ownerPlayerIndex) {
          node[i].win = true;
          guaranteedWin = true;
        } else {
          node[i].lose = true;
        }
      } else {
        ++playerIndex >= players.length && (playerIndex = 0);
        node[i].winChance = buildAllPossibleNextMoves(node[i]);
        --playerIndex === -1 && (playerIndex = players.length - 1);
        winChancesSum += node[i].winChance;
        if (node[i].winChance === 1 && playerIndex === ownerPlayerIndex) guaranteedWin = true; // ?
      }

      field[i] = null;
      --playersOccupation[playerIndex].byRows[row];
      --playersOccupation[playerIndex].byCols[col]
      --playersOccupation[playerIndex].byDiagonals[0];
      --playersOccupation[playerIndex].byDiagonals[1];
    }

    if (occupiedCellsNumber === 0) {
      node.draw = true;
      return .5;
    }

    if (guaranteedWin) return 1;

    return winChancesSum / occupiedCellsNumber;
  }

  const tree = {};
  buildAllPossibleNextMoves(tree);

  return tree;
}

export default createTreeOfAllPossibleMoves;
