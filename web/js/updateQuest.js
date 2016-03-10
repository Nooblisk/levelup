/**
 * Created by Nooblisk on 10.03.2016.
 */



//Изменяет квест
templateColumn.on("click", ".ui.quest.update.button", function () {
    var questID = $(this).data("id");
    var featureID = $(this).parents(".list.quests").data("id");
    $("#modalUpdateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formUpdateQuest.form('reset');
            },
            onApprove: function () {
                formUpdateQuest.form('set value', "featureIdUpdateQuest").val = featureID;
                formUpdateQuest.form('set value', "questIdUpdateQuest").val = questID;
                formUpdateQuest.submit();
                return false;
            }
        })
        .modal('show')
});

var requestUpdateQuest = function (feature, quest, title, description, maxLevel) {
    apiClient.putQuest(feature, quest, title, description, maxLevel).success(function () {
        updateQuests(feature);
    })
};



//правила для формы добавления фичи
formUpdateQuest
    .form({
        //on: 'blur',
        onSuccess: function () {
            var titleUpdateQuest = formUpdateQuest.form('get field', "titleUpdateQuest").val();
            var descriptionUpdateQuest = formUpdateQuest.form('get field', "descriptionUpdateQuest").val();
            var maxLevelUpdateQuest = formUpdateQuest.form('get field', "maxLevelUpdateQuest").val();
            var featureIdUpdateQuest = formUpdateQuest.form('get value', "featureIdCreateQuest").val;
            var questIdUpdateQuest = formUpdateQuest.form('get value', "questIdCreateQuest").val;
            requestUpdateQuest(featureIdUpdateQuest, questIdUpdateQuest, titleUpdateQuest, descriptionUpdateQuest, maxLevelUpdateQuest);
            formUpdateQuest.form('reset');
            $("#modalUpdateQuest").modal('hide');
            return false;
        },
        fields: {
            titleUpdateQuest: {
                identifier  : 'titleUpdateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a title'
                    }
                ]
            },
            descriptionUpdateQuest: {
                identifier  : 'descriptionUpdateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a description'
                    },
                    {
                        type   : 'minLength[4]',
                        prompt : 'Please enter at least 4 characters'
                    }
                ]
            },
            maxLevelUpdateQuest: {
                identifier  : 'maxLevelUpdateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a maxLevel'
                    }
                ]
            }
        }
    })
;