/**
 * Created by Nooblisk on 03.03.2016.
 */


//обработчик, запускающий функцию удаления фичи
templateColumn.on("click", ".ui.feature.delete.button", function () {
    if (window.confirm()) {
        requestDeleteFeature(this.dataset.id);
    }
});

//удаляет фичу по id
var requestDeleteFeature = function (feature) {
        apiClient.deleteFeature(feature).success(function () {
            updateFeatures();
        })
    }
    ;