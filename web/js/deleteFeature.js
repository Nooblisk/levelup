/**
 * Created by Nooblisk on 03.03.2016.
 */


//обработчик, запускающий функцию удаления фичи
templateColumn.on("click", ".ui.feature.delete.button", function () {
    var featureOrder = $(this).parents(".tab.container").data("order");
    console.log(featureOrder);
    if (window.confirm()) {
        requestDeleteFeature(this.dataset.id, featureOrder);
    }
});

//удаляет фичу по id
var requestDeleteFeature = function (feature, featureOrder) {
        apiClient.deleteFeature(feature).success(function () {
            spiner.down();
            statusBar();
            itemFeatureClass.eq(featureOrder).remove();
            $(".tab.container").eq(featureOrder).remove();
            itemFeatureClass.eq(featureOrder-1).click();
            localStorage.removeItem("Quest"+feature);
            synchronizeFeatures();
        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteFeature, feature);
        });
    }
    ;