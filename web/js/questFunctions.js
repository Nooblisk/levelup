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
        templateListQuests.empty();
        for (var i = 1; i <= QuestInfo.quests.length; i++) {
            $('#templateListQuests').append(template3(QuestInfo.quests[i - 1]));
        }
        $("#headerText4").text(JSON.stringify(QuestInfo));


    })
};