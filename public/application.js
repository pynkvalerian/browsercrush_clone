  function randomGenerator() {
    return Math.random() * (800 - 1) + 1;
  }

  function popUpBrowser() {
    var categories = ['buildings', 'food', 'nature', 'people', 'technology', 'objects']
    var randCategory = categories[Math.floor(Math.random() * categories.length)];

    $('.container').append("<div class='browser'><div class='panel panel-default'><button class='btn btn-danger pull-right'>x</button><div class='panel-body'><img src='https://source.unsplash.com/category/"+randCategory+"/400x300'></div></div></div>");
    $('.browser').last().css('position', 'absolute').css('top', randomGenerator() + 'px').css('right', randomGenerator() + 'px');
  }

  function gameOver(finalScore) {
    $('.end').css('z-index', '10');
    $('.end').css('background-color', 'rgba(250,250,250,0.8)');
    $('.final-score p').html('Your Score: ' + finalScore);
    $('.final-score').show();
  }

$(document).ready(function(){
  var clickCounter = 0
  var lives = 3

  // hide welcome message on start
  $('#start').on('click', function(){
    $('.intro').hide();

    setInterval(function(){
      popUpBrowser();
    }, 500);

  })

  // removes browser if click on close button
  $('body').on('click', '.btn-danger', function(){
    $(this).parent().parent().remove();
    clickCounter += 1;
    $('#score').text('Score: ' + clickCounter);
  })

  // minus score if click on panel body
  $('body').on('click', '.panel-body', function(){
    lives -= 1;
    $('span.glyphicon#' + lives).attr('class', 'glyphicon glyphicon-heart-empty');
    clickCounter -= 3;
    $('#score').text('Score: ' + clickCounter);

    // if lives is 0, game over!
    if(lives === 0){
      gameOver(clickCounter);
    }
  })

  // restart game
  $('body').on('click', '#restart', function(){
    location.reload();
  })

});