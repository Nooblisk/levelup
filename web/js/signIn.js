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



$(".button.signIn").click(function () {
    $("#modalLogin")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onApprove: function () {
                if (username1 == "" || password1 == "") {
                    return false;
                }
                else {
                    AuthObject.firstAuthorization(username1, password1);
                }
            }
        })
        .modal('show')
    ;
});

var firstAuthorization = function (username, password) {
    $.ajax({
        method: this.method,
        url: this.url,
        data: {
            grant_type: "password",
            client_id: this.client_id,
            client_secret: this.client_secret,
            username: username,
            password: password
        }
    }).success(function (a) {
        AuthInfo = a;
        localStorage.setItem('AuthInfo', JSON.stringify(AuthInfo));
        requestUser.headers.Authorization = "Bearer " + AuthInfo.access_token;
        requestUser.Info();
        $("#headerText").text(JSON.stringify(AuthInfo));
        $(".button.signIn").hide();
        $(".button.signOut").show();
        updateFeatures();
    });
};