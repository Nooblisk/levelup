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
    success(function (NewFeatureInfo) {
        spiner.down();
        statusBar();
        featureAdd(NewFeatureInfo.feature);
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


//отрисовывает фичу и контейнер к ней по шаблону
var featureAdd = function (FeatureInfo) {
    apiClient.FeatureInfo().features.push(FeatureInfo);
    localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));

    //рисуем новый элемент в меню слева
    $(".item.feature").last().after(template(FeatureInfo));

    //рисуем новый контейнер ему соответствующий
    templateColumn.append(template2(FeatureInfo));

    //объясняем элементу слева, что он открывает контейнер кликом и сразу кликаем на новую фичу
    $('#itemFeature'+FeatureInfo.id)
        .tab().click()
    ;

    $('#templateListQuests' + FeatureInfo.id).append("Квестов пока нет");

    apiClient.setQuestInfo(FeatureInfo.id, JSON.parse('{"quests":[]}'));
    localStorage.setItem('QuestInfo'+FeatureInfo.id, JSON.stringify(apiClient.QuestInfo(FeatureInfo.id)));
};