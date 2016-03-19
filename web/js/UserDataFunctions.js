/**
 * Created by Nooblisk on 05.03.2016.
 */

$("#buttonLogOut").click(function() {
    localStorage.clear();
    location.reload();
});

//забирает данные пользователя, записывает их в объект и заполняет поля данными
var synchronizeUserInfoAndFill = function () {
        apiClient.getUser().success(function (UserInfo) {
            spiner.down();
            statusBar();
            apiClient.setUserInfo(UserInfo);
            localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
            userInfoFill(apiClient.UserInfo());
        }).fail(function(xhr){
            apiClient.authFail(xhr, synchronizeUserInfo);
        })
    }
    ;

//забирает данные пользователя и записывает их в объект
var synchronizeUserInfo = function () {
        apiClient.getUser().success(function (UserInfo) {
            spiner.down();
            statusBar();
            apiClient.setUserInfo(UserInfo);
            localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
            reactiveUserInfo.set(UserInfo);
        }).fail(function(xhr){
            apiClient.authFail(xhr, synchronizeUserInfo);
        })
    }
    ;

//Заполняет поля данными
var userInfoFill = function(UserInfo){
    $("#userUsername").text("Пользователь "+UserInfo.user.username);
    $("#userLevel").text("Уровень " + UserInfo.user.level);
    $("#userEmail").text("E-mail "+UserInfo.user.email);
};

