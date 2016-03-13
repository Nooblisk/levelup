/**
 * Created by Nooblisk on 04.03.2016.
 */

$('#templateColumn').on("click", ".ui.feature.update.button", function (e) {
    $("#modalUpdateFeature")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formUpdateFeature.form('reset');
            },
            onApprove: function () {
                formUpdateFeature.form('set value', "featureIdUpdateFeature").val = e.target.dataset.id;
                formUpdateFeature.submit();
                return false;
            }
        })
        .modal('show')
});

var requestUpdateFeature = function (feature, title, description, imageUrl) {
    apiClient.putFeature(feature, title, description, imageUrl).success(function () {
        synchronizeFeatures();
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestUpdateFeature, feature, title, description, imageUrl);
    });
};

//правила для формы добавления фичи
formUpdateFeature
    .form({
        //on: 'blur',
        onSuccess: function () {
            var titleUpdateFeature = formUpdateFeature.form('get field', "titleUpdateFeature").val();
            var descriptionUpdateFeature = formUpdateFeature.form('get field', "descriptionUpdateFeature").val();
            var imageUrlUpdateFeature = formUpdateFeature.form('get field', "imageUrlUpdateFeature").val();
            var featureIdUpdateFeature = formUpdateFeature.form('get value', "featureIdUpdateFeature").val;
            requestUpdateFeature(featureIdUpdateFeature, titleUpdateFeature, descriptionUpdateFeature, imageUrlUpdateFeature);
            formUpdateFeature.form('reset');
            $("#modalUpdateFeature").modal('hide');
            return false;
        },
        fields: {
            titleUpdateFeature: {
                identifier  : 'titleUpdateFeature',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a title'
                    }
                ]
            },
            descriptionUpdateFeature: {
                identifier  : 'descriptionUpdateFeature',
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
            imageUrlUpdateFeature: {
                identifier  : 'imageUrlUpdateFeature',
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