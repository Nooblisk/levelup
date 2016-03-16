/**
 * Created by Nooblisk on 10.03.2016.
 */

//обработчик для кнопок создания новых квестов
$('#templateColumn').on("click", ".ui.quest.post.button", function () {
    var feature = $(this).data("id");
    $("#featureIdCreateQuest").val(feature);
    $("#modalCreateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formCreateQuest.form('reset');
            },
            onApprove: function () {
                formCreateQuest.submit();
                return false;
            }
        })
        .modal('show')
});

//отправляет запрос на создание нового квеста с указанными данными
var requestCreateQuest = function (feature, title, description, maxLevel) {
    apiClient.postQuest(feature, title, description, maxLevel).
    success(function () {
        spiner.down();
        statusBar();
        synchronizeQuestsAndFill(feature);
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestCreateQuest, feature, title, description, maxLevel);
    });
};

//правила для формы добавления фичи
formCreateQuest
    .form({
        onSuccess: function () {
            var titleCreateQuest = formCreateQuest.form('get field', "titleCreateQuest").val();
            var descriptionCreateQuest = formCreateQuest.form('get field', "descriptionCreateQuest").val();
            var maxLevelCreateQuest = formCreateQuest.form('get field', "maxLevelCreateQuest").val();
            var featureIdCreateQuest = formCreateQuest.form('get field', "featureIdCreateQuest").val();
            requestCreateQuest(featureIdCreateQuest, titleCreateQuest, descriptionCreateQuest, maxLevelCreateQuest);
            formCreateQuest.form('reset');
            $("#modalCreateQuest").modal('hide');
            return false;
        },
        fields: {
            titleCreateQuest: {
                identifier  : 'titleCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a title'
                    }
                ]
            },
            descriptionCreateQuest: {
                identifier  : 'descriptionCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a description'
                    }
                ]
            },
            maxLevelCreateQuest: {
                identifier  : 'maxLevelCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter how much steps you need'
                    }
                ]
            }
        }
    })
;