/**
 * Created by Nooblisk on 03.03.2016.
 */

//по клику запускает овно логина
$(".button.signIn").click(function () {
    $("#modalLogin").modal({
            onApprove: function () {
                $('.form.authorization').submit();
                return false;
            }
            //.modal({
            //    autofocus: true,
            //    transition: 'fade down',
            //    onShow: function(){
            //        $("#loginInput").val("");
            //        $("#passwordInput").val("");
            //    },
            //    onApprove: function () {
            //        var username1 = $("#loginInput").val();
            //        var password1 = $("#passwordInput").val();
            //        if (username1 == "" || password1 == "") {
            //            return false;
            //        }
            //        else {
            //            firstAuthorization(username1, password1);
            //        }
            //    }
        })
        .modal('show')
    ;
});

//правила для формы авторизации
$('.form.authorization')
    .form({
        //on: 'blur',
        onSuccess: function () {
            var logintest = $('.form.authorization').form('get field', "login").val();
            var passwordtest = $('.form.authorization').form('get field', "password").val();
            firstAuthorization(logintest, passwordtest);
        },
        fields: {
            login: {
                identifier  : 'login',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a login'
                    }
                ]
            },
            password: {
                identifier  : 'password',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a password'
                    },
                    {
                        type   : 'minLength[4]',
                        prompt : 'Please enter at least 4 characters'
                    }
                ]
            }

        }
    })
;



//по клику чистит данные и обновляет страницу
$(".button.signOut").click(function () {
    localStorage.clear();
    location.reload();
});

//первичная авторизация
var firstAuthorization = function (username, password) {
    apiClient.postAuthorization(username, password).success(function (a) {
        apiClient.setAuthInfo(a);
        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
        $("#headerText").text(JSON.stringify(apiClient.AuthInfo()));
        $("#modalLogin").modal('hide');
        $(".button.signIn").hide();
        $(".button.signOut").show();
        updateFeatures();
    });
};



