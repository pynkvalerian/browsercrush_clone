function randomGenerator(direction) {
  if(direction == 'width') {
    return Math.floor(Math.random() * (window.screen.width + 1));
  } else {
    return Math.floor(Math.random() * (window.screen.height + 1)) + 80;
  }
}

function popUpFlag() {
  $('.game').append("<div class='flag'><img src='" + window.location.href + "flags/malaysia.svg" + "' width='100px'></div>");
  $('.flag').last().css('position', 'absolute').css('top', randomGenerator('height') + 'px').css('right', randomGenerator('width') + 'px');
}

function popUpForeignFlag() {
  foreignFlags = [
    "",
    "flags/indonesia.svg",
    "flags/singapore.svg",
    "flags/thailand.svg"
  ]
  randomInt = Math.floor(Math.random() * (foreignFlags.length - 1)) + 1;

  $('.game').append("<div class='foreign-flag'><img src='" + window.location.href + foreignFlags[randomInt] + "' width='100px'></div>");
  $('.foreign-flag').last().css('position', 'absolute').css('top', randomGenerator('height') + 'px').css('right', randomGenerator('width') + 'px');
}

function shareButtonDimensions(id) {
  $(id).css('height', '100px');
  $(id).css('width', '100px');
}

function gameOver(finalScore) {
  $('body').css('position', 'static');
  $('.end').css('z-index', '10');
  $('.end').css('background-color', 'rgba(250,250,250,0.9)');
  $('h2#final-score').text(finalScore);
  $('.final-score').show();
  shareButtonDimensions('.fb-share-button')
  shareButtonDimensions('.fb-share-button span')
  shareButtonDimensions('.fb-share-button span iframe')
}

function moveBody() {
  $('body').css('position', 'relative');
  var direction = ['top', 'bottom', 'left', 'right']
  setInterval(function(){
    var randDirection = direction[Math.floor(Math.random() * direction.length)];
    var randNumber = Math.random()*10
    $('body').css(randDirection, randNumber);
  },10)
}

$(document).ready(function(){
  var clickCounter = 0
  var timer = 15

  // hide welcome message on start
  $('#start').on('click', function(){
    $('.intro').hide();

    // start countdown timer
    var countDown = setInterval(function(){
      timer = timer - 1
      $('h2#timer').text(timer);

      if (timer === 0) {
        clearInterval(countDown)
        gameOver(clickCounter);
      } else if (timer < 5) {
        $('.timer').css('color', 'red')
        moveBody()
      }
    },1000)

    setInterval(function(){
      popUpFlag();
    }, 200);

    setInterval(function(){
      popUpForeignFlag();
    }, 400);
  })

  // removes flag + add score if click on malaysian flag
  $('body').on('click', '.flag', function(){
    $(this).remove();
    clickCounter += 1;
    $('#score').text(clickCounter);
  })

  // removes flag + minus score if click on foreign flag
  $('body').on('click', '.foreign-flag', function(){
    $(this).remove();
    clickCounter -= 1;
    $('#score').text(clickCounter);
  })

  // restart game
  $('body').on('click', '#restart', function(){
    location.reload();
  })
});
