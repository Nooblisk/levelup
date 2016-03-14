/**
 * Created by Nooblisk on 13.03.2016.
 */



templateColumn.on("click", ".ui.step.up.button", function () {
    var featureStepUp = $(this).parents(".list.quests").data("id");
    var questStepUp = $(this).data("id");
    var questOrder = $(this).parents(".item.quest").data("order");
    //console.log(questOrder);
    var result = prompt("Добавьте комментарий, если хотите", "");
    console.log(featureStepUp, questStepUp, result);
    requestStepUp(featureStepUp, questStepUp, result, questOrder);
});


var requestStepUp = function (feature, quest, comment, questOrder) {
    if (comment === null) {
        comment = "";
    }
    if (apiClient.QuestInfo(feature).quests[questOrder].max_level - apiClient.QuestInfo(feature).quests[questOrder].level == 1) {
        apiClient.postStep(feature, quest, comment).success(function () {
            spiner.down();
            statusBar();
            synchronizeUserInfo();
            synchronizeFeatures();
            synchronizeQuests(feature);
        }).fail(function (xhr) {
            apiClient.authFail(xhr, requestStepUp, feature, quest, comment);
        });
    }
    else {
        apiClient.postStep(feature, quest, comment).success(function () {
            spiner.down();
            statusBar();
            synchronizeQuests(feature);
        }).fail(function (xhr) {
            apiClient.authFail(xhr, requestStepUp, feature, quest, comment);
        });
    }

};


templateColumn.on("click", ".ui.step.down.button", function () {
    var questOrder = $(this).parents(".item.quest").data("order");
    var featureStepDown = $(this).parents(".list.quests").data("id");
    var questStepDown = $(this).data("id");
    if (window.confirm()) {
        console.log(featureStepDown);
        console.log(questStepDown);
        requestStepDown(featureStepDown, questStepDown, questOrder);
    }
});

var requestStepDown = function (feature, quest, questOrder) {
    apiClient.getSteps(feature, quest).success(function (e) {
        spiner.down();
        statusBar();
        var len = e.steps.length;
        if (len > 0) {
            if (apiClient.QuestInfo(feature).quests[questOrder].level ===0){
                apiClient.deleteStep(feature, quest, e.steps[len - 1].id).success(function () {
                    spiner.down();
                    statusBar();
                    synchronizeFeatures();
                    synchronizeUserInfo();
                    $.tab('change tab', feature);
                    synchronizeQuests(feature);

                }).fail(function (xhr) {
                    apiClient.authFail(xhr, requestStepDown, feature, quest);
                });
            }
            else{
                apiClient.deleteStep(feature, quest, e.steps[len - 1].id).success(function () {
                    spiner.down();
                    statusBar();
                    synchronizeQuests(feature);
                }).fail(function (xhr) {
                    apiClient.authFail(xhr, requestStepDown, feature, quest);
                });
            }

        }
        else {
            alert("нечего удалять");
        }


    }).fail(function (xhr) {
        apiClient.authFail(xhr, requestStepDown, feature, quest);
    })
};