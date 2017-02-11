
$(document).ready(function(){
  var currNum;
  $('.numbers').delegate('div.numTile','dragstart',function(){
    currNum = Number($(this)[0].innerText);
    $(this).css('opacity', '0.5')
  })
  $('.numbers').delegate('div.numTile','dragend',function(){
    if (game.usedVals.indexOf(currNum) === -1){
      $(this).css('opacity', '1')
    }
  })

  $('.gameboard').delegate('.cell','dragenter',function(){
    $(this).addClass('dragOver');
  })
  $('.gameboard').delegate('.cell','dragleave',function(){
    $(this).removeClass('dragOver')
  })

  $('.gameboard').delegate('.cell','drop', function(){
    var rowNum = parseInt($(this).parent().index());
    var colNum = parseInt($(this).index());
    $(this).removeClass('dragOver');
    handleMove(+colNum, +rowNum, currNum, $(this));
  })

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
