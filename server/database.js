module.exports = (function(){

    var JsonDB = require('node-json-db');
    var db = new JsonDB(__dirname + "/db.json", true, false);

    var planet = {

        save: function(req,res){
            var data = req.body;
            //db.push("/planet/pluto",data);
            res.status(200).end();
        },
        fetch: function(req,res){
            var data = db.getData("/planet/pluto");
            res.send(JSON.stringify(data));
        }
    };

    var person = {

        save: function(req,res){
            var data = req.body;
            //db.push("/address",data);
            res.status(200).end();
        },
        fetch: function(req,res){
            var data = db.getData("/address");

            var states = db.getData("/states");

            data.state.options = states;

            res.send(JSON.stringify(data));
        }
    };

    return {
        planet:planet,
        person:person
    }

})();
