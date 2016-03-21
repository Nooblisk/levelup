/**
 * Created by Nooblisk on 04.03.2016.
 */
//забирает с помощью клиент-апи список квестов для данной фичи и запускает их рендер
var synchronizeQuestsAndFill = function (feature) {
    apiClient.getQuests(feature).success(function (QuestInfo) {
            spiner.down();
            statusBar();
            apiClient.setQuestInfo(feature, QuestInfo);
            localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
            questsRender(feature);
        })
        .fail(function (xhr) {
            apiClient.authFail(xhr, synchronizeQuestsAndFill, feature);
        });
};


//заполняет информацию о квестах данными, добытыми раннее функцией synchronizeQuestsAndFill
var questsRender = function (feature) {
    var QuestInfo = apiClient.QuestInfo(feature);
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
    }
    else {
        $('#templateListQuests' + feature).append("Квестов пока нет");
    }
    $("#headerText4").text(JSON.stringify(QuestInfo));
};

//забирает список квестов для данной фичи
var synchronizeQuests = function (feature) {
    apiClient.getQuests(feature).success(function (QuestInfo) {
            spiner.down();
            statusBar();
            apiClient.setQuestInfo(feature, QuestInfo);
            localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));
            reactiveQuestInfo.set(apiClient.QuestInfoAll());
        })
        .fail(function (xhr) {
            apiClient.authFail(xhr, synchronizeQuests, feature);
        });
};


//заполняет квесты данными
var questsFill = function (QuestInfoAll) {
    if(QuestInfoAll != undefined) {
        for (var key in QuestInfoAll) {
            var QuestInfo = QuestInfoAll[key];
            for (var i = 0; i < QuestInfo.quests.length; i++) {
                var id = QuestInfo.quests[i].id;
                var title = QuestInfo.quests[i].title;
                var description = QuestInfo.quests[i].description;
                var level = QuestInfo.quests[i].level;
                var maxLevel = QuestInfo.quests[i].max_level;
                $("#titleQuest" + id).text(title);
                $("#descriptionQuest" + id).text(description);
                $("#steps" + id).progress({
                    total: maxLevel,
                    value: level,
                    text: {
                        active: 'Шагов {value} из {total} выполнено',
                        success: '{total} Шагов Выполнено! Квест Выполнен!'
                    }
                });
            }

        }
    }

};
