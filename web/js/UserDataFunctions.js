/**
 * Created by Nooblisk on 05.03.2016.
 */



//забирает и отображает данные пользователя
var requestUserInfo = function () {
        apiClient.getUser().success(function (UserInfo) {
            console.log(UserInfo);
            $("#userUsername").text(UserInfo.user.username);
            $("#userLevel").text("Уровень " + UserInfo.user.level);
            $("#userEmail").text(UserInfo.user.email);
        })
    }
    ;

