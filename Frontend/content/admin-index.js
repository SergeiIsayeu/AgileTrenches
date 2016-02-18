$(document).ready()
{
    $('#warForm').submit(function (e) {
        e.preventDefault();
        var request = JSON.stringify($('#warForm').serializeObject());
        $.post("https://y953hzyw9c.execute-api.us-east-1.amazonaws.com/prod", request, function (data) {
            var response = JSON.parse(data);
            if (response.isSuccessful)
                $('#infoLabel').attr('class', 'label label-success');
            else
                $('#infoLabel').attr('class', 'label label-danger');
            $('#infoLabel').text(response.message);
        });
        return false;
    });
    //    var my_json;
    //    $.getJSON("data.json", function (json) {
    //        redirectData = json;
    //        var navigateToUrl = redirectData.clashCallerUri + redirectData.warId;
    //        $('#redirectUrl').text(navigateToUrl);
    //        $('#redirectUrl').attr('href', navigateToUrl);
    //        setTimeout(function () { window.location = navigateToUrl; }, 3000);
    //    });
    //}
}
// api url: https://y953hzyw9c.execute-api.us-east-1.amazonaws.com/prod

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};