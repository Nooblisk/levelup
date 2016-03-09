/**
 * Created by Nooblisk on 04.03.2016.
 */

//обработчик для кнопок создания новых квестов
$('#templateColumn').on("click", ".ui.quest.post.button", function (e) {
    $("#modalCreateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onShow: function () {
                $("#idInputQuestUpdate").val(e.target.dataset.id);
                $("#titleQuestInput").val("");
                $("#descriptionQuestInput").val("");
                $("#maxLevelQuestInput").val("");
            },
            onDeny: function () {
                $("#idInputQuestUpdate").val(e.target.dataset.id);
                $("#titleQuestInput").val("");
                $("#descriptionQuestInput").val("");
                $("#maxLevelQuestInput").val("");

            },
            onApprove: function () {
                var titleQuest = $("#titleQuestInput").val();
                var descriptionQuest = $("#descriptionQuestInput").val();
                var maxLevelQuest = $("#maxLevelQuestInput").val();
                if (titleQuest == "" || descriptionQuest == "" || maxLevelQuest == "") {
                    alert("минимум одно из полей пустое");
                    return false;
                }
                else {
                    console.log(e.target.dataset.id);
                    requestCreateQuest(e.target.dataset.id, titleQuest, descriptionQuest, maxLevelQuest);
                }
            }
        })
        .modal('show')
});

//отправляет запрос на создание нового квеста с указанными данными
var requestCreateQuest = function (feature, title, description, maxLevel) {
    apiClient.postQuest(feature, title, description, maxLevel).
    success(function () {
        updateQuests(feature);
        alert("новый квест " + feature + " создан?");
    })
};




//забирает с помощью клиент-апи список квестов для данной фичи
var updateQuests = function (feature) {
    apiClient.getQuests(feature).success(function (QuestInfo) {
        $('#templateListQuests' + feature).empty();
        if (QuestInfo.quests.length != 0) {
            for (var i = 1; i <= QuestInfo.quests.length; i++) {
                $('#templateListQuests' + feature).append(template3(QuestInfo.quests[i - 1]));
                //$('#stepStarRating' + feature).empty();
                if (QuestInfo.quests[i - 1].steps.length != 0) {
                    for (var j = 1; j <= QuestInfo.quests[i - 1].steps.length; j++) {
                        $('#stepStarRating' + QuestInfo.quests[i - 1].id).append(template4(QuestInfo.quests[i - 1].steps[j - 1]));
                    }
                }
                    for (var t = QuestInfo.quests[i - 1].level; t< QuestInfo.quests[i - 1].max_level; t++){
                        $('#stepStarRating' + QuestInfo.quests[i - 1].id).append(template5(QuestInfo.quests[i - 1].steps[j - 1]))
                    }

            }

        }
        else {
            $('#templateListQuests' + feature).append("Квестов пока нет");
        }
        $("#headerText4").text(JSON.stringify(QuestInfo));
        //console.log(QuestInfo.quests[0].steps.length);
    })
};



//обработчик, запускающий функцию удаления квеста
templateColumn.on("click", ".ui.quest.delete.button", function (e) {
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
            alert("Quest " + quest + "from feature "+feature+" was successfully deleted");
        })
    }
    ;

//Изменяет квест

templateColumn.on("click", ".ui.quest.update.button", function (e) {
    var questID = $(this).data("id");
    var featureID = $(this).parents(".list.quests").data("id");
    $("#modalUpdateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onShow: function () {
                $("#titleInputUpdateQuest").val("");
                $("#descriptionInputUpdateQuest").val("");
                $("#maxLevelInputUpdateQuest").val("");
            },
            onDeny: function () {
                $("#titleInputUpdateQuest").val("");
                $("#descriptionInputUpdateQuest").val("");
                $("#maxLevelInputUpdateQuest").val("");

            },
            onApprove: function () {
                var title3 = $("#titleInputUpdateQuest").val();
                var description3 = $("#descriptionInputUpdateQuest").val();
                var maxLevel3 = $("#maxLevelInputUpdateQuest").val();
                if (title3 == "" || description3 == "" || maxLevel3 =="") {
                    alert("минимум одно из полей пустое");
                    return false;
                }
                else {
                    //console.log(featureID);
                    //console.log(questID);
                    //console.log(title3);
                    //console.log(description3);
                    //console.log(maxLevel3);
                    requestUpdateQuest(featureID, questID, title3, description3, maxLevel3);
                }
            }
        })
        .modal('show')
});

var requestUpdateQuest = function (feature, quest, title, description, maxLevel) {
    apiClient.putQuest(feature, quest, title, description, maxLevel).success(function () {
        alert("квест " +quest+ " в фиче " + feature + " изменён");
        updateQuests(feature);
    })
};