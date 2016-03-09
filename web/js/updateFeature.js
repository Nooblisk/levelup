/**
 * Created by Nooblisk on 04.03.2016.
 */


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
                var title2 = $("#titleInputUpdate").val();
                var description2 = $("#descriptionInputUpdate").val();
                if (title2 == "" || description2 == "") {
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
        updateFeatures();
    })
};