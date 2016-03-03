/**
 * Created by Nooblisk on 03.03.2016.
 */
$('#templateColumn').on("click", ".ui.feature.delete.button", function () {
    if (window.confirm()) {
        requestDeleteFeature(this.dataset.id);
    }
});


var requestDeleteFeature = function (featureId) {
    $.ajax({
        url: "/app_dev.php/api/features/" + featureId,
        type: 'DELETE',
        headers: {Authorization: 'Bearer ' + AuthInfo.access_token},
        success: function () {
            updateFeatures();
            alert("Feature " + featureId + " was successfully deleted");
        }
    });
};



