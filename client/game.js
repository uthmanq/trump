
$('.well').mouseenter(function () {
    $(this).css('background-color', '#d6efff');
});
$('.well').mouseleave(function () {
    $(this).css('background-color', 'white');
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var coinFlip = getRandomIntInclusive(0, 1);
if (coinFlip == 1) {
    console.log("yike");
    var tweetA = $.get("/realMessage", function (data) {
    })
        .done(function (data) {

            $('#tweetA').text(data);
        })
        .fail(function () {
            alert("error");
        })
    var tweetB = $.get("/fakeMessage", function (data) {
    })
        .done(function (data) {

            $('#tweetB').text(data);
        })
        .fail(function () {
            alert("error");
        })
    $('#rightSide').click(function () {
        $("#endGameModal").modal({show: true});
    });
    $('#leftSide').click(function () {
        alert('Right!');
        location.reload();
    });
}
else {
    console.log("yike");
    var tweetB = $.get("/realMessage", function (data) {
    })
        .done(function (data) {

            $('#tweetB').text(data);
        })
        .fail(function () {
            alert("error");
        })
    var tweetA = $.get("/fakeMessage", function (data) {
    })
        .done(function (data) {

            $('#tweetA').text(data);
        })
        .fail(function () {
            alert("error");
        })
    $('#leftSide').click(function () {
        $("#endGameModal").modal({show: true});
    });
    $('#rightSide').click(function () {
        alert('Right!');
        location.reload();
    });
}