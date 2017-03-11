myApp.service('PlanetService', function (){
    return {
        fetch: function(){
            return { nickname:'no longer a planet',
                     fullname: 'Pluto'

                    }
        }
    }
});
