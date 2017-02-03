$(document).ready(function(){
  $('.gameboard').delegate(".cell",'click',function(){
    var rowNum = parseInt($(this).parent().index())
    var colNum = parseInt($(this).index())
    $(this).css('background-color', 'lightsalmon')
    console.log(rowNum, colNum)
  })

})
