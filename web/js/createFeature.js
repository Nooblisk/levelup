/**
 * Created by Nooblisk on 03.03.2016.
 */

$("#titleInput")
    .keyup(function () {
        title1 = $(this).val();
    }).keyup();
$("#descriptionInput")
    .keyup(function () {
        description1 = $(this).val();
    }).keyup();



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
                if ($("#titleInput").val() == "" || $("#descriptionInput").val() == "") {
                    alert("минимум одно из полей пустое");
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
        alert("новая фича создана?");
    })
};

