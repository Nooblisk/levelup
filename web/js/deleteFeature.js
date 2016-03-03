/**
 * Created by Nooblisk on 03.03.2016.
 */



$('#templateColumn').on("click", ".ui.feature.delete.button", function () {
    if (window.confirm()) {
        requestDeleteFeature(this.dataset.id);
    }
});


var requestDeleteFeature = function (feature) {
        apiClient.deleteFeature(feature).success(function () {
            updateFeatures();
            alert("Feature " + feature + " was successfully deleted");
        })
    }
    ;