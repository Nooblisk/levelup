/**
 * Created by Nooblisk on 03.03.2016.
 */

//по клику запускает овно логина
$("#buttonSignIn").click(function () {
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



//первичная авторизация
var firstAuthorization = function (username, password) {
    apiClient.postAuthorization(username, password).success(function (a) {
        spiner.drop();
        statusBar();
        apiClient.setAuthInfo(a);
        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
        $("#headerText").text(JSON.stringify(apiClient.AuthInfo()));
        $("#buttonSignIn").hide();
        $("#buttonUserInfo").show();
        buttonLeftMenu.show();
        buttonRefresh.show();

        synchronizeFeaturesAndFill();
        synchronizeUserInfo();
        $('.ui.sidebar').sidebar({
            dimPage: false,
            closable: false
        }).sidebar('show');
        $('.item.feature').first().click();
    });
};



