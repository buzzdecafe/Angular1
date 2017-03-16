module.exports = (function(){

    var JsonDB = require('node-json-db');
    var db = new JsonDB(__dirname + "/db.json", true, false);


    var save = function(req,res){
        var data = req.body;
        db.push("/planet/pluto",data);
        res.status(200).end();
    }

    var fetch = function(req,res){
        var data = db.getData("/planet/pluto");
        res.send(JSON.stringify(data));
    }

    return {
        fetch:fetch,
        save:save
    }

})();
