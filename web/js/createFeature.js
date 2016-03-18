/**
 * Created by Nooblisk on 03.03.2016.
 */

templateList.on("click", "#buttonCreateFeature", function () {
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
        spiner.down();
        statusBar();
        featureAdd(title, description, imageUrl);
        synchronizeFeatures();
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestCreateFeature, title, description, imageUrl);
    });
};

//правила для формы добавления фичи
formCreateFeature
    .form({
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
                    }
                ]
            },
            imageUrlCreateFeature: {
                identifier  : 'imageUrlCreateFeature',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter an imageUrl'
                    }
                ]
            }

        }
    })
;

var featureIdForNew = function () {
    var biggerId = 0;
    for (var i = 0; i < apiClient.FeatureInfo().features.length; i++) {
        if (apiClient.FeatureInfo().features[i].id > biggerId) {
            biggerId = apiClient.FeatureInfo().features[i].id;
        }
    }
    return biggerId + 1;
};

var featureAdd = function (title, description, imageUrl) {
    var newFeatureObj = {};
    newFeatureObj.id = featureIdForNew();
    newFeatureObj.title = title;
    newFeatureObj.description = description;
    newFeatureObj.image_url = imageUrl;
    newFeatureObj.level = 0;

    $(".item.feature").last().after(template(newFeatureObj));

    templateColumn.append(template2(newFeatureObj));


    $('#itemFeature'+newFeatureObj.id)
        .tab()
    ;

    $("#itemFeature"+newFeatureObj.id).click(function () {
        $.tab('change tab', this.dataset.id);
        if (apiClient.isQuesterized(this.dataset.id)) {
            questsFill(this.dataset.id);
        }
        else {
            synchronizeQuestsAndFill(this.dataset.id);
        }


    });

};