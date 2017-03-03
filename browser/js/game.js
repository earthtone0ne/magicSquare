var game = function() {
  const targetSum = 15;
  const size = 3;
  this.gridSize = size * size;

  this.submitMove = (x,y,val) => {
    this.board[x][y] = val;
    this.usedVals.push(val);
    let result = this.checkMove();
    console.log((result) ? 'Valid move ' + val : 'Game over.');
    return result;
  };

// could check only affected rows but not much benefit at this scale
  this.checkMove = () => {
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

  this.checkSums = (arrs) => {
    return arrs.every(function (arr) {
      let filteredArr = arr.filter(this.notEmpty)
      let thisSum = filteredArr.reduce(this.add, 0);
      if (thisSum > targetSum || (filteredArr.length === size && thisSum !== targetSum)) {
        return false;
      }
      else {return true;}
    });
  };

  this.checkCols = () =>  this.checkSums(this.board);

  this.checkRows = () => {
    let rows = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.board[i][j]) {
          rows[j] = rows[j] || [];
          rows[j].push(this.board[i][j]);
        }
      }
    }
    return this.checkSums(rows);
  };

  this.checkDiags = () => {
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
    return this.checkSums([diagUp, diagDown]);
  };

  this.add = (a,b) => { return +a  + +b; };
  this.notEmpty = (e) => e !== '' ;

  (this.setBoard = () => {
    this.board = [['','',''],['','',''],['','','']];
    this.usedVals = [];
    return true;
  })();

  return this;
}();
