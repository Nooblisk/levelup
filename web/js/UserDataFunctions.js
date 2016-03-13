/**
 * Created by Nooblisk on 05.03.2016.
 */

$("#buttonUserInfo").click(function(){
    $("#modalUserInfo").modal({
            onApprove: function () {
                localStorage.clear();
                location.reload();
            }
        })
        .modal('show')
    ;
});



//забирает данные пользователя и отображает
var synchronizeUserInfo = function () {
        apiClient.getUser().success(function (UserInfo) {
            apiClient.setUserInfo(UserInfo);
            localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
            userInfoFill();
        })
    }
    ;

//отображает данные пользователя
var userInfoFill = function(){
    var UserInfo = apiClient.UserInfo();
    $("#userUsername").text(UserInfo.user.username);
    $("#userLevel").text("Уровень " + UserInfo.user.level);
    $("#userEmail").text(UserInfo.user.email);
};

