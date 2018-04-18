var rightIsReal;
var gameOn = false;
var timerInterval;
var gameScore = 0;

//Entrypoint
$('#startGame').click(function () {
    var oneMinute = 60 * 1,
        display = $('#time');
    startGame(oneMinute, display);
});

//Queries server to get randoms
function getInformation() {
    $.get("/Message", function (data) {
    })
        .done(function (data) {
            console.log(typeof (data));
            var x = JSON.parse(data);
            console.log(typeof (x));
            //Paints screen
            refreshScreen(x)
        })
        .fail(function (error) {
            console.log(error);
        })
}

//After getting /Message, randomizes which side gets the real tweet
function refreshScreen(answerChoice) {
    var coinFlip = getRandomIntInclusive(0, 1);
    if (coinFlip == 1) {
        $('#tweetA').text(answerChoice.right);
        $('#tweetB').text(answerChoice.wrong);
        rightIsReal = true;
    }
    else {
        $('#tweetA').text(answerChoice.wrong);
        $('#tweetB').text(answerChoice.right);
        rightIsReal = false;
    }
}

$('#rightSide').click(function () {
    //If statement checks if the game is being played at the moment
    if(gameOn){
    if (rightIsReal) {
        getInformation();
        addPoint();
    }
    else {
        $("#endGameModal").modal({ show: true });
    }
}
});
$('#leftSide').click(function () {
    //If statement checks if the game is being played at the moment
    if(gameOn){
    if (!rightIsReal) {
        getInformation();
        addPoint();
    }
    else {
        $("#endGameModal").modal({ show: true });
    }
}
});

//Sets timer, clears past timer, and begins the levels
function startGame(duration, display) {
    //Begins levels
    getInformation();
    //resets timer
    clearInterval(timerInterval);
    //turns game on
    gameOn=true;
    var timer = duration, minutes, seconds;
        //Magic timer code
        timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);
        if (timer == 0)
        {
            $("#endGameModal").modal({ show: true });
            clearInterval(timerInterval);
        }
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function addPoint (){
    gameScore++;
    $('.score').text(gameScore);
}

//Tool to get random number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

