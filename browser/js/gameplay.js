
$(document).ready(function(){
  var currNum;
  $('.numbers').delegate('div.numTile','dragstart touchend',function(){
    let thisNum = Number($(this)[0].innerText);
    if (game.usedVals.indexOf(thisNum) === -1){
      currNum = thisNum;
      $(this).css('opacity', '0.5')
    }
  })
  $('.numbers').delegate('div.numTile','dragend',deselectNum)

  $('header').on('touchend', deselectNum)

  $('.gameboard').delegate('.cell','dragenter',function(){
    $(this).addClass('dragOver');
  })
  $('.gameboard').delegate('.cell','dragleave',function(){
    $(this).removeClass('dragOver')
  })

  $('.gameboard').delegate('.cell','drop', function(){
    cellSelect($(this))
  })
  $('.gameboard').delegate('.cell','touchend', function(){
    if (currNum) {
      cellSelect($(this))
    }
  })
  function cellSelect(cell){
    var rowNum = parseInt(cell.parent().index());
    var colNum = parseInt(cell.index());
    cell.removeClass('dragOver');
    handleMove(+colNum, +rowNum, currNum, cell);
  }
  function deselectNum(){
    if (game.usedVals.indexOf(currNum) === -1){
      $("#num"+currNum).css('opacity', '1')
    }
    currNum = null;
  }
  function handleMove (col, row, num, elem) {
    if (game.board[col][row] || game.usedVals.indexOf(currNum) >= 0) {
      alert('Invalid - select an empty square & unique value.');
      return false;
    }
    else if (game.submitMove(col, row, num)) {
      elem[0].innerText= currNum;
      $('#num'+currNum).css('opacity', 0);
      if (game.usedVals.length === game.gridSize) {
        alert('Fantastic!  You\'ve won!');
        endGame();
      }
      return true;
    }
    else {
      alert('Wrong move. This game is over, bub. \nClick to restart.')
      endGame();
    }
  }
  function endGame() {
    game.setBoard();
    $('.cell').text('');
    $('.numTile').css('opacity', 1);
  }

})
