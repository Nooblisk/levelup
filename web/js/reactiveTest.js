/**
 * Created by Nooblisk on 18.03.2016.
 */


(function() {
    var Deps = {
        funcs: [],
        vars: []
    };

    var Tracker = function(fn) {
        Deps.funcs.push(fn);
        Deps.vars.push([]);
        Deps.tracker = true;

        fn();

        Deps.tracker = false;
    };

    var ReactiveVar = function(init) {
        this.value = init;
    };

    ReactiveVar.prototype.get = function() {
        if(Deps.tracker) {
            Deps.vars[Deps.vars.length - 1].push(this);
        }

        return this.value;
    };

    ReactiveVar.prototype.set = function(val) {
        var i = 0;
        var self = this;
        this.value = val;
        Deps.vars.forEach(function(arr) {
            if(arr.indexOf(self) > -1) {
                Deps.funcs[i]();
            }
            i += 1;
        });
    };

    // убираем window. для NodeJS приложения
    window.Tracker = Tracker;
    window.ReactiveVar = ReactiveVar;
})();
