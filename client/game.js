var rightIsReal;
function getInformation() {
    $.get("/Message", function (data) {
    })
        .done(function (data) {
            console.log(typeof (data));
            var x = JSON.parse(data);
            console.log(typeof (x));
            refreshScreen(x)
        })
        .fail(function (error) {
            console.log(error);
        })
}

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
getInformation();

$('#rightSide').click(function () {
    if (rightIsReal) {
        console.log("RIGHT");
        getInformation();
    }
    else {
        $("#endGameModal").modal({ show: true });
    }
});
$('#leftSide').click(function () {
    if (!rightIsReal) {
        alert('right');
        getInformation();
    }
    else {
        $("#endGameModal").modal({ show: true });
    }
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var fiveMinutes = 60 * 5,
        display = $('#time');
    startTimer(fiveMinutes, display);
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

