angular.module('app').component('mars', {
    bindings :{
        user: '='
    },
    templateUrl: 'app/components/mars.html',
    controller: function () {
        
        this.greeting = 'Hello Mars !!';
        this.update = function(user){
            console.log(user);
        }
    }
})
