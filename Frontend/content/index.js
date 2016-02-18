$(document).ready()
{
    var my_json;
    $.getJSON("data.json", function (json) {
        redirectData = json;
        var navigateToUrl = redirectData.warUri;
        $('#redirectUrl').text(navigateToUrl);
        $('#redirectUrl').attr('href', navigateToUrl);
        setTimeout(function () { window.location = navigateToUrl; }, 3000);
    });
}