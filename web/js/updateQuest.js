/**
 * Created by Nooblisk on 10.03.2016.
 */



//Изменяет квест
templateColumn.on("click", ".ui.quest.update.button", function () {
    var feature = $(this).parents(".list.quests").data("id");
    var quest = $(this).data("id");
    var questOrder = $(this).parents(".item.quest").data("order");
    $("#featureIdUpdateQuest").val(feature);
    $("#questIdUpdateQuest").val(quest);
    $("#titleUpdateQuest").val(apiClient.QuestInfo(feature).quests[questOrder].title);
    $("#descriptionUpdateQuest").val(apiClient.QuestInfo(feature).quests[questOrder].description);
    $("#maxLevelUpdateQuest").val(apiClient.QuestInfo(feature).quests[questOrder].max_level);


    $("#modalUpdateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formUpdateQuest.form('reset');
            },
            onApprove: function () {
             formUpdateQuest.submit();
                return false;
            }
        })
        .modal('show')
});

var requestUpdateQuest = function (feature, quest, title, description, maxLevel) {
    apiClient.putQuest(feature, quest, title, description, maxLevel).success(function () {
        spiner.down();
        statusBar();
        synchronizeQuests(feature);
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestUpdateQuest, feature, quest, title, description, maxLevel);
    });
};



//правила для формы добавления фичи
formUpdateQuest
    .form({
        //on: 'blur',
        onSuccess: function () {
            var titleUpdateQuest = formUpdateQuest.form('get field', "titleUpdateQuest").val();
            var descriptionUpdateQuest = formUpdateQuest.form('get field', "descriptionUpdateQuest").val();
            var maxLevelUpdateQuest = formUpdateQuest.form('get field', "maxLevelUpdateQuest").val();
            var featureIdUpdateQuest = formUpdateQuest.form('get field', "featureIdUpdateQuest").val();
            var questIdUpdateQuest = formUpdateQuest.form('get field', "questIdUpdateQuest").val();
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