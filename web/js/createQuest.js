/**
 * Created by Nooblisk on 10.03.2016.
 */

//обработчик для кнопок создания новых квестов
$('#templateColumn').on("click", ".ui.quest.post.button", function () {
    var feature = $(this).data("id");
    formCreateQuest.form('set value', 'featureIdCreateQuest', feature);
    $("#modalCreateQuest")
        .modal({
            autofocus: true,
            transition: 'fade down',
            onDeny: function () {
                formCreateQuest.form('reset');
            },
            onApprove: function () {
                formCreateQuest.submit();
                return false;
            }
        })
        .modal('show')
});

//отправляет запрос на создание нового квеста с указанными данными
var requestCreateQuest = function (feature, title, description, maxLevel) {
    apiClient.postQuest(feature, title, description, maxLevel).
    success(function (NewQuestInfo) {
        spiner.down();
        statusBar();
        questAdd(feature, NewQuestInfo.quest);
    }).fail(function(xhr){
        apiClient.authFail(xhr, requestCreateQuest, feature, title, description, maxLevel);
    });
};

//правила для формы добавления фичи
formCreateQuest
    .form({
        onSuccess: function () {
            var titleCreateQuest = formCreateQuest.form('get value', "titleCreateQuest");
            var descriptionCreateQuest = formCreateQuest.form('get value', "descriptionCreateQuest");
            var maxLevelCreateQuest = formCreateQuest.form('get value', "maxLevelCreateQuest");
            var featureIdCreateQuest = formCreateQuest.form('get value', "featureIdCreateQuest");
            requestCreateQuest(featureIdCreateQuest, titleCreateQuest, descriptionCreateQuest, maxLevelCreateQuest);
            formCreateQuest.form('reset');
            $("#modalCreateQuest").modal('hide');
            return false;
        },
        fields: {
            titleCreateQuest: {
                identifier  : 'titleCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a title'
                    },
                    {
                        type   : 'minLength[2]',
                        prompt : 'Title must be at least {ruleValue} characters'
                    }
                ]
            },
            descriptionCreateQuest: {
                identifier  : 'descriptionCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a description'
                    },
                    {
                        type   : 'minLength[2]',
                        prompt : 'Description must be at least {ruleValue} characters'
                    }
                ]
            },
            maxLevelCreateQuest: {
                identifier  : 'maxLevelCreateQuest',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter how much steps you need'
                    },
                    {
                        type : 'number',
                        prompt: 'maxLevel must be a number'
                    }
                ]
            }
        }
    })
;

//отрисовываем квест по шаблону
var questAdd = function (feature, QuestInfo) {

    apiClient.QuestInfo(feature).quests.push(QuestInfo);
    localStorage.setItem('QuestInfo' + feature, JSON.stringify(apiClient.QuestInfo(feature)));

    if(apiClient.questOrder(feature, QuestInfo.id)==0){
        $('#templateListQuests' + feature).empty();
    }

    //рисуем новый элемент
    $('#templateListQuests' + feature).append(template3(QuestInfo));
    $('#steps' + QuestInfo.id)
        .progress({
            text: {
                active: 'Шагов {value} из {total} выполнено',
                success: '{total} Шагов Выполнено! Квест Выполнен!'
            }
        })
    ;
};

