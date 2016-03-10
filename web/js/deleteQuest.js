/**
 * Created by Nooblisk on 10.03.2016.
 */


//обработчик, запускающий функцию удаления квеста
templateColumn.on("click", ".ui.quest.delete.button", function () {
    if (window.confirm()) {
        console.log($(this).parents(".list.quests").data("id"));
        console.log($(this).data("id"));
        requestDeleteQuest($(this).parents(".list.quests").data("id"), $(this).data("id"));
    }
});

//удаляет квест по id
var requestDeleteQuest = function (feature, quest) {
        apiClient.deleteQuest(feature, quest).success(function () {
            updateQuests(feature);
        })
    }
    ;