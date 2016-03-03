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
                    requestCreateFeature();
                }
            }
        })
        .modal('show')
});


var requestCreateFeature = function () {
    $.ajax({
        method: "POST",
        url: "/app_dev.php/api/features",
        headers: {Authorization: 'Bearer ' + AuthInfo.access_token},
        data: {
            'feature[title]': title1,
            'feature[imageUrl]': "http://lorempixel.com/100/100/",
            'feature[description]': description1
        },
        success: function () {

            $("#titleInput").val("");
            $("#descriptionInput").val("");
            updateFeatures();
            alert("новая фича создана?");
        }
    })
};

