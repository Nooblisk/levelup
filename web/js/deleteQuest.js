/**
 * Created by Nooblisk on 10.03.2016.
 */


//обработчик, запускающий функцию удаления квеста
templateColumn.on("click", ".ui.quest.delete.button", function () {
    var feature = $(this).parents(".list.quests").data("id");
    var quest = $(this).data("id");
    if (window.confirm()) {
        requestDeleteQuest(feature, quest);
    }
});

//удаляет квест по id
var requestDeleteQuest = function (feature, quest) {
        apiClient.deleteQuest(feature, quest).success(function () {
            spiner.down();
            statusBar();
            var QuestInfo = apiClient.QuestInfo(feature);
            if(QuestInfo.quests.length == 1){
                $("#itemQuest"+quest).remove();
                $('#templateListQuests' + feature).append("Квестов пока нет");
            }
            synchronizeQuests(feature);
        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteQuest, feature, quest);
        });
    }
    ;