/**
 * Created by Nooblisk on 04.03.2016.
 */


$("#titleInputUpdate")
    .keyup(function () {
        title2 = $(this).val();
    }).keyup();
$("#descriptionInputUpdate")
    .keyup(function () {
        description2 = $(this).val();
    }).keyup();


$('#templateColumn').on("click", ".ui.feature.update.button", function (e) {
    $("#modalUpdateFeature")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onShow: function () {
                $("#idInputUpdate").val(e.target.dataset.id);
                $("#titleInputUpdate").val("");
                $("#descriptionInputUpdate").val("");
            },
            onDeny: function () {
                $("#idInputUpdate").val(e.target.dataset.id);
                $("#titleInputUpdate").val("");
                $("#descriptionInputUpdate").val("");

            },
            onApprove: function () {
                if ($("#titleInputUpdate").val() == "" || $("#descriptionInputUpdate").val() == "") {
                    alert("минимум одно из полей пустое");
                    return false;
                }
                else {
                    console.log(e.target.dataset.id);
                    requestUpdateFeature(e.target.dataset.id, title2, description2);
                }
            }
        })
        .modal('show')
});

var requestUpdateFeature = function (feature, title, description) {
    apiClient.putFeature(feature, title, description).success(function () {
        //$( "#titleInput").val("");
        //$( "#descriptionInput").val("");
        updateFeatures();
        alert("фича " + feature + " изменена");
    })
};