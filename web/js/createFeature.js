/**
 * Created by Nooblisk on 03.03.2016.
 */

templateList.on("click", "#buttonCreateFeature", function (e) {
    $("#modalCreateFeature")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formCreateFeature.form('reset');
            },
            onApprove: function () {
                formCreateFeature.submit();
                return false;
            }
        })
        .modal('show')
});


var requestCreateFeature = function (title, description, imageUrl) {
    apiClient.postFeature(title, description, imageUrl).
    success(function () {
        synchronizeFeatures();
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestCreateFeature, title, description, imageUrl);
    });
};

//правила для формы добавления фичи
formCreateFeature
    .form({
        //on: 'blur',
        onSuccess: function () {
            var titleCreateFeature = formCreateFeature.form('get field', "titleCreateFeature").val();
            var descriptionCreateFeature = formCreateFeature.form('get field', "descriptionCreateFeature").val();
            var imageUrlCreateFeature = formCreateFeature.form('get field', "imageUrlCreateFeature").val();
            requestCreateFeature(titleCreateFeature, descriptionCreateFeature, imageUrlCreateFeature);
            formCreateFeature.form('reset');
            $("#modalCreateFeature").modal('hide');
            return false;
        },
        fields: {
            titleCreateFeature: {
                identifier  : 'titleCreateFeature',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a title'
                    }
                ]
            },
            descriptionCreateFeature: {
                identifier  : 'descriptionCreateFeature',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a description'
                    },
                    {
                        type   : 'minLength[4]',
                        prompt : 'Please enter at least 4 characters'
                    }
                ]
            },
            imageUrlCreateFeature: {
                identifier  : 'imageUrlCreateFeature',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a imageUrl'
                    }
                ]
            }

        }
    })
;