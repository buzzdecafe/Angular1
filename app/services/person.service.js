myApp.service('PersonService', function ($http){
    return {
        fetch: function(name){
                    
            var config = {
                        method: 'GET',
                        url: '/api/person/fetch',
                        headers: {
                            "Content-Type": undefined
                        },
                        data: {"name": name}
                    };

                    return $http(config)
                        .then(function(result){
                            return result.data;
                        }).catch(function(err){
                            console.log(err);
                        });
        },
        save: function(path,model){
            var config = {
                        method: 'POST',
                        url: '/api/person/save',
                        headers: {
                            "Content-Type": undefined
                        },
                        data: {"path": path,
                                "model": model}
                    };

                    return $http(config)
                        .catch(function(err){
                            console.log(err);
                        });
        }
    }
});
