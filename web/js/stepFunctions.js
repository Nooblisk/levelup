/**
 * Created by Nooblisk on 13.03.2016.
 */



templateColumn.on("click", ".ui.step.up.button", function () {
    var featureStepUp = $(this).parents(".list.quests").data("id");
    var questStepUp = $(this).data("id");
    var questOrder = apiClient.questOrder(featureStepUp, questStepUp);

    var result = prompt("Добавьте комментарий, если хотите", "");
    requestStepUp(featureStepUp, questStepUp, result, questOrder);
});


var requestStepUp = function (feature, quest, comment, questOrder) {
    if (comment === null) {
        comment = "";
    }
    if (apiClient.QuestInfo(feature).quests[questOrder].max_level - apiClient.QuestInfo(feature).quests[questOrder].level == 1) {
        apiClient.postStep(feature, quest, comment).success(function (UpdatedQuestInfo) {
            spiner.down();
            statusBar();

            apiClient.QuestInfo(feature).quests.splice(questOrder, 1, UpdatedQuestInfo.quest);
            localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
            reactiveQuestInfo.set(apiClient.QuestInfoAll());

            apiClient.FeatureInfo().features[apiClient.featureOrder(feature)].level += 1;
            localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));
            reactiveFeatureInfo.set(apiClient.FeatureInfo());

            apiClient.UserInfo().user.level += 1;
            localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
            reactiveUserInfo.set(apiClient.UserInfo());

        }).fail(function (xhr) {
            apiClient.authFail(xhr, requestStepUp, feature, quest, comment);
        });
    }
    else {
        apiClient.postStep(feature, quest, comment).success(function (UpdatedQuestInfo) {
            spiner.down();
            statusBar();

            apiClient.QuestInfo(feature).quests.splice(questOrder, 1, UpdatedQuestInfo.quest);
            localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
            reactiveQuestInfo.set(apiClient.QuestInfoAll());

        }).fail(function (xhr) {
            apiClient.authFail(xhr, requestStepUp, feature, quest, comment);
        });
    }

};


templateColumn.on("click", ".ui.step.down.button", function () {
    var featureStepDown = $(this).parents(".list.quests").data("id");
    var questStepDown = $(this).data("id");
    var questOrder = apiClient.questOrder(featureStepDown, questStepDown);
    if (window.confirm("Вы уверены, что хотите удалить шаг?")) {
        requestStepDown(featureStepDown, questStepDown, questOrder);
    }
});

var requestStepDown = function (feature, quest, questOrder) {
    var len = apiClient.QuestInfo(feature).quests[questOrder].steps.length;

    var maxLevel = apiClient.QuestInfo(feature).quests[questOrder].max_level;

    if (len > 0) {
        var stepId = apiClient.QuestInfo(feature).quests[questOrder].steps[len - 1].id;
        if (apiClient.QuestInfo(feature).quests[questOrder].level === 0) {

            apiClient.deleteStep(feature, quest, stepId).success(function () {
                spiner.down();
                statusBar();


                apiClient.QuestInfo(feature).quests[questOrder].steps.splice(len - 1, 1);

                apiClient.QuestInfo(feature).quests[questOrder].level = maxLevel - 1;
                localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
                reactiveQuestInfo.set(apiClient.QuestInfoAll());

                apiClient.FeatureInfo().features[apiClient.featureOrder(feature)].level -= 1;
                localStorage.setItem('FeatureInfo', JSON.stringify(apiClient.FeatureInfo()));
                reactiveFeatureInfo.set(apiClient.FeatureInfo());

                apiClient.UserInfo().user.level -= 1;
                localStorage.setItem('UserInfo', JSON.stringify(apiClient.UserInfo()));
                reactiveUserInfo.set(apiClient.UserInfo());


            }).fail(function (xhr) {
                apiClient.authFail(xhr, requestStepDown, feature, quest);
            });
        }
        else {

            apiClient.deleteStep(feature, quest, stepId).success(function () {
                spiner.down();
                statusBar();


                apiClient.QuestInfo(feature).quests[questOrder].steps.splice(len - 1, 1);

                apiClient.QuestInfo(feature).quests[questOrder].level -= 1;
                localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
                reactiveQuestInfo.set(apiClient.QuestInfoAll());

            }).fail(function (xhr) {
                apiClient.authFail(xhr, requestStepDown, feature, quest);
            });
        }

    }
    else {
        alert("нечего удалять");
    }
};