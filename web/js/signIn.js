/**
 * Created by Nooblisk on 03.03.2016.
 */

//по клику запускает овно логина
$(".button.signIn").click(function () {
    $("#modalAuthorization").modal({
            onApprove: function () {
                formAuthorization.submit();
                return false;
            }
        })
        .modal('show')
    ;
});

//правила для формы авторизации
formAuthorization
    .form({
        //on: 'blur',
        onSuccess: function () {
            var login = formAuthorization.form('get field', "login").val();
            var password = formAuthorization.form('get field', "password").val();
            firstAuthorization(login, password);
            $("#modalAuthorization").modal('hide');
            return false;
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
    //localStorage.clear();
    localStorage.removeItem('AuthInfo');
    location.reload();
});

//первичная авторизация
var firstAuthorization = function (username, password) {
    apiClient.postAuthorization(username, password).success(function (a) {
        apiClient.setAuthInfo(a);
        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
        $("#headerText").text(JSON.stringify(apiClient.AuthInfo()));
       // $("#modalLogin").modal('hide');
        $(".button.signIn").hide();
        $(".button.signOut").show();
        synchronizeFeatures();
        synchronizeUserInfo();

        //updateFeatures();
    });
};



