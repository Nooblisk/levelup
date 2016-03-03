/**
 * Created by Nooblisk on 03.03.2016.
 */
$("#loginInput")
    .keyup(function () {
        username1 = $(this).val();
    }).keyup();

$("#passwordInput")
    .keyup(function () {
        password1 = $(this).val();
    }).keyup();



$("#buttonSignIn").click(function () {
    $("#modalLogin")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onApprove: function () {
                if (username1 == "" || password1 == "") {
                    return false;
                }
                else {
                    firstAuthorization();
                }
            }
        })
        .modal('show')
    ;
});

var firstAuthorization = function () {
    $.ajax({
        method: "POST",
        url: "/app_dev.php/api/oauth/v2/token",
        data: {
            grant_type: "password",
            client_id: "1_web",
            client_secret: "web",
            username: username1,
            password: password1
        }
    }).success(function (a) {
        AuthInfo = a;
        localStorage.setItem('AuthInfo', JSON.stringify(AuthInfo));
        $("#headerText").text(JSON.stringify(AuthInfo));
        $("#buttonSignIn").fadeOut();
        updateFeatures();
    });
};