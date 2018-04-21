var rightIsReal;
var gameOn = false;
var timerInterval;
var gameScore = 0;


//Entrypoint
$('#startGame').click(function () {
    var oneMinute = 60 * 1,
        display = $('#time');
    $('#startGameText').text("Restart");
    startGame(oneMinute, display);
});

$('#restartGame').click(function () {
    var oneMinute = 60 * 1,
        display = $('#time');
    startGame(oneMinute, display);
    $('#endGameModal').modal('hide');
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
    if (gameOn) {
        if (rightIsReal) {
            getInformation();
            addPoint();
        }
        else {
            endGame("Game Over!");
        }
    }
});
$('#leftSide').click(function () {
    //If statement checks if the game is being played at the moment
    if (gameOn) {
        if (!rightIsReal) {
            getInformation();
            addPoint();
        }
        else {
            endGame("Game Over!");
        }
    }
});

$("#endGameModal").on("hidden.bs.modal", function () {
    if (!gameOn) {
        location.reload();
    }
});

//Sets timer, clears past timer, and begins the levels
function startGame(duration, display) {
    gameScore = 0;
    $('.score').text(gameScore);
    //Begins levels
    getInformation();
    //resets timer
    clearInterval(timerInterval);
    //turns game on
    gameOn = true;
    var timer = duration, minutes, seconds;
    //Magic timer code
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);
        if (timer == 0) {
            endGame("Time's up!");
        }
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function addPoint() {
    gameScore++;
    $('.score').text(gameScore);
    var highScore = getCookie("highscore");
    if (gameScore >= highScore) {
        setCookie("highscore", gameScore);
    }
    $('.highScore').text(getCookie("highscore").toString());

}

function endGame(endType) {
    checkHighScore();
    $('#modalTitle').text(endType);
    gameOn = false;
    $("#endGameModal").modal({ show: true });
    clearInterval(timerInterval);
}

//Tool to get random number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkHighScore() {
    var highScore = getCookie("highscore");
    if (highScore == "") {
        alert("High score is not set");
        setCookie("highscore", "0");
    }
}