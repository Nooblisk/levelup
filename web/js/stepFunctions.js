/**
 * Created by Nooblisk on 13.03.2016.
 */



templateColumn.on("click", ".ui.step.up.button", function () {
  var featureStepUp = $(this).parents(".list.quests").data("id");
  var questStepUp = $(this).data("id");
  var result = prompt("Добавьте комментарий, если хотите", "");
    //console.log(featureStepUp);
    //console.log(questStepUp);
    console.log(featureStepUp, questStepUp, result);
    requestStepUp(featureStepUp, questStepUp, result);
});


var requestStepUp = function(feature, quest, comment){
    if (comment === null){
        comment = "";
    }
    apiClient.postStep(feature, quest, comment).success(function () {
        synchronizeQuests(feature);
    }).fail(function (xhr) {
        console.log(xhr);
        if (xhr.status == 401) {
            apiClient.postRefreshToken()
                .success(function (a) {
                        apiClient.setAuthInfo(a);
                        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
                        $("#buttonSignIn").hide();
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


templateColumn.on("click", ".ui.step.down.button", function () {
    var featureStepDown = $(this).parents(".list.quests").data("id");
    var questStepDown = $(this).data("id");
    if (window.confirm()) {
        console.log(featureStepDown);
        console.log(questStepDown);
        requestStepDown(featureStepDown, questStepDown);
    }
});

var requestStepDown = function (feature, quest) {
    apiClient.getSteps(feature, quest).success(function (e) {
        var len = e.steps.length;
        if (len > 0) {
            // console.log(e);
            // console.log(e.steps);
            //console.log(e.steps[len-1].id);
            apiClient.deleteStep(feature, quest, e.steps[len - 1].id).success(function () {
                synchronizeQuests(feature);
            }).fail(function (xhr) {
                console.log(xhr);
                if (xhr.status == 401) {
                    apiClient.postRefreshToken()
                        .success(function (a) {
                                apiClient.setAuthInfo(a);
                                localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
                                $("#buttonSignIn").hide();
                                $(".button.signOut").show();
                                synchronizeQuests(feature);
                            }
                        ).fail(function () {
                        localStorage.removeItem('AuthInfo');
                        location.reload();
                    });


                }
            })
        }
        else {
            alert("нечего удалять");
        }


    }).fail(function (xhr) {
        console.log(xhr);
        if (xhr.status == 401) {
            apiClient.postRefreshToken()
                .success(function (a) {
                        apiClient.setAuthInfo(a);
                        localStorage.setItem('AuthInfo', JSON.stringify(apiClient.AuthInfo()));
                        $("#buttonSignIn").hide();
                        $(".button.signOut").show();
                        synchronizeQuests(feature);
                    }
                ).fail(function () {
                localStorage.removeItem('AuthInfo');
                location.reload();
            });


        }
    })
};