/**
 * Created by Nooblisk on 03.03.2016.
 */


//обработчик, запускающий функцию удаления фичи
templateColumn.on("click", ".ui.feature.delete.button", function () {
   // var featureOrder = $(this).parents(".tab.container").data("order");
    //console.log(featureOrder);
    if (window.confirm()) {
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
            localStorage.removeItem("Quest"+feature);
            synchronizeFeatures();
        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteFeature, feature);
        });
    }
    ;