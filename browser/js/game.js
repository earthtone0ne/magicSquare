var game = function () {
  const size = 3;
  this.gridSize = size * size;
  const targetSum = 15;

  this.submitMove = function(x,y,val){
    // if (this.board[x][y] || this.usedVals.indexOf(val) >= 0) {
    //   alert('Invalid - select an empty square & unique value.');
    //   return false;
    // }
    this.board[x][y] = val;
    this.usedVals.push(val);
    let result = this.checkMove();
    console.log((result) ? 'Valid move ' + val : 'Game over.');
    this.isGamePlayble = false;
    return result;
  };

// could check only affected rows but not much benefit at this scale
  this.checkMove = function() {
    if (this.checkCols() === false) {
      return false;
    }
    else if (this.checkRows() === false) {
      return false;
    }
    else if (this.checkDiags() === false) {
      return false;
    }
    else return true;
  };

  this.checkSums = function (arrs) {
    return arrs.every(function (arr) {
      let thisSum = arr.reduce(this.add, 0);
      if (thisSum > targetSum || (arr.length === size && thisSum !== targetSum)) {
        return false;
      }
      else {return true;}
    });
  }

  this.checkCols = function() {
    for (let i = 0; i < size; i ++){
      let sum = +this.board[i].reduce(this.add);
      if (sum > targetSum) { return false; }
      if (this.board[i].indexOf('') === -1 && sum !== targetSum) {
        return false;
      }
    }
    return true;
  };

  this.checkRows = function() {
    let rows = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.board[i][j]) {
          rows[j] = rows[j] || [];
          rows[j].push(this.board[i][j]);
        }
      }
    }
    return this.checkSums(rows)
  };

  this.checkDiags = function() {
    let diagUp = [], diagDown = [];
    let lastIndex = size-1;
    for (let i = 0; i < size; i++) {
      if (this.board[i][i]) {
        diagDown.push(this.board[i][i]);
      }
      if (this.board[i][lastIndex-i]){
        diagUp.push(this.board[i][lastIndex-i]);
      }
    }
    return checkSums([diagUp, diagDown]);
  };

  (this.setBoard = function () {
    this.board = [['','',''],['','',''],['','','']];
    this.usedVals = [];
    this.isGamePlayble = true;
    return true;
  })();

  this.add = function (a,b) { return +a + +b; };

  return this;
}();
