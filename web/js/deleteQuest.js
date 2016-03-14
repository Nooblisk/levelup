/**
 * Created by Nooblisk on 10.03.2016.
 */


//обработчик, запускающий функцию удаления квеста
templateColumn.on("click", ".ui.quest.delete.button", function () {
    if (window.confirm()) {
        requestDeleteQuest($(this).parents(".list.quests").data("id"), $(this).data("id"));
    }
});

//удаляет квест по id
var requestDeleteQuest = function (feature, quest) {
        apiClient.deleteQuest(feature, quest).success(function () {
            spiner.down();
            statusBar();
            synchronizeQuests(feature);
        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteQuest, feature, quest);
        });
    }
    ;