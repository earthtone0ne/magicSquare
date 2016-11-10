module.exports = function () {
  const size = 3;
  const targetSum = 15;
  this.board = new Array(size).fill(new Array(size).fill(''));
  this.board[2][2] = "EYYYYOHHH"

  this.submitMove = function(x,y){
    let result = this.checkMove(x,y);
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
      if (this.board[i].indexOf('') !== -1){
        return false;
      }
      let sum = 0;
      for (let j = 0; j < size; j++){
        sum+=this.board[j][i];
      }
      if (sum !== targetSum){
        return false;
      }
    }
    return true;
  };

  this.checkRows = function(){
    return true;
  };

  this.checkDiags = function() {
    return true;
  };

};
