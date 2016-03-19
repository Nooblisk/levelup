/**
 * Created by Nooblisk on 10.03.2016.
 */


//обработчик, запускающий функцию удаления квеста
templateColumn.on("click", ".ui.quest.delete.button", function () {
    var feature = $(this).parents(".list.quests").data("id");
    var quest = $(this).data("id");
    if (window.confirm("Вы уверены, что хотите удалить квест?")) {
        requestDeleteQuest(feature, quest);
    }
});

//удаляет квест по id
var requestDeleteQuest = function (feature, quest) {
        apiClient.deleteQuest(feature, quest).success(function () {
            spiner.down();
            statusBar();
            var QuestInfo = apiClient.QuestInfo(feature);
            var questOrder = apiClient.questOrder(feature, quest);
            if(QuestInfo.quests.length == 1){
                $("#itemQuest"+quest).remove();
                $('#templateListQuests' + feature).append("Квестов пока нет");
            }
            else{
                $("#itemQuest"+quest).remove();
            }
            apiClient.QuestInfo(feature).quests.splice(questOrder, 1);
            localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));

        }).fail(function(xhr){
            apiClient.authFail(xhr, requestDeleteQuest, feature, quest);
        });
    }
    ;