/**
 * Created by Nooblisk on 10.03.2016.
 */

//Изменяет квест
templateColumn.on("click", ".ui.quest.update.button", function () {
    var feature = $(this).parents(".list.quests").data("id");
    var quest = $(this).data("id");
    var questOrder = apiClient.questOrder(feature, quest);
    formUpdateQuest.form('set values',
        {
            featureIdUpdateQuest: feature,
            questIdUpdateQuest: quest,
            titleUpdateQuest: apiClient.QuestInfo(feature).quests[questOrder].title,
            descriptionUpdateQuest: apiClient.QuestInfo(feature).quests[questOrder].description,
            maxLevelUpdateQuest: apiClient.QuestInfo(feature).quests[questOrder].max_level

        }
    );
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
        questChange(feature, quest, title, description, maxLevel);
    }).fail(function (xhr) {
        apiClient.authFail(xhr, requestUpdateQuest, feature, quest, title, description, maxLevel);
    });
};

//правила для формы добавления фичи
formUpdateQuest
    .form({
        onSuccess: function () {
            var titleUpdateQuest = formUpdateQuest.form('get value', 'titleUpdateQuest');
            var descriptionUpdateQuest = formUpdateQuest.form('get value', 'descriptionUpdateQuest');
            var maxLevelUpdateQuest = formUpdateQuest.form('get value', 'maxLevelUpdateQuest');
            var featureIdUpdateQuest = formUpdateQuest.form('get value', 'featureIdUpdateQuest');
            var questIdUpdateQuest = formUpdateQuest.form('get value', 'questIdUpdateQuest');
            //console.log(featureIdUpdateQuest, questIdUpdateQuest, titleUpdateQuest, descriptionUpdateQuest, maxLevelUpdateQuest);
            requestUpdateQuest(featureIdUpdateQuest, questIdUpdateQuest, titleUpdateQuest, descriptionUpdateQuest, maxLevelUpdateQuest);
            formUpdateQuest.form('reset');
            $("#modalUpdateQuest").modal('hide');
            return false;
        },
        fields: {
            titleUpdateQuest: {
                identifier: 'titleUpdateQuest',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a title'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Title must be at least {ruleValue} characters'
                    }
                ]
            },
            descriptionUpdateQuest: {
                identifier: 'descriptionUpdateQuest',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a description'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Description must be at least {ruleValue} characters'
                    }
                ]
            },
            maxLevelUpdateQuest: {
                identifier: 'maxLevelUpdateQuest',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a maxLevel'
                    },
                    {
                        type: 'number',
                        prompt: 'maxLevel must be a number'
                    }
                ]
            }
        }
    })
;


var questChange = function (feature, quest, title, description, maxLevel) {
    var questOrder = apiClient.questOrder(feature, quest);
    apiClient.QuestInfo(feature).quests[questOrder].title = title;
    apiClient.QuestInfo(feature).quests[questOrder].description = description;
    apiClient.QuestInfo(feature).quests[questOrder].max_level = maxLevel;
    localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
    reactiveQuestInfo.set(apiClient.QuestInfoAll());

};