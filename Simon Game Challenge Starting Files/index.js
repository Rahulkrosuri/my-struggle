var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function random() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+ randomColor +".mp3");
    audio.play();
}


// $(".red").on("click", function() {
//   var audio = new Audio("sounds/red.mp3");
//     audio.play();
//     $(".red").addClass(".pressed");
//     setTimeout(function() {
//         $('.btn').removeClass('.pressed')
//     }, 100);
// });

// $(".btn").on("click", function() {
// });
