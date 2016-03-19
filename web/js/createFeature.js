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

//запрашиваем создание новой фичи, запускаем её отрисовку и синхронизируем данные
var requestCreateFeature = function (title, description, imageUrl) {
    apiClient.postFeature(title, description, imageUrl).
    success(function () {
        spiner.down();
        statusBar();
        featureAdd(title, description, imageUrl);
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

//вычисляем ид новой фичи
var featureIdForNew = function () {
    var biggerId = 0;
    for (var i = 0; i < apiClient.FeatureInfo().features.length; i++) {
        if (apiClient.FeatureInfo().features[i].id > biggerId) {
            biggerId = apiClient.FeatureInfo().features[i].id;
        }
    }
    return biggerId + 1;
};


//отрисовывает фичу и контейнер к ней по шаблону
var featureAdd = function (title, description, imageUrl) {
    var newFeatureInfo = {
        id: featureIdForNew(),
        title: title,
        description: description,
        image_url: imageUrl,
        level: "0"
    };
    apiClient.FeatureInfo().features.push(newFeatureInfo);
    localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));

    //рисуем новый элемент в меню слева
    $(".item.feature").last().after(template(newFeatureInfo));

    //рисуем новый контейнер ему соответствующий
    templateColumn.append(template2(newFeatureInfo));

    //объясняем элементу слева, что он открывает контейнер кликом и сразу кликаем на новую фичу
    $('#itemFeature'+newFeatureInfo.id)
        .tab().click()
    ;

    $('#templateListQuests' + newFeatureInfo.id).append("Квестов пока нет");

    apiClient.setQuestInfo(newFeatureInfo.id, JSON.parse('{"quests":[]}'));
    localStorage.setItem('QuestInfo'+newFeatureInfo.id, JSON.stringify(apiClient.QuestInfo(newFeatureInfo.id)));
};