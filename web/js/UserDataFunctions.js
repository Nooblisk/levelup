/**
 * Created by Nooblisk on 05.03.2016.
 */

//$("#buttonUserInfo").click(function(){
//    $("#modalUserInfo").modal({
//            onApprove: function () {
//                localStorage.clear();
//                //templateList.empty();
//                //templateColumn.empty();
//                location.reload();
//            }
//        })
//        .modal('show')
//    ;
//});
$("#buttonLogOut").click(function() {
    localStorage.clear();
    location.reload();
});


//забирает данные пользователя и отображает
var synchronizeUserInfo = function () {
        apiClient.getUser().success(function (UserInfo) {
            spiner.down();
            statusBar();
            apiClient.setUserInfo(UserInfo);
            localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
            userInfoFill();
        }).fail(function(xhr){
            apiClient.authFail(xhr, synchronizeUserInfo);
        })
    }
    ;

//отображает данные пользователя
var userInfoFill = function(){
    var UserInfo = apiClient.UserInfo();
    $("#userUsername").text("Пользователь "+UserInfo.user.username);
    $("#userLevel").text("Уровень " + UserInfo.user.level);
    $("#userEmail").text("E-mail "+UserInfo.user.email);
   // $("#buttonUserInfo").text(UserInfo.user.username+" "+UserInfo.user.level);
};

