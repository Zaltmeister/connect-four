import _ from 'lodash';

const strategy = (cols, player, currentCol) => {
  const winCondition = [player, player, player, player];

  //todo: implement dynamic col and row count

  // check for 4 in a column
  const col = cols[currentCol];
  if (_.isEqual(col.slice(-4), winCondition)) {
    return 1;
  }
  // Get min and max indexes to look for 4 in a row
  const mincurrentCol = Math.max(currentCol - 3, 0);
  const maxcurrentCol = Math.min(currentCol + 3, 6);
  // Get index of the row where the piece was placed
  const rowIndex = cols[currentCol].length - 1;
  //check for 4 in a row
  const row = [];
  cols.map(column => row.push(column[rowIndex]));
  for (
    let i = mincurrentCol;
    i <= mincurrentCol + 3 && i <= maxcurrentCol - 3;
    i++
  ) {
    const fourToCheck = row.slice(i, i + 4);
    if (_.isEqual(fourToCheck, winCondition)) {
      return 1;
    }
  }

  //check for 4 in a diagonal
  for (
    let i = mincurrentCol;
    i <= mincurrentCol + 3 && i <= maxcurrentCol - 3;
    i++
  ) {
    const colOffset = Math.abs(currentCol - i);
    const diagonalUpLeft = [
      cols[i] ? cols[i][rowIndex + colOffset] : null,
      cols[i + 1] ? cols[i + 1][rowIndex + colOffset - 1] : null,
      cols[i + 2] ? cols[i + 2][rowIndex + colOffset - 2] : null,
      cols[i + 3] ? cols[i + 3][rowIndex + colOffset - 3] : null
    ];
    if (_.isEqual(diagonalUpLeft, winCondition)) {
      return 1;
    }
    const diagonalDownLeft = [
      cols[i] ? cols[i][rowIndex - colOffset] : null,
      cols[i + 1] ? cols[i + 1][rowIndex - (colOffset - 1)] : null,
      cols[i + 2] ? cols[i + 2][rowIndex - (colOffset - 2)] : null,
      cols[i + 3] ? cols[i + 3][rowIndex - (colOffset - 3)] : null
    ];
    if (_.isEqual(diagonalDownLeft, winCondition)) {
      return 1;
    }
  }
  // todo: Tie if board is filled
  const tie = cols.reduce((acc, column) => acc && column.length === 6, true);
  if (tie) {
    return 3;
  }
  return 0;
};

export default strategy;
