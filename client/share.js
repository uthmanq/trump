window.fbAsyncInit = function () {
    FB.init({
        appId: '573333563030795',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$('#facebookClick').click(function () { 
    var highScore = getCookie("highscore");
    var shareQuote = "My high score is " + highScore + "! What is your Trump IQ?"
    FB.ui(
        {
            method: 'share',
            href: 'http://mrpresident.io',
            quote: shareQuote
        }, function (response) { });
});
