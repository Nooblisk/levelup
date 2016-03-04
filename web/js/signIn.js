/**
 * Created by Nooblisk on 03.03.2016.
 */
$(".button.signIn").click(function () {
    $("#modalLogin")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onShow: function(){
                $("#loginInput").val("");
                $("#passwordInput").val("");
            },
            onApprove: function () {
                var username1 = $("#loginInput").val();
                var password1 = $("#passwordInput").val();
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
    location.reload();
});

var firstAuthorization = function (username, password) {
    apiClient.postAuthorization(username, password).success(function (a) {
        apiClient.setAuthInfo(a);
        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
        $("#headerText").text(JSON.stringify(apiClient.AuthInfo()));
        $(".button.signIn").hide();
        $(".button.signOut").show();
        updateFeatures();
    });
};