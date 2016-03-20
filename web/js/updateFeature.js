/**
 * Created by Nooblisk on 04.03.2016.
 */

$('#templateColumn').on("click", ".ui.feature.update.button", function () {
    var feature = $(this).data("id");
    var featureOrder = apiClient.featureOrder(feature);
    formUpdateFeature.form('set values', {
        featureIdUpdateFeature: feature,
        titleUpdateFeature: apiClient.FeatureInfo().features[featureOrder].title,
        descriptionUpdateFeature: apiClient.FeatureInfo().features[featureOrder].description,
        imageUrlUpdateFeature: apiClient.FeatureInfo().features[featureOrder].image_url
    });

    $("#modalUpdateFeature")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formUpdateFeature.form('reset');
            },
            onApprove: function () {
                formUpdateFeature.submit();
                return false;
            }
        })
        .modal('show')
});

var requestUpdateFeature = function (feature, title, description, imageUrl) {
    apiClient.putFeature(feature, title, description, imageUrl).success(function () {
        spiner.down();
        statusBar();
        featureChange(feature, title, description, imageUrl);
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestUpdateFeature, feature, title, description, imageUrl);
    });
};

//правила для формы добавления фичи
formUpdateFeature
    .form({
        onSuccess: function () {
            var titleUpdateFeature = formUpdateFeature.form('get value', "titleUpdateFeature");
            var descriptionUpdateFeature = formUpdateFeature.form('get value', "descriptionUpdateFeature");
            var imageUrlUpdateFeature = formUpdateFeature.form('get value', "imageUrlUpdateFeature");
            var featureIdUpdateFeature = formUpdateFeature.form('get value', "featureIdUpdateFeature");
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
                    },
                    {
                        type   : 'minLength[2]',
                        prompt : 'Title must be at least {ruleValue} characters'
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
                        type   : 'minLength[2]',
                        prompt : 'Description must be at least {ruleValue} characters'
                    }
                ]
            },
            imageUrlUpdateFeature: {
                identifier  : 'imageUrlUpdateFeature',
                rules: [
                    {
                        type   : 'url',
                        prompt : 'Please enter a url'
                    }
                ]
            }

        }
    })
;



var featureChange = function(feature, title, description, imageUrl){

    var featureOrder = apiClient.featureOrder(feature);
    apiClient.FeatureInfo().features[featureOrder].title = title;
    apiClient.FeatureInfo().features[featureOrder].description = description;
    apiClient.FeatureInfo().features[featureOrder].image_url = imageUrl;
    localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));
    reactiveFeatureInfo.set(apiClient.FeatureInfo());


};