
$(document).ready(function(){
  // var Game = game();
  $('.gameboard').delegate(".cell",'click',function(){
    var rowNum = parseInt($(this).parent().index())
    var colNum = parseInt($(this).index())
    $(this).css('background-color', 'lightsalmon')
    game.submitMove(+colNum, +rowNum, 0)

  })

})
