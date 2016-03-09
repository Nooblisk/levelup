/**
 * Created by Nooblisk on 03.03.2016.
 */


$("#buttonCreateFeature").click(function () {
    $("#modalCreateFeature")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                $("#titleInput").val("");
                $("#descriptionInput").val("");

            },
            onApprove: function () {
                var title1 = $("#titleInput").val();
                var description1 = $("#descriptionInput").val();
                if (title1 == "" || description1 == "") {
                    return false;
                }
                else {
                    requestCreateFeature(title1, description1);
                }
            }
        })
        .modal('show')
});


var requestCreateFeature = function (title, description) {
    apiClient.postFeature(title, description).
    success(function () {

        $("#titleInput").val("");
        $("#descriptionInput").val("");
        updateFeatures();
    })
};

