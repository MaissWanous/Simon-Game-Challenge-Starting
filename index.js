var colors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  level++;
  $("h1").text("level " + level);
  var randomIndex = Math.floor(Math.random() * 4);
  var randomColor = colors[randomIndex];
  gamePattern.push(randomColor);
  var i = gamePattern.length - 1;
  var color = gamePattern[i];
  $("#" + color).delay(10).fadeOut().fadeIn('slow');
  playSounds(color);

};


var cin = $(".btn").click(function () {
  clk = $(this).attr("id");
  userClickedPattern.push(clk);
  var i = userClickedPattern.length - 1;
  var color = userClickedPattern[i];
  $(this).delay(10).fadeOut().fadeIn('slow');
  playSounds(color);
  animatePress(this);
  checkAnswer(i);
});

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(
    () => {
      $(currentColour).removeClass("pressed");
    }
    , 100);
}


function playSounds(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

 

    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    started=false;
    $("body").addClass("game-over");
    setTimeout(
      () => {
        $("body").removeClass("game-over")
      }
      , 200);
    level=0;
    $("h1").text(" Game Over, Press Any Key to Restart");
    userClickedPattern = [];
     gamePattern = [];
  } 
  
}

