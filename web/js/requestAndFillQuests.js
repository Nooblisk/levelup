/**
 * Created by Nooblisk on 04.03.2016.
 */
//забирает с помощью клиент-апи список квестов для данной фичи
var synchronizeQuests = function (feature) {
    apiClient.getQuests(feature).success(function (QuestInfo) {
        apiClient.setQuestInfo(feature, QuestInfo);
        localStorage.setItem('QuestInfo'+feature, JSON.stringify(apiClient.QuestInfo(feature)));
        questsFill(feature);
    }).fail(function (xhr) {
        console.log(xhr);
        if (xhr.status == 401) {
            apiClient.postRefreshToken()
                .success(function (a) {
                        apiClient.setAuthInfo(a);
                        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
                        $(".button.signIn").hide();
                        $(".button.signOut").show();

                        synchronizeQuests(feature);
                    }
                ).fail(function () {
                localStorage.removeItem('AuthInfo');
                location.reload();
            });
        }
    });
};

//заполняет информацию о квестах данными, добытыми раннее функцией synchronizeQuests
var questsFill = function(feature){
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
        //templateColumn.on("click", ".ui.step.up.button", function () {
        //    var step = $(this).data("id");
        //    $('#steps' + step)
        //        .progress('increment')
        //    ;
        //});
        //templateColumn.on("click", ".ui.step.down.button", function () {
        //    var step = $(this).data("id");
        //    $('#steps' + step)
        //        .progress('decrement')
        //    ;
        //});
    }
    else {
        $('#templateListQuests' + feature).append("Квестов пока нет");
    }
    $("#headerText4").text(JSON.stringify(QuestInfo));
};
