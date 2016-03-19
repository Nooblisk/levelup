/**
 * Created by Nooblisk on 03.03.2016.
 */


//обработчик, запускающий функцию удаления фичи
templateColumn.on("click", ".ui.feature.delete.button", function () {
    if (window.confirm("Вы уверены, что хотите удалить фичу?")) {
        requestDeleteFeature(this.dataset.id);
    }
});

//удаляет фичу по id
var requestDeleteFeature = function (feature) {
        apiClient.deleteFeature(feature).success(function () {
            spiner.down();
            statusBar();

            var index = $("#itemFeature"+feature).index();
            if (index > 0) {
                $("#itemFeature" + feature).prev().click();
            }
            else{
                $('.item.feature').eq(index+1).click();
            }
            $("#itemFeature"+feature).remove();
            $("#containerFeature"+feature).remove();

            apiClient.FeatureInfo().features.splice(apiClient.featureOrder(feature),1);
            localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));

            apiClient.QuestInfo(feature).quests.splice(0, apiClient.QuestInfo(feature).quests.length);
            localStorage.removeItem("QuestInfo"+feature);

        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteFeature, feature);
        });
    }
    ;