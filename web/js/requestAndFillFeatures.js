/**
 * Created by Nooblisk on 20.03.2016.
 */
var truncate = function (str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + "...";
    }
    else
        return str;
};


//обновить данные по фичам и сразу же перерисовать
var synchronizeFeaturesAndFill = function () {
    apiClient.getFeatures().success(function (FeatureInfo) {
        spiner.down();
        statusBar();
        apiClient.setFeatureInfo(FeatureInfo);
        localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));
        featuresRender();

    }).fail(function (xhr) {
        apiClient.authFail(xhr, synchronizeFeaturesAndFill);
    });
};

//заполняет страничку данными FeatureInfo (рендерим с нуля)
var featuresRender = function () {
    var FeatureInfo = apiClient.FeatureInfo();
    $("#headerText3").text(JSON.stringify(FeatureInfo));
    templateList.empty();
    templateColumn.empty();
    $(".ui.list.quests").empty();
    if (FeatureInfo.features.length > 0) {
        for (var i = 1; i <= FeatureInfo.features.length; i++) {
            //отрисовываем список фич поштучно
            templateList.append(template(FeatureInfo.features[i - 1]));
            //создаём каждой фиче контейнер
            templateColumn.append(template2(FeatureInfo.features[i - 1]));
            //проверяем длину имени у фичи, чтобы была не больше 10 знаков
            $("#titleItemFeature" + FeatureInfo.features[i - 1].id).text(truncate(FeatureInfo.features[i - 1].title, 10));
            if (apiClient.isQuesterized(FeatureInfo.features[i - 1].id)) {
                questsRender(FeatureInfo.features[i - 1].id);
            }
            else {
                synchronizeQuestsAndFill(FeatureInfo.features[i - 1].id);
            }

        }
        templateList.append("<a id='buttonCreateFeature' class='item'><i class='plus icon'></i>Add new feature</a>");
    }
    else {
        templateList.append("<a id=\"buttonCreateFeature\" class=\"item\">Add new feature</a>");
    }

    //навешиваем событие на клик по фиче из списка слева
    $(".item.feature").tab();

};

//только обновить данные по фичам
var synchronizeFeatures = function () {
    apiClient.getFeatures().success(function (FeatureInfo) {
        spiner.down();
        statusBar();
        apiClient.setFeatureInfo(FeatureInfo);
        localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));
        reactiveFeatureInfo.set(FeatureInfo);

    }).fail(function (xhr) {
        apiClient.authFail(xhr, synchronizeFeatures);
    });
};


//функция заполнения уже готовых фич данными(не рендеря их заного)
var featuresFill = function (FeatureInfo) {
    if (FeatureInfo != undefined) {
        for (var i = 1; i <= FeatureInfo.features.length; i++) {
            var feature = FeatureInfo.features[i - 1].id;
            var title = FeatureInfo.features[i - 1].title;
            var description = FeatureInfo.features[i - 1].description;
            var imageUrl = FeatureInfo.features[i - 1].image_url;
            var level = FeatureInfo.features[i - 1].level;


            //title
            $("#titleItemFeature" + feature).text(truncate(title, 10));
            $("#titleContainerFeature" + feature).text(title);
            //description
            $("#descriptionContainerFeature" + feature).text(description);
            //image
            $("#imageContainerFeature" + feature).attr("src", imageUrl);
            $("#imageItemFeature" + feature).attr("src", imageUrl);
            //level
            $("#levelItemFeature" + feature).text(level);
            $("#levelContainerFeature" + feature).text("уровень " + level);

        }
    }
};


