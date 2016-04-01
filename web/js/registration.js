/**
 * Created by Nooblisk on 20.03.2016.
 */



$("#buttonRegister").click(function () {
    $("#modalRegistration").modal({
            onApprove: function () {
                formRegistration.submit();
                return false;
            },
            onDeny: function () {
                formRegistration.form('reset');
            }
        })
        .modal('show')
    ;
});



var registration = function (email, username, firstPassword, secondPassword){
apiClient.postRegistration(email, username, firstPassword, secondPassword).success(function(){
    spiner.drop();
    statusBar();
    firstAuthorization(username, firstPassword);
})

};


//правила для формы регистрации
formRegistration.form({
    onSuccess: function () {
        var emailRegister = formRegistration.form('get value', "emailRegister");
        var usernameRegister = formRegistration.form('get value', "usernameRegister");
        var passwordRegister = formRegistration.form('get value', "passwordRegister");
        var passwordRepeatRegister = formRegistration.form('get value', "passwordRepeatRegister");
        registration(emailRegister, usernameRegister, passwordRegister, passwordRepeatRegister);
        //console.log(emailRegister, usernameRegister, passwordRegister, passwordRepeatRegister);
        $("#modalRegistration").modal('hide');
        formRegistration.form('reset');
        return false;
    },
    fields: {
        emailRegister: {
            identifier: 'emailRegister',
            rules: [
                {
                    type: 'email',
                    prompt: 'Please enter a valid e-mail'
                }
            ]
        },
        usernameRegister: {
            identifier: 'usernameRegister',
            rules: [
                {
                    type: 'minLength[4]',
                    prompt: 'Please enter at least 4 characters'
                }
            ]
        },
        passwordRegister: {
            identifier: 'passwordRegister',
            rules: [
                {
                    type: 'minLength[4]',
                    prompt: 'Please enter at least 4 characters'
                }
            ]
        },
        passwordRepeatRegister: {
            identifier: 'passwordRepeatRegister',
            rules: [
                {
                    type: 'match[passwordRegister]',
                    prompt: 'Please put the same value in both fields'
                }
            ]
        }
    }

})
;
