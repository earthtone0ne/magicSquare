module.exports = function () {
  const size = 3;
  const targetSum = 15;
  this.board = [['','',''],['','',''],['','','']];
  this.usedVals = [];

  this.submitMove = function(x,y,val){
    if (this.board[x][y] || this.usedVals.indexOf(val) >= 0) {
      return alert('Invalid - select an empty square & unique value.');
    }
    this.board[x][y] = val;
    this.usedVals.push(val);
    let result = this.checkMove();
    alert(result);
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

  this.checkCols = function() {
    for (let i = 0; i < size; i ++){
      //the below tested >= 0?? Changing to eq -1
      if (this.board[i].indexOf('') === -1) {
        let sum = +this.board[i].reduce(this.add);
        if (sum !== targetSum) {
          return false;
        }
      }
    }
    return true;
  };

  this.checkRows = function() {
    let sums = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.board[i][j]) {
          sums[j] = sums[j] || [];
          sums[j].push(this.board[i][j]);
        }
      }
    }
    sums.forEach(function (arr) {
      let rowSum = arr.reduce(this.add);
      if (arr.length === size && rowSum !== targetSum) {
        return false;
      }
    });
    return true;
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
    if (diagUp.length === size) {
      diagUp.sum = diagUp.reduce(this.add);
      if (diagUp.sum !== targetSum) { return false; }
    }
    if (diagDown.length === size) {
      diagDown.sum = diagDown.reduce(this.add);
      if (diagDown.sum !== targetSum) { return false; }
    }
    return true;
  };
  this.add = function (a,b) { return +a + +b; };

  return this;
};
