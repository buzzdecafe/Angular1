'user strict';
var app = app || {};

app.inputHelper = ( function () {
    var test = function(ctrl,pred){

        var parts = pred.field.split('.'),
            i;

        for (i = 0; i < parts.length; i++) {
            ctrl = ctrl[parts[i]];
        }
        var statement = ctrl;

        if (ctrl && pred.operator && pred.operand) {
            statement = "'" + ctrl + "'" + pred.operator + "'" + pred.operand + "'" ;
        } else {
            statement = "'" + ctrl + "'?true:false";
        }

        //HACK : need a safer way
        if (eval(statement)) {
            return true;
        }

        return false;
    };

    return {
        test: test
    }

} )();
