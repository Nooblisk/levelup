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
                $('#steps' + QuestInfo.quests[i - 1].id)
                    .progress({
                        text: {
                            active: 'Шагов {value} из {total} выполнено',
                            success: '{total} Шагов Выполнено! Квест Выполнен!'
                        }
                    })
                ;
            }
            templateColumn.on("click", ".ui.step.up.button", function () {
                var step = $(this).data("id");
                $('#steps' + step)
                    .progress('increment')
                ;
            });
            templateColumn.on("click", ".ui.step.down.button", function () {
                var step = $(this).data("id");
                $('#steps' + step)
                    .progress('decrement')
                ;
            });
        }
        else {
            $('#templateListQuests' + feature).append("Квестов пока нет");
        }
        $("#headerText4").text(JSON.stringify(QuestInfo));
    })
};



