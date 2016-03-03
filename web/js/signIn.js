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
                    firstAuthorization(username1, password1);
                }
            }
        })
        .modal('show')
    ;
});

$(".button.signOut").click(function () {
    localStorage.clear();
    AuthInfo=null;
    location.reload();
});

var firstAuthorization = function (username, password) {
    apiClient.postAuthorization(username, password).success(function (a) {
        AuthInfo = a;
        localStorage.setItem('AuthInfo', JSON.stringify(AuthInfo));
        apiClient.setAccessToken(AuthInfo.access_token);
        apiClient.setRefreshToken(AuthInfo.refresh_token);
        apiClient.getAuthorizationHeaders();
        //requestUser.headers.Authorization = "Bearer " + AuthInfo.access_token;
        //requestUser.Info();
        $("#headerText").text(JSON.stringify(AuthInfo));
        $(".button.signIn").hide();
        $(".button.signOut").show();
        updateFeatures();
    });
};