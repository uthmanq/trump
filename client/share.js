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
    console.log("button clicked");
    FB.ui(
        {
            method: 'share',
            href: 'http://mrpresident.io'
        }, function (response) { });
});
