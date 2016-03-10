/**
 * Created by Nooblisk on 04.03.2016.
 */


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




